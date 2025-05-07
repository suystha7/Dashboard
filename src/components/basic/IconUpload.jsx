

import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { X, Upload, ImageIcon } from "lucide-react";

const IconUpload = ({
  formik,
  name = "icon",
  multi = false,
  existingIcons = [],
  onFilesSelected,
}) => {
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Run only once on mount to initialize previews with existing icons
  useEffect(() => {
    if (
      previews.length === 0 &&
      (existingIcons.length > 0 ||
        (formik?.values[name] && typeof formik.values[name] === "string"))
    ) {
      const iconUrls =
        existingIcons.length > 0 ? existingIcons : [formik.values[name]];

      const existingPreviews = iconUrls.map((url) => ({
        previewURL: url,
        isExisting: true,
      }));

      setPreviews(existingPreviews);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = (files) => {
    const fileArray = Array.from(files).filter(
      (file) =>
        file.type.startsWith("image/") || file.name.toLowerCase().endsWith(".svg")
    );

    if (fileArray.length === 0) return;

    const newPreviews = fileArray.map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
      isExisting: false,
    }));

    const updatedPreviews = multi
      ? [...previews, ...newPreviews]
      : newPreviews;

    const updatedFiles = multi
      ? [
          ...(Array.isArray(formik?.values[name]) ? formik.values[name] : []),
          ...fileArray,
        ]
      : fileArray[0];

    setPreviews(updatedPreviews);
    formik?.setFieldValue(name, updatedFiles);

    if (onFilesSelected) {
      onFilesSelected(multi ? updatedFiles : [updatedFiles]);
    }
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleRemove = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);

    if (!multi) {
      formik?.setFieldValue(name, null);
      if (onFilesSelected) {
        onFilesSelected(null);
      }
    } else {
      const updatedFiles = formik?.values[name]?.filter((_, i) => i !== index);
      formik?.setFieldValue(name, updatedFiles);
      if (onFilesSelected) {
        onFilesSelected(updatedFiles);
      }
    }
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

    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-2 mt-3">
      {!previews.length && (
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
            <Upload className="w-10 h-10 text-gray-400" />
            <p className="text-sm font-medium text-gray-700">
              Click to upload {multi ? "icons" : "an icon"}
            </p>
            <p className="text-xs text-gray-500">Recommended:PNG</p>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*, .svg"
        multiple={multi}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previews.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item?.previewURL}
                alt={`Icon Preview ${index}`}
                className="w-24 h-24 object-cover border rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
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

      {formik?.touched[name] && formik?.errors[name] && (
        <p className="text-sm text-destructive">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default IconUpload;
