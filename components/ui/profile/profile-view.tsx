import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

import { Text, View } from '@/components/Themed'
import DetailSection from '@/components/ui/profile/detail-section'
import { UserEntity } from '@/services/users/user-entity'
import { useGetUserDetailQuery } from '@/services/users/user-slices'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Avatar, Button, Divider, useTheme } from '@rneui/themed'
import { useGetMemberByIdQuery } from '@/services/members/member-slices'

interface ProfileViewProps {
  memberId: string
}

export default function ProfileView({ memberId }: ProfileViewProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const router = useRouter()
  const { theme } = useTheme()
  const {
    data: userDetail,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetMemberByIdQuery(memberId)

  const field = [
    {
      name: 'user_detail.first_name',
      type: 'text',
      label: 'Nama Depan',
      width: 'half',
    },
    {
      name: 'user_detail.last_name',
      type: 'text',
      label: 'Nama Belakang',
      width: 'half',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      width: 'full',
    },
    {
      name: 'phone_number',
      type: 'text',
      label: 'Phone Number',
      width: 'full',
    },
    {
      name: 'user_detail.activated_at',
      type: 'date',
      label: 'Tanggal Registrasi',
      width: 'full',
    },
  ]

  const field_detail = [
    {
      name: 'citizenship.nik_number',
      type: 'text',
      label: 'NIK',
      width: 'full',
    },
    {
      name: 'citizenship.family_id_number',
      type: 'text',
      label: 'No. KK',
    },
    {
      name: 'citizenship.birth_place',
      label: 'Tempat Lahir',
      type: 'text',
      width: 'half',
    },
    {
      name: 'citizenship.birth_date',
      label: 'Tanggal Lahir',
      type: 'date',
      width: 'half',
    },
    {
      name: 'citizenship.gender',
      label: 'Jenis Kelamin',
      type: 'text',
      width: 'half',
      render: (data: any) => (
        <Text>{data === 'Male' ? 'Laki - laki' : 'Perempuan'}</Text>
      ),
    },
    {
      name: 'citizenship.marital_status',
      label: 'Status',
      type: 'text',
      width: 'half',
      render: (data: any) => (
        <Text>
          {data === 'Married'
            ? 'Menikah'
            : data === 'Divorce'
            ? 'Bercerai'
            : 'Lajang'}
        </Text>
      ),
    },
    {
      name: '',
      type: 'separator',
      label: 'Alamat',
      width: 'full',
      render: () => <Divider />,
    },

    {
      name: 'citizenship.address.address',
      type: 'text',
      label: 'Jalan',
      width: 'full',
    },
    {
      name: 'citizenship.address.village',
      type: 'text',
      label: 'Desa',
      width: 'half',
    },
    {
      name: 'citizenship.address.district',
      type: 'text',
      label: 'Kabupaten',
      width: 'half',
    },
    {
      name: 'citizenship.address.city',
      label: 'Kota',
      type: 'text',
    },
    {
      name: 'citizenship.address.province',
      label: 'Provinsi',
      type: 'text',
    },
    {
      name: 'citizenship.address.postal_code',
      label: 'Kode pos',
    },
  ]

  const onEdit = (param: string, segment: string) => {
    router.push({
      pathname: '/edit-modal',
      params: {
        title: `Edit ${param}`,
        name: param,
        segment: segment,
      },
    })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          theme.mode === 'dark' ? theme.colors.shade900 : theme.colors.shade000,
      }}
    >
      <ScrollView>
        <View
          style={{
            minHeight: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            size={100}
            rounded
            title='A'
            containerStyle={{
              backgroundColor: theme.colors.primary,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          {isSuccess && (
            <>
              <DetailSection<
                Pick<UserEntity, 'email' | 'phone_number' | 'user_detail'>
              >
                title='Informasi Pribadi'
                data={userDetail.data}
                field={field}
                action={() => onEdit('Informasi Pribadi', 'profile')}
              />

              <DetailSection
                title='Kewarganegaraan'
                data={userDetail.data.user_detail}
                field={field_detail}
                action={() => onEdit('Kewarganegaraan', 'citizenship')}
              />
            </>
          )}
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              paddingVertical: 10,
              marginTop: 20,
            }}
          >
            <Button outlined color={'error'}>
              Hapus Akun
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
