import { useFormik } from "formik";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { activitySchema, heroSchema } from "@/utils/validation";
import ImageUpload from "../basic/ImageUpload";
import { InputField } from "../basic/InputField";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { SwitchField } from "../basic/SwitchField";
import { FormButtons } from "../basic/FormButtons";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import BundledEditor from '@/BundledEditor';

export default function HeroForm({
  activity = null,
  onSubmit,
  onCancel,
  title = "Activity",
  refreshData,
}) {
  const [image, setImage] = useState(activity?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activityData, setActivityData] = useState(activity);
  // console.log("object", activityData);

  const { id } = useParams();
  const isEditMode = Boolean(id) || Boolean(activity);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHero() {
      if (id && !activityData) {
        setIsLoading(true);
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            toast.error("Authentication failed. Please log in.");
            navigate("/login");
            return;
          }

          const response = await axiosInstance.get(
            `${API_PATHS.ACTIVITIES.GET_ACTIVITIES}/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setActivityData(response?.data);
          setImage(response.data.image);
        } catch (error) {
          console.error("Error fetching activity:", error);
          toast.error("Failed to load activity data");
          navigate("/activity");
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchHero();
  }, [id, activityData, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      heading: activityData?.heading || "",
      content: activityData?.content || "",
      is_featured: activityData?.is_featured || false,
      status: activityData?.status || false,
      image: activityData?.image || null,
    },
    validationSchema: activitySchema(isEditMode, image),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          toast.error("Authentication failed. Please log in.");
          throw new Error("No access token found");
        }

        // Prepare editor content from the TinyMCE editor if it's available
        const editorContent = editorRef.current
          ? editorRef.current.getContent()
          : values.content;

        // Initialize FormData for sending updated values
        const formData = new FormData();

        // Always include these fields in the request regardless of edit mode
        formData.append("heading", values.heading);
        formData.append("content", editorContent);
        formData.append("is_featured", values.is_featured.toString());
        formData.append("status", values.status.toString());

        // Handle image field - only include if it's a File object (new upload)
        if (values.image && values.image instanceof File) {
          formData.append("image", values.image);
        }

        // Make the API call to update the activity
        let response;
        if (isEditMode) {
          console.log(
            "Sending update with form data:",
            Object.fromEntries(formData)
          );
          response = await axiosInstance.patch(
            `${API_PATHS.ACTIVITIES.UPDATE_ACTIVITY}/${id || activityData.id}`,
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
          // For new activity creation, image is required
          if (!values.image) {
            toast.error("Image is required");
            setIsSubmitting(false);
            return;
          }

          response = await axiosInstance.post(
            API_PATHS.ACTIVITIES.CREATE_ACTIVITY,
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

        // Call the onSubmit callback if provided
        if (onSubmit) onSubmit(response.data);
        if (refreshData) await refreshData();
        navigate("/activities");
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

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/activities");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg">Loading activity data...</p>
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
                Content
                <span className="text-red-500">*</span>
              </label>
            </div>
            {/* <BundledEditor
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
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat| help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content) => {
                formik.setFieldValue("content", content);
              }}
            /> */}
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

        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-11">
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Upload image <span className="text-red-500">*</span>
            </label>
            <ImageUpload
              key={image ? image.name || image : activityData?.image || "image"}
              formik={formik}
              multi={false}
              existingImage={image}
              onImageChange={handleImageChange}
            />

            <div className="flex flex-col space-y-7 mt-6">
              <SwitchField
                className="block mb-1 font-medium text-sm text-gray-700"
                id="is_featured"
                label="Is Featured?"
                checked={formik.values.is_featured}
                onChange={(checked) =>
                  formik.setFieldValue("is_featured", checked)
                }
              />
              <SwitchField
                className="block mb-1 font-medium text-sm text-gray-700"
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

