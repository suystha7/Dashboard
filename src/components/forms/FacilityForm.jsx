import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { heroSchema } from "@/utils/validation";
import ImageUpload from "../basic/ImageUpload";
import { InputField } from "../basic/InputField";
import axiosInstance from "@/utils/axiosInstance";

const API_URL = "http://montessori.website/hero/heroapi/";

export default function FacilityForm({
  onSubmit,
  onCancel,
  initialData = null,
}) {
  const isEditMode = !!initialData;

  const formik = useFormik({
    initialValues: {
      heading: initialData?.heading || "",
      content: initialData?.content || "",
      image: initialData?.image || "",
      is_featured: initialData?.is_featured || false,
      status: initialData?.status ?? true,
    },
    validationSchema: heroSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const method = isEditMode ? "PUT" : "POST";
        const url = isEditMode ? `${API_URL}/${initialData.id}` : API_URL;

        const response = await axiosInstance(url, {
          method,
          body: JSON.stringify(values),
        });

        if (!response.ok)
          throw new Error(
            `Failed to ${isEditMode ? "update" : "create"} facility`
          );

        const data = await response.json();
        onSubmit(data, isEditMode);
        toast.success(
          `Facility ${isEditMode ? "updated" : "created"} successfully!`
        );

        if (!isEditMode) resetForm();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <Dialog>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Facility" : "Create Facility"}
          </DialogTitle>
        </DialogHeader>
      </Dialog>

      <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
        <ImageUpload />

        <InputField
          label="Heading"
          id="heading"
          name="heading"
          type="text"
          value={formik.values.heading}
          onChange={formik.handleChange}
          error={formik.touched.heading && formik.errors.heading}
          placeholder="Enter heading"
        />

        <InputField
          label="Content"
          id="content"
          name="content"
          type="textarea"
          rows={3}
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && formik.errors.content}
          placeholder="Enter content"
        />

        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_featured"
              checked={formik.values.is_featured}
              onCheckedChange={(checked) =>
                formik.setFieldValue("is_featured", checked)
              }
            />
            <Label htmlFor="is_featured">Featured</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formik.values.status}
              onCheckedChange={(checked) =>
                formik.setFieldValue("status", checked)
              }
            />
            <Label htmlFor="status">Active</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="destructive" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Facility"
              : "Create Facility"}
          </Button>
        </div>
      </form>
    </div>
  );
}
