import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { X, Upload, ImageIcon } from "lucide-react";

const ImageUpload = ({ formik, multi, existingImage, error }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    if (existingImage && !formik.values.image) {
      setImagePreviews([{ previewURL: existingImage }]);
    }
  }, [existingImage, formik.values.image]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    if (files.length > 0) {
      const previews = files.map((file) => ({
        file,
        previewURL: URL.createObjectURL(file),
      }));

      setImagePreviews(multi ? [...imagePreviews, ...previews] : previews);
      formik.setFieldValue(
        "image",
        multi ? [...(formik.values.image || []), ...files] : files[0]
      );
    }
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);

    const updatedFiles = multi
      ? formik.values.image.filter((_, i) => i !== index)
      : null;

    formik.setFieldValue("image", updatedFiles);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    processFiles(files);
  };

  return (
    <div className="space-y-2 mt-3">
      {!imagePreviews.length && (
        <div
          ref={dropZoneRef}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => fileInputRef.current.click()}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-10 h-10 text-gray-400 " />
            <p className="text-sm font-medium text-gray-700">
              Click image to upload
            </p>
            <p className="text-xs text-gray-500">
              {multi ? "Upload multiple images" : "Upload an image"}
            </p>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        multiple={multi}
      />

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {imagePreviews.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.previewURL}
                alt={`Image Preview ${index}`}
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2  p-1 text-red-600 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {multi && (
            <div
              className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => fileInputRef.current.click()}
            >
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
      )}
      {formik.touched.image && formik.errors.image && (
        <p className="text-sm text-destructive">{formik.errors.image}</p>
      )}
    </div>
  );
};

export default ImageUpload;
