import * as Yup from "yup";

export const signUpSchema = Yup.object({
    first_name: Yup.string().min(2).max(25).required("Please enter your firstname"),
    last_name: Yup.string().min(2).max(25).required("Please enter your lastname"),
    email: Yup.string().email().required("Please enter your email"),
    phone: Yup.string().min(11).required("Please enter your phone"),
    password: Yup.string().min(6).required("Please enter your password"),
})