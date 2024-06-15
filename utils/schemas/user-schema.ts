import * as yup from 'yup'

// User Related
const AddressSchema = yup.object({
  address: yup.string(),
  // .required('Alamat tidak boleh kosong'),
  village: yup.string(),
  // .required('Desa tidak boleh kosong'),
  district: yup.string(),
  // .required('Kecamatan tidak boleh kosong'),
  city: yup.string(),
  // .required('Kota tidak boleh kosong'),
  province: yup.string(),
  // .required('Provinsi tidak boleh kosong'),
  postal_code: yup
    .string()
    .matches(/^[0-9]+$/, 'Kode pos tidak valid')
    .min(5, 'Kode pos tidak valid')
    .max(5, 'Kode pos tidak valid'),
  // .required('Kode pos tidak boleh kosong'),
})

const UserCitizenSchema = yup.object({
  nik_number: yup
    .string()
    .matches(/^[0-9]+$/, 'Nomor KTP tidak valid')
    .min(16, 'Nomor KTP tidak valid')
    .max(16, 'Nomor KTP lebih dari 16 digit'),
  // .required('Nomor KTP kosong'),
  family_id_number: yup
    .string()
    .matches(/^[0-9]+$/, 'Nomor KK tidak valid')
    .min(16, 'Nomor KK tidak valid')
    .max(16, 'Nomor KK lebih dari 16 digit'),
  // .required('Nomor KK tidak boleh kosong'),
  id_card_image_url: yup.string().url('URL tidak valid'),
  gender: yup.string().oneOf(['Male', 'Female'], 'Jenis kelamin tidak valid'),
  // .required('Jenis kelamin tidak boleh kosong'),
  birth_date: yup.date().required('Tanggal lahir tidak boleh kosong'),
  birth_place: yup.string().required('Tempat lahir tidak boleh kosong'),
  marital_status: yup
    .string()
    .oneOf(['Single', 'Married', 'Divorced'], 'Status pernikahan tidak valid'),
  // .required('Status pernikahan tidak boleh kosong'),
  citizen_image_url: yup.string().url('URL tidak valid'),
  address: AddressSchema.notRequired(),
})

const UserDetailSchema = yup.object({
  first_name: yup.string().required('Nama tidak boleh kosong'),
  last_name: yup.string(),
  user_image_url: yup.string().url('URL tidak valid'),
})

// Auth Related
const UpdateUserSchema = yup.object({
  email: yup.string().email('Email tidak valid'),
  phone_number: yup
    .string()
    .min(10, 'Nomor telepon tidak valid')
    .matches(/^[0-9]+$/, 'Nomor telepon tidak valid'),
  password: yup.string().nullable(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Password tidak sama')
    .nullable(),
  user_detail: UserDetailSchema,
  is_admin: yup.boolean().default(true),
})

// Auth Related
const RegisterSchema = yup.object({
  email: yup
    .string()
    .email('Email tidak valid')
    .required('Email tidak boleh kosong'),
  phone_number: yup
    .string()
    .min(10, 'Nomor telepon tidak valid')
    .matches(/^[0-9]+$/, 'Nomor telepon tidak valid')
    .required('Nomor telepon tidak boleh kosong'),
  password: yup
    .string()
    .min(8, 'Password minimal 8 karakter')
    .required('Password tidak boleh kosong'),
  confirm_password: yup
    .string()
    .required('Konfirmasi password tidak boleh kosong')
    .oneOf([yup.ref('password')], 'Password tidak sama'),
  user_detail: UserDetailSchema.required(),
  is_admin: yup.boolean().default(true),
})

export { RegisterSchema, UpdateUserSchema, UserDetailSchema, UserCitizenSchema }
