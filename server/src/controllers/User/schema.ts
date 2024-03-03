import * as yup from "yup";

const create = yup.object().shape({
  user_firstName: yup.string().required("user_firstName is required"),
  user_email: yup.string().email("invalid email").required("user_email is required"),
  user_phoneNumber: yup.string().nullable(),
  user_active: yup.boolean().nullable(),
  user_tokenVerify: yup.string().nullable(),
  user_password: yup
    .string()
    .min(8, "at least 8 characters")
    .oneOf([yup.ref("user_confirmPassword")], "user_passwords are not the same"),
  user_confirmPassword: yup
    .string()
    .min(8, "at least 8 characters")
    .oneOf([yup.ref("user_password")], "user_password are not the same"),
});

const createPassword = yup.object().shape({
  user_password: yup
    .string()
    .min(8, 'at least 8 characters')
    .oneOf([yup.ref('user_confirmPassword')], 'passwords are not the same'),
  user_confirmPassword: yup
    .string()
    .min(8, 'at least 8 characters')
    .oneOf([yup.ref('user_password')], 'passwords are not the same'),
})
const createAS = yup.object().shape({
  user_email: yup.string().required("user_email is required"),
});

export default { create, createPassword, createAS }

