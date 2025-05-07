import React, { useRef, useEffect } from "react";

const DialogForm = ({ children, isFormOpen, setIsFormOpen }) => {
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormOpen(false);
      }
    };

    if (isFormOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFormOpen, setIsFormOpen]);

  return (
    <>
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex h-[98vh] w-full p-5 ">
          <div
            ref={formRef}
            className="relative w-full max-w-7xl max-h-[98vh] ml-60 overflow-y-auto bg-white rounded-xl  p-6"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default DialogForm;