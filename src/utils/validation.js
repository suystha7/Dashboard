import * as Yup from "yup";

export const heroSchema = Yup.object({
  heading: Yup.string().trim().required("Heading is required"),
  content: Yup.string().trim().required("Content is required"),
  image: Yup.string().trim().url("Invalid URL").required("Image URL is required"),
});
