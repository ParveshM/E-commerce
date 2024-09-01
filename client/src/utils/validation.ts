import * as Yup from "yup";
export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .matches(/^[A-Za-z\s'-]+$/, "Name should start with a upper case letter"),
  email: Yup.string()
    .trim()
    .required("Email is required*")
    .matches(emailRegex, "Invalid email format."),
  password: Yup.string()
    .trim()
    .required("Password is required*")
    .min(6, "Password must be at least 6 characters long.")
    .matches(/[a-z]/, "Password must contain lowercase letters.")
    .matches(/[A-Z]/, "Password must contain uppercase letters.")
    .matches(/\d/, "Password must contain at least one digit."),
  confirmPassword: Yup.string()
    .trim()
    .required("Required.")
    .oneOf([Yup.ref("password")], "Password is not matching"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(emailRegex, "Invalid email format.")
    .required("Email is required."),
  password: Yup.string().trim().required("Password is required."),
});

export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 25 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),

  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),

  stock: Yup.number()
    .required("Stock is required")
    .positive("Stock must be a positive number")
    .min(0, "Stock must be at least 1"),

  images: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL"))
    .max(5, "You can upload a maximum of 5 images")
    .required("At least one image is required"),
});
