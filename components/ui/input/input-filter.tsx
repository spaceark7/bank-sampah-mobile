import { Text, View } from '@/components/Themed'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Input, useTheme } from '@rneui/themed'
import React, { useCallback, useMemo, useRef } from 'react'

const InputFilter = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { theme } = useTheme()
  //* callbacks/methods
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const snapPoints = useMemo(() => ['50%', '90%'], [])

  return (
    <>
      <Input
        variant='filled'
        placeholder='Cari Member'
        rightIcon={{
          name: 'tune',
          onPress: handlePresentModalPress,
        }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor:
            theme.mode === 'dark'
              ? theme.colors.shade800
              : theme.colors.background,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
        }}
        handleIndicatorStyle={{
          backgroundColor:
            theme.mode === 'dark'
              ? theme.colors.shade600
              : theme.colors.textColor,
        }}
        containerStyle={{
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        backgroundStyle={{
          backgroundColor:
            theme.mode === 'dark'
              ? theme.colors.shade800
              : theme.colors.background,
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor:
              theme.mode === 'dark'
                ? theme.colors.shade800
                : theme.colors.background,
          }}
        >
          <BottomSheetScrollView
            contentContainerStyle={{
              backgroundColor:
                theme.mode === 'dark'
                  ? theme.colors.shade800
                  : theme.colors.background,
            }}
            style={{
              backgroundColor:
                theme.mode === 'dark'
                  ? theme.colors.shade800
                  : theme.colors.background,
            }}
          >
            <Text>Awesome 🎉</Text>
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}

export default InputFilter
