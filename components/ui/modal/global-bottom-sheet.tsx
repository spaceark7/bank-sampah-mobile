import { Text } from '@/components/Themed'
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView
} from '@gorhom/bottom-sheet'
import { useTheme } from '@rneui/themed'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { BackHandler } from 'react-native'

export interface GlobalBottomSheetProps {
  isVisible: boolean
  onDismiss?: () => void
}

const GlobalBottomSheet = ({
  isVisible,
  onDismiss,
}: GlobalBottomSheetProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { theme } = useTheme()
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    if (!isVisible) return
    bottomSheetModalRef.current?.present()
  }, [isVisible])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  useEffect(() => {
    handlePresentModalPress()
  }, [isVisible])

  useEffect(() => {
    const handleBackButton = () => {
      bottomSheetModalRef.current?.close()
      return true
      // dismiss() returns true/false, it means there is any instance of Bottom Sheet visible on current screen.
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
  }, [])

  const snapPoints = useMemo(() => ['50%', '90%'], [])
  return (
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
  )
}

export default GlobalBottomSheet
