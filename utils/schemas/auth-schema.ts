import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember_me: yup.boolean().default(false),
})


