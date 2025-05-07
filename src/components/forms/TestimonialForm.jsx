import { useFormik } from "formik";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { testimonialSchema } from "@/utils/validation";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

import { InputField } from "../basic/InputField";
import { SwitchField } from "../basic/SwitchField";
import ImageUpload from "../basic/ImageUpload";
import { FormButtons } from "../basic/FormButtons";
import BundledEditor from '@/BundledEditor';
export default function TestimonialForm({
  testimonial = null,
  onSubmit,
  onCancel,
  title = "Testimonial",
  refreshData,
}) {
  const [image, setImage] = useState(testimonial?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testimonialData, setTestimonialData] = useState(testimonial);

  const { id } = useParams();
  const isEditMode = Boolean(id) || Boolean(testimonial);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTestimonial() {
      if (id && !testimonialData) {
        setIsLoading(true);
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            toast.error("Authentication failed. Please log in.");
            navigate("/login");
            return;
          }

          const response = await axiosInstance.get(
            `${API_PATHS.TESTIMONIALS.GET_TESTIMONIALS}/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setTestimonialData(response.data);
          setImage(response.data.image);
        } catch (error) {
          toast.error("Failed to load testimonial data");
          navigate("/testimonials");
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchTestimonial();
  }, [id, testimonialData, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      quote: testimonialData?.quote || "",
      name: testimonialData?.name || "",
      designation: testimonialData?.designation || "",
      is_active: testimonialData?.is_active || false,
      is_featured: testimonialData?.is_featured || false,
      image: testimonialData?.image || null,
    },
    validationSchema: testimonialSchema(isEditMode, image),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          toast.error("Authentication failed. Please log in.");
          throw new Error("No access token found");
        }

        const formData = new FormData();
        formData.append("quote", values.quote);
        formData.append("name", values.name);
        formData.append("designation", values.designation);
        formData.append("is_active", values.is_active.toString());
        formData.append("is_featured", values.is_featured.toString());

        if (values.image && values.image instanceof File) {
          formData.append("image", values.image);
        }

        let response;
        if (isEditMode) {
          response = await axiosInstance.patch(
            `${API_PATHS.TESTIMONIALS.UPDATE_TESTIMONIALS}/${id || testimonialData.id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success(`${title} updated successfully`);
        } else {
          if (!values.image) {
            toast.error("Image is required");
            setIsSubmitting(false);
            return;
          }

          response = await axiosInstance.post(
            API_PATHS.TESTIMONIALS.CREATE_TESTIMONIALS,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success(`${title} added successfully`);
        }

        if (onSubmit) onSubmit(response.data);
        if (refreshData) await refreshData();
        navigate("/testimonials");
      } catch (error) {
        console.error("Error submitting testimonial:", error);
        toast.error(
          `Failed to ${isEditMode ? "update" : "add"} testimonial: ${
            error.response?.data?.message || error.message
          }`
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageChange = (newImage) => {
    setImage(newImage);
    formik.setFieldValue("image", newImage);
  };

  const handleCancel = () => {
    onCancel ? onCancel() : navigate("/testimonials");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg">Loading testimonial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[90vh] mx-auto px-6 py-6 overflow-auto bg-white mt-3">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? `Edit ${title}` : `Add ${title}`}
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        <div className="space-y-4">
          <InputField
            label="Quote"
            id="quote"
            name="quote"
            type="text"
            value={formik.values.quote}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.quote && formik.errors.quote}
            placeholder="Enter quote"
            required="*"
          />

          <InputField
            label="Name"
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            placeholder="Enter name"
            required="*"
          />

          <InputField
            label="Designation"
            id="designation"
            name="designation"
            type="text"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.designation && formik.errors.designation}
            placeholder="Enter designation"
            required="*"
          />
        </div>

        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-11">
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Upload Image <span className="text-red-500">*</span>
            </label>
            <ImageUpload
              key={image ? image.name || image : testimonialData?.image || "image"}
              formik={formik}
              multi={false}
              existingImage={image}
              onImageChange={handleImageChange}
            />

            <div className="flex flex-col space-y-7 mt-6">
              <SwitchField
                id="is_active"
                label="Is Active?"
                checked={formik.values.is_active}
                onChange={(checked) =>
                  formik.setFieldValue("is_active", checked)
                }
              />

              <SwitchField
                id="is_featured"
                label="Is Featured?"
                checked={formik.values.is_featured}
                onChange={(checked) =>
                  formik.setFieldValue("is_featured", checked)
                }
              />

              <FormButtons
                isSubmitting={isSubmitting}
                isEditMode={isEditMode}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
