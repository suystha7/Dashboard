import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { useFormik } from "formik";

const ImageUpload = ({ multi }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const formik = useFormik({
    initialValues: {
      image: multi ? [] : null,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...previews]);
      formik.setFieldValue(
        "image",
        multi ? [...formik.values.image, ...files] : files[0]
      );
    }
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);

    const updatedFiles = formik.values.image.filter((_, i) => i !== index);
    formik.setFieldValue("image", updatedFiles);

    setFileInputKey(Date.now());
  };

  return (
    <div className="space-y-2">
      {!imagePreviews.length && (
        <div className="cursor-pointer">
          <img
            src="/src/assets/upload.png"
            alt="Upload"
            onClick={() => document.getElementById("imageInput").click()}
            className="w-24 h-24 object-cover rounded-full border border-dashed border-gray-300 p-2 hover:bg-gray-100"
          />
        </div>
      )}

      <Input
        id="imageInput"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        key={fileInputKey}
        multiple={multi}
      />

      {formik.touched.image && formik.errors.image && (
        <p className="text-sm text-destructive">{formik.errors.image}</p>
      )}

      {imagePreviews.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Image Preview ${index}`}
                className="w-20 h-20 object-cover rounded-md"
              />
              <p className="text-xs text-center mt-1 truncate w-20">
                {preview.name}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-3 right-12 p-2 text-red-600 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
