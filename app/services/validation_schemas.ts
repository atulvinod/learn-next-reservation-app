import * as yup from "yup";
import { object, string, number, date, InferType } from "yup";

// --- VALIDATION SCHEMAS --
export const signupValidationSchema = yup
    .object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
        password: yup.string().required("Password cannot be empty"),
        city: yup.string().required("City is required"),
        phone: yup
            .string()
            .matches(/^\d+$/, "Invalid phone number")
            .required("Phone number is required")
            .length(10, "Phone number should be of 10 digits"),
    })
    .required();

export const loginValidationSchema = yup
    .object({
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
        password: yup.string().required("Password is required"),
    })
    .required();

// --- VALIDATION SCHEMA TYPES --- 
export type signupRequest = InferType<typeof signupValidationSchema>;
export type loginRequest = InferType<typeof loginValidationSchema>;


// ---- VALIDATION FUNCTIONS --
export const validateSignupBody = async (request: signupRequest) => {
    return signupValidationSchema.validate(request);
};

export const validateLoginBody = async (request: loginRequest) => {
    return loginValidationSchema.validate(request);
};
