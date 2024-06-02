import { View, Text } from 'react-native'
import React from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import RenderScreen from '@/layouts/render-screen'
import { Button, useTheme } from '@gluestack-ui/themed'
import { ButtonText } from '@gluestack-ui/themed'
const HeaderBack = ({
  color,
  onPress,
}: {
  color?: string
  onPress: () => void
}) => {
  return (
    <Button
      size='md'
      variant='solid'
      action='primary'
      isDisabled={false}
      isFocusVisible={false}
    >
      <ButtonText>Add </ButtonText>
    </Button>
  )
}

const EditModal = () => {
  const params = useLocalSearchParams()
  const isPresented = router.canGoBack()
  const theme = useTheme()

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',

          presentation: 'modal',
          title: `Edit ${params.name as string}`,
        }}
      />
      <RenderScreen segment={params.segment as string} />
    </View>
  )
}

export default EditModal
