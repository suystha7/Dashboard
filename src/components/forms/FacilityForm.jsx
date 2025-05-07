

import { useFormik } from "formik";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { facilitySchema } from "@/utils/validation";
import ImageUpload from "../basic/ImageUpload";
import { InputField } from "../basic/InputField";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { SwitchField } from "../basic/SwitchField";
import { FormButtons } from "../basic/FormButtons";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import IconUpload from "../basic/IconUpload";
import BundledEditor from '@/BundledEditor';

export default function FacilityForm({
  facility = null,
  onSubmit,
  onCancel,
  title = "Facility",
  refreshData,
}) {
  const [image, setImage] = useState(facility?.image || null);
  const [icon, setIcon] = useState(facility?.icon || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [facilityData, setFacilityData] = useState(facility);

  const { id } = useParams();
  const isEditMode = Boolean(id) || Boolean(facility);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFacility() {
      if (id && !facilityData) {
        setIsLoading(true);
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            toast.error("Authentication failed. Please log in.");
            navigate("/login");
            return;
          }

          const response = await axiosInstance.get(
            `${API_PATHS.FACILITIES.GET_FACILITIES}/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setFacilityData(response.data);
          setImage(response.data.image);
          setIcon(response.data.icon);
        } catch (error) {
          console.error("Error fetching facility:", error);
          toast.error("Failed to load facility data");
          navigate("/facilities");
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchFacility();
  }, [id, facilityData, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      heading: facilityData?.heading || "",
      content: facilityData?.content || "",
      is_featured: facilityData?.is_featured || false,
      status: facilityData?.status || false,
      image: facilityData?.image || null,
      icon: facilityData?.icon || null,
    },
    validationSchema: facilitySchema(isEditMode, image, icon),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          toast.error("Authentication failed. Please log in.");
          throw new Error("No access token found");
        }

        const editorContent = editorRef.current
          ? editorRef.current.getContent()
          : values.content;
        
        const formData = new FormData();
        formData.append("heading", values.heading);
        formData.append("content", editorContent);
        formData.append("is_featured", values.is_featured.toString());
        formData.append("status", values.status.toString());

        if (values.image && values.image instanceof File) {
          formData.append("image", values.image);
        }
        if (values.icon && values.icon instanceof File) {
          formData.append("icon", values.icon);
        }

        let response;
        if (isEditMode) {
          response = await axiosInstance.patch(
            `${API_PATHS.FACILITIES.UPDATE_FACILITY}/${id || facilityData.id}`,
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
          if (!values.icon) {
            toast.error("Icon is required");
            setIsSubmitting(false);
            return;
          }
          response = await axiosInstance.post(
            API_PATHS.FACILITIES.CREATE_FACILITY,
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
        navigate("/facilities");
      } catch (error) {
        console.error(
          `Error ${isEditMode ? "updating" : "creating"} ${title}:`,
          error.response?.data || error.message
        );
        toast.error(
          `Failed to ${isEditMode ? "update" : "add"} ${title}: ${
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

  const handleIconChange = (newIcon) => {
    setIcon(newIcon);
    formik.setFieldValue("icon", newIcon);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/facilities");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg">Loading Facility data...</p>
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
        {/* Left Side */}
        <div className="space-y-4">
          <InputField
            label="Heading"
            id="heading"
            name="heading"
            type="text"
            value={formik.values.heading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.heading && formik.errors.heading}
            placeholder="Enter heading"
            required="*"
          />

          <div>
            <div className="flex">
              <label className="block mb-1 font-medium text-sm text-gray-700">
                Content <span className="text-red-500">*</span>
              </label>
            </div>
            <BundledEditor
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
              value={formik.values.content}
              init={{
                height: 400,
                menubar: true,
                branding: false,
                statusbar: true,
                resize: false,
                plugins: [
                  "advlist", "autolink", "lists", "link", "charmap", "preview", "anchor",
                  "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount", "image"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | image | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

                // ✅ TinyMCE expects { location: "url" }
                images_upload_handler: function (blobInfo, progress) {
                  return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("file", blobInfo.blob(), blobInfo.filename()); // 🟢 use "file"

                    axiosInstance
                      .post("/common/image/upload", formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (e) => {
                          progress((e.loaded / e.total) * 100);
                        },
                      })
                      .then((response) => {
                        if (response.data && response.data.location) {
                          resolve(response.data.location); // 🟢 insert image URL
                        } else {
                          reject("Upload failed: No location in response");
                        }
                      })
                      .catch((error) => {
                        console.error("TinyMCE image upload error:", error);
                        reject(
                          `Upload failed: ${error.response?.data?.message || error.message}`
                        );
                      });
                  });
                }
              }}
              onEditorChange={(content) => {
                formik.setFieldValue("content", content);
              }}
            />
            {formik.touched.content && formik.errors.content && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.content}
              </p>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="space-y-11">
            <div className="flex flex-col gap-8">
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">
                  Upload Icon <span className="text-red-500">*</span>
                </label>
                <IconUpload
                  formik={formik}
                  name="icon"
                  multi={false}
                  existingIcon={icon ? [icon] : []}
                  onFilesSelected={(files) =>
                    handleIconChange(files ? files[0] : null)
                  }
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <ImageUpload
                  key={
                    image ? image.name || image : facilityData?.image || "image"
                  }
                  formik={formik}
                  multi={false}
                  existingImage={image}
                  onImageChange={handleImageChange}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-7 mt-6">
              <SwitchField
                id="is_featured"
                label="Is Featured?"
                checked={formik.values.is_featured}
                onChange={(checked) =>
                  formik.setFieldValue("is_featured", checked)
                }
              />
              <SwitchField
                id="status"
                label="Is Active?"
                checked={formik.values.status}
                onChange={(checked) => formik.setFieldValue("status", checked)}
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