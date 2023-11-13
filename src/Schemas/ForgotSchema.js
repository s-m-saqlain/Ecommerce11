import * as Yup from "yup";

export const signUpSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
})