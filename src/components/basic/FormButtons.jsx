

import React from 'react';
import { Loader2 } from "lucide-react"; // Import any icons you want to use

export function FormButtons({ isSubmitting, isEditMode, onCancel }) {
  return (
    <div className="flex justify-end gap-4 mt-32 ">
      {/* Cancel Button */}
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 bg-red-500 text-white rounded-md"
      >
        Cancel
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-6 py-2 text-white rounded-md ${
          isSubmitting ? "bg-gray-400" : "bg-blue-600"
        }`}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isEditMode ? (
          "Update"
        ) : (
          "Add"
        )}
      </button>
    </div>
  );
};
