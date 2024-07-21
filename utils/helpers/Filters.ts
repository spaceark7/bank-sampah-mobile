const EFilterStatusOptions = [
  {
    label: 'Aktif',
    value: '1',
  },
  {
    label: 'Belum aktif',
    value: '2',
  },
]
const EFilterOrderOptions = [
  {
    label: 'Naik',
    value: 'asc',
  },
  {
    label: 'Turun',
    value: 'desc',
  },
]
const EFilterGenderOptions = [
  {
    label: 'Naik',
    value: 'asc',
  },
  {
    label: 'Turun',
    value: 'desc',
  },
]
const EFilterTransactionOptions = [
  {
    label: 'Penyetoran',
    value: 'redeem',
  },
  {
    label: 'Penarikan',
    value: 'withdraw',
  },
]

const EFilterOptions = {
  status: EFilterStatusOptions,
  order: EFilterOrderOptions,
  gender: EFilterGenderOptions,
  transaction: EFilterTransactionOptions,
}

export default EFilterOptions
