import * as yup from "yup";

const register = yup
  .object()
  .shape({
    user_firstName: yup.string().required("firstName is required"),
    user_lastName: yup.string().required("lastName is required"),
    user_email: yup.string().email("invalid user_email").required("user_email is required"),
    // phoneNumber: yup.string().nullable(),
    // isActive: yup.boolean().nullable(),
    // tokenVerify: yup.string().nullable(),
    user_verify_code: yup.string().nullable(),
    // language_Id: yup.number().required('language is not selected'),
    user_password: yup
      .string()
      .min(8, "at least 8 characters")
      .oneOf([yup.ref("user_confirmPassword")], "passwords are not the same"),
      user_confirmPassword: yup
      .string()
      .min(8, "at least 8 characters")
      .oneOf([yup.ref("user_password")], "passwords are not the same"),
  })
  .required();

// forgetPassword
const checkEmail = yup
  .object()
  .shape({
    user_email: yup.string().required("email is required"),
  })
  .required();
const confirmEmailCode = yup.object().shape({
  user_email: yup.string().required("email is required"),
  user_verify_code: yup
    .string()
    .required("verify code is required")
    .min(4, "verify code should be 4 chr")
    .max(4, "verify code should be 4 chr"),
});

const login = yup
  .object()
  .shape({
    user_email: yup.string().required("email is required"),
    user_password: yup.string().required("password is required"),
  })
  .required();

const changePassword = yup
  .object()
  .shape({
    user_email: yup.string().email("invalid email").required("user_email is required"),
    newPassword: yup
      .string()
      .min(8, "at least 8 characters")
      .oneOf([yup.ref("user_confirmPassword")], "passwords are not the same"),
      user_confirmPassword: yup
      .string()
      .min(8, "at least 8 characters")
      .oneOf([yup.ref("newPassword")], "passwords are not the same"),
  })
  .required();
export default {
  register,
  login,
  checkEmail,
  confirmEmailCode,
  changePassword,
};
