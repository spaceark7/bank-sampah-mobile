import React from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import RenderScreen from '@/layouts/render-screen'
import { Button, useTheme } from '@rneui/themed'
import { View } from '@/components/Themed'
const HeaderBack = ({
  color,
  onPress,
}: {
  color?: string
  onPress: () => void
}) => {
  return (
    <Button size='md' color='primary'>
      Add
    </Button>
  )
}

const EditModal = () => {
  const params = useLocalSearchParams()
  const isPresented = router.canGoBack()
  const { theme } = useTheme()

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.colors.textColor,
          },

          presentation: 'modal',
          title: `Edit ${params.name as string}`,
          headerStyle: {
            backgroundColor:
              theme.mode === 'dark'
                ? theme.colors.shade800
                : theme.colors.shade100,
          },
        }}
      />
      <RenderScreen segment={params.segment as string} />
    </View>
  )
}

export default EditModal
