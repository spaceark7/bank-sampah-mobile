import * as yup from 'yup'

export const materialSchemaCreate = yup.object().shape({
  name: yup.string().required(),
  base_price: yup.number().required(),
  unit: yup.string().required(),
  is_active: yup.boolean().default(true).required()
})
