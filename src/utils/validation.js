import * as Yup from "yup";

export const heroSchema = (isEditMode = false, existingImage = null) =>
  Yup.object().shape({
    heading: Yup.string()
      .trim()
      .min(5, "Heading must have at least 5 characters")
      .required("Heading is required"),
    content: Yup.string()
      .trim()
      .min(10, "Content must be at least 10 characters")
      .required("Content is required"),
    is_featured: Yup.boolean(),
    status: Yup.boolean(),
    image: Yup.mixed()
      .required("Image is required")
      .test("image-required", "Image is required", function (value) {
        if (isEditMode) {
          return value || !!existingImage;
        }
        return !!value;
      }),
    // .test("fileSize", "Image is too large (max 5MB)", function (value) {
    //   if (!value) return true;
    //   return value.size <= 5 * 1024 * 1024;
    // }),
  });

export const facilitySchema = (
  isEditMode = false,
  existingImage = null,
  existingIcon = null
) =>
  Yup.object().shape({
    heading: Yup.string()
      .trim()
      .min(5, "Heading must have at least 5 characters")
      .required("Heading is required"),
    content: Yup.string()
      .trim()
      .min(10, "Content must be at least 10 characters")
      .required("Content is required"),
    is_featured: Yup.boolean(),
    status: Yup.boolean(),
    image: Yup.mixed()
      .required("Image is required")
      .test("image-required", "Image is required", function (value) {
        if (isEditMode) {
          return value || !!existingImage;
        }
        return !!value;
      }),
      // .test("fileSize", "Image is too large (max 2MB)", function (value) {
      //   if (!value) return true;
      //   return value.size <= 2 * 1024 * 1024;
      // }),
    icon: Yup.mixed()
      .required("Icon is required")
      .test("icon-required", "Icon is required", function (value) {
        if (isEditMode) {
          return value || !!existingIcon;
        }
        return !!value;
      })
      // .test("fileSize", "Icon is too large (max 1MB)", function (value) {
      //   if (!value) return true;
      //   return value.size <= 1 * 1024 * 1024;
      // }),
  });

export const activitySchema = (isEditMode = false, existingImage = null) =>
  Yup.object().shape({
    heading: Yup.string()
      .trim()
      .min(5, "Heading must have at least 5 characters")
      .required("Heading is required"),
    content: Yup.string()
      .trim()
      .min(10, "Content must be at least 10 characters")
      .required("Content is required"),
    is_featured: Yup.boolean(),
    status: Yup.boolean(),
    image: Yup.mixed()
      .required("Image is required")
      .test("image-required", "Image is required", function (value) {
        if (isEditMode) {
          return value || !!existingImage;
        }
        return !!value;
      }),
    // .test("fileSize", "Image is too large (max 5MB)", function (value) {
    //   if (!value) return true;
    //   return value.size <= 5 * 1024 * 1024;
    // }),
  });

export const testimonialSchema = (isEditMode = false, existingImage = null) =>
  Yup.object().shape({
    quote: Yup.string()
      .trim()
      .min(10, "Quote must be at least 10 characters")
      .required("Quote is required"),

    name: Yup.string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),

    designation: Yup.string()
      .trim()
      .min(2, "Designation must be at least 2 characters")
      .required("Designation is required"),

    is_active: Yup.boolean(),
    is_featured: Yup.boolean(),

    image: Yup.mixed()
      .required("Image is required")
      .test("image-required", "Image is required", function (value) {
        if (isEditMode) {
          return value || !!existingImage;
        }
        return !!value;
      }),

    // Optional - if you're editing existing testimonials and passing these values
    created_at: Yup.date().nullable(),
    updated_at: Yup.date().nullable(),
  });
