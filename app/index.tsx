import React from 'react'
import { ResizeMode, Video } from 'expo-av'
import { useAssets } from 'expo-asset'
import { Link, useRouter } from 'expo-router'
import { useAppSelector } from '@/store/hooks'
import LoadingScreen from '@/components/ui/loading-screen'
import { Text, View } from '@/components/Themed'
import { Button } from '@rneui/themed'

const Page = () => {
  const [asset] = useAssets([require('@/assets/videos/intro.mp4')])
  const isInit = useAppSelector((state) => state.auth.isInit)
  const router = useRouter()
  return isInit ? (
    <LoadingScreen message='Inisiasi Sistem ...' />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      {asset && (
        <Video
          resizeMode={ResizeMode.COVER}
          source={{
            uri: asset[0].uri,
          }}
          shouldPlay
          isLooping
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
      )}
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            marginTop: 100,
            fontSize: 40,
          }}
        >
          Bank Sampah
        </Text>
        <Text>Kelola sampah rumah tangga agar menjadi uang</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 20,
        }}
      >
        <Button
          style={{
            width: '100%',
            flex: 1,
          }}
          containerStyle={{
            width: '100%',
          }}
          onPress={() => router.push('/login')}
        >
          Mulai
        </Button>
      </View>
    </View>
  )
}

export default Page
