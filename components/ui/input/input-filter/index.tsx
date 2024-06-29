import { Text, View } from '@/components/Themed'
import { rnuiTheme } from '@/themes/rnui-theme'
import { Filters } from '@/utils/types'
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Button, CheckBox, Divider, Icon, Input, useTheme } from '@rneui/themed'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { BackHandler, StyleSheet } from 'react-native'
import RenderInputFilter from './components/render-input-filter'

interface InputFilterProps {
  placeholder?: string
  onScrollTo?: () => void
  filters: Filters[]
  search?: string
  setSearch: (search: string) => void
  setFilters: (filters: Filters[]) => void
  resetFilters: () => void
}

const InputFilter = ({
  placeholder,
  onScrollTo,
  filters,
  setFilters,
  search,
  setSearch,
  resetFilters,
}: InputFilterProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // const [filters, setFilters] = React.useState<Filters[]>([
  //   {
  //     key: 'order',
  //     value: 'asc',
  //     condition: 'eq',
  //   },
  //   {
  //     key: 'is_active',
  //     value: '1',
  //     condition: 'eq',
  //   },
  //   {
  //     key: 'gender',
  //     value: 'P',
  //     condition: 'eq',
  //   },
  // ])
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false)
  const [focus, setFocus] = React.useState(false)
  const { theme } = useTheme()

  //* callbacks/methods
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index)
      setBottomSheetVisible(index > -1)
    },
    [bottomSheetVisible]
  )

  const snapPoints = useMemo(() => ['50%', '90%'], [])

  const onScrollFocus = () => {
    if (!focus) {
      setFocus(true)
      onScrollTo && onScrollTo()
    }
  }

  const handleFilterPress = (key: string, value: string) => {
    const newFilters = filters.map((filter) => {
      if (filter.key === key) {
        return {
          ...filter,
          value,
        }
      }
      return filter
    })
    setFilters(newFilters)
  }

  //* Renders
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View
          style={{
            ...styles.row,
            backgroundColor:
              theme.mode === 'dark'
                ? theme.colors.shade800
                : theme.colors.background,
            width: '100%',
            justifyContent: 'flex-end',
            paddingHorizontal: 8,
          }}
        >
          <Button
            title='Reset'
            text
            onPress={() => {
              bottomSheetModalRef.current?.dismiss()
              resetFilters()
            }}
          />
          <Button
            title='Terapkan'
            onPress={() => {
              console.log('filters', filters)
              bottomSheetModalRef.current?.dismiss()
            }}
          />
        </View>
      </BottomSheetFooter>
    ),
    [theme.mode]
  )

  //* Lifecycle hooks
  useEffect(() => {
    const handleBackButton = () => {
      bottomSheetModalRef.current?.close()
      return true
      // dismiss() returns true/false, it means there is any instance of Bottom Sheet visible on current screen.
    }
    if (bottomSheetVisible)
      BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
  }, [bottomSheetVisible])

  return (
    <>
      <Input
        variant='filled'
        placeholder={placeholder || 'Pencarian...'}
        onFocus={onScrollFocus}
        rightIcon={{
          name: 'tune',
          onPress: handlePresentModalPress,
        }}
        value={search}
        onChangeText={setSearch}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        enableDismissOnClose
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        footerComponent={renderFooter}
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
            backgroundColor:
              theme.mode === 'dark'
                ? theme.colors.shade800
                : theme.colors.background,
            padding: 20,
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
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              Filter
            </Text>
            <Divider
              style={{
                marginVertical: 8,
              }}
            />
            <RenderInputFilter
              filters={filters}
              handleFilterPress={handleFilterPress}
            />
            {/* <View
              style={{
                backgroundColor:
                  theme.mode === 'dark'
                    ? theme.colors.shade800
                    : theme.colors.background,
              }}
            >
              <Text
                style={{
                  backgroundColor:
                    theme.mode === 'dark'
                      ? theme.colors.shade800
                      : theme.colors.background,
                }}
                variants='subtitle2'
              >
                Urutan
              </Text>
              <View
                style={{
                  ...styles.row,
                  backgroundColor:
                    theme.mode === 'dark'
                      ? theme.colors.shade800
                      : theme.colors.background,
                }}
              >
                <CheckBox
                  containerStyle={{
                    backgroundColor:
                      theme.mode === 'dark'
                        ? theme.colors.shade800
                        : theme.colors.background,
                  }}
                  checked={
                    filters.find((filter) => filter.key === 'order')?.value ===
                    'asc'
                  }
                  onPress={() => handleFilterPress('order', 'asc')}
                  title={'Naik'}
                  checkedIcon={
                    <Icon
                      name='radiobox-marked'
                      type='material-community'
                      size={20}
                      color={theme.colors.infoTextColor}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name='radiobox-blank'
                      type='material-community'
                      size={20}
                      color={theme.colors.secondaryTextColor}
                    />
                  }
                />
                <CheckBox
                  checked={
                    filters.find((filter) => filter.key === 'order')?.value ===
                    'desc'
                  }
                  onPress={() => handleFilterPress('order', 'desc')}
                  containerStyle={{
                    backgroundColor:
                      theme.mode === 'dark'
                        ? theme.colors.shade800
                        : theme.colors.background,
                  }}
                  title={'Menurun'}
                  checkedIcon={
                    <Icon
                      name='radiobox-marked'
                      type='material-community'
                      size={20}
                      color={theme.colors.infoTextColor}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name='radiobox-blank'
                      type='material-community'
                      size={20}
                      color={theme.colors.secondaryTextColor}
                    />
                  }
                />
              </View>
              <Divider
                style={{
                  marginVertical: 8,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor:
                  theme.mode === 'dark'
                    ? theme.colors.shade800
                    : theme.colors.background,
              }}
            >
              <Text
                style={{
                  backgroundColor:
                    theme.mode === 'dark'
                      ? theme.colors.shade800
                      : theme.colors.background,
                }}
                variants='subtitle2'
              >
                Status
              </Text>
              <View
                style={{
                  ...styles.row,
                  backgroundColor:
                    theme.mode === 'dark'
                      ? theme.colors.shade800
                      : theme.colors.background,
                }}
              >
                <CheckBox
                  checked={
                    filters.find((filter) => filter.key === 'is_active')
                      ?.value === '1'
                  }
                  onPress={() => handleFilterPress('is_active', '1')}
                  containerStyle={{
                    backgroundColor:
                      theme.mode === 'dark'
                        ? theme.colors.shade800
                        : theme.colors.background,
                  }}
                  title={'Teraktivasi'}
                  checkedIcon={
                    <Icon
                      name='radiobox-marked'
                      type='material-community'
                      size={20}
                      color={theme.colors.infoTextColor}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name='radiobox-blank'
                      type='material-community'
                      size={20}
                      color={theme.colors.secondaryTextColor}
                    />
                  }
                />
                <CheckBox
                  containerStyle={{
                    backgroundColor:
                      theme.mode === 'dark'
                        ? theme.colors.shade800
                        : theme.colors.background,
                  }}
                  checked={
                    filters.find((filter) => filter.key === 'is_active')
                      ?.value === '2'
                  }
                  onPress={() => handleFilterPress('is_active', '2')}
                  title={'Belum Teraktivasi'}
                  checkedIcon={
                    <Icon
                      name='radiobox-marked'
                      type='material-community'
                      size={20}
                      color={theme.colors.infoTextColor}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name='radiobox-blank'
                      type='material-community'
                      size={20}
                      color={theme.colors.secondaryTextColor}
                    />
                  }
                />
              </View>
              <Divider
                style={{
                  marginVertical: 8,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor:
                  theme.mode === 'dark'
                    ? theme.colors.shade800
                    : theme.colors.background,
              }}
            >
              <Text
                style={{
                  backgroundColor:
                    theme.mode === 'dark'
                      ? theme.colors.shade800
                      : theme.colors.background,
                }}
                variants='subtitle2'
              >
                Jenis Kelamin
              </Text>
              <View
                style={{
                  ...styles.row,
                  backgroundColor:
                    theme.mode === 'dark'
                      ? theme.colors.shade800
                      : theme.colors.background,
                }}
              >
                <CheckBox
                  containerStyle={{
                    backgroundColor:
                      theme.mode === 'dark'
                        ? theme.colors.shade800
                        : theme.colors.background,
                  }}
                  checked={
                    filters
                      .find(
                        (filter) =>
                          filter.key === 'status' &&
                          typeof filter.value === 'string'
                      )
                      ?.value?.includes('Male') ?? false
                  }
                  onPress={() => handleFilterPress('status', 'Male')}
                  title={'Pria'}
                  checkedIcon={
                    <Icon
                      name='radiobox-marked'
                      type='material-community'
                      size={20}
                      color={theme.colors.infoTextColor}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name='radiobox-blank'
                      type='material-community'
                      size={20}
                      color={theme.colors.secondaryTextColor}
                    />
                  }
                />
                <CheckBox
                  containerStyle={{
                    backgroundColor:
                      theme.mode === 'dark'
                        ? theme.colors.shade800
                        : theme.colors.background,
                  }}
                  onPress={() => handleFilterPress('status', 'Female')}
                  checked={
                    filters
                      .find(
                        (filter) =>
                          filter.key === 'status' &&
                          typeof filter.value === 'string'
                      )
                      ?.value?.includes('Female') ?? false
                  }
                  title={'Wanita'}
                  checkedIcon={
                    <Icon
                      name='radiobox-marked'
                      type='material-community'
                      size={20}
                      color={theme.colors.infoTextColor}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name='radiobox-blank'
                      type='material-community'
                      size={20}
                      color={theme.colors.secondaryTextColor}
                    />
                  }
                />
              </View>
              <Divider
                style={{
                  marginVertical: 8,
                }}
              />
            </View> */}
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      rnuiTheme.mode === 'dark'
        ? rnuiTheme.darkColors?.shade800
        : rnuiTheme.lightColors?.background,
  },
  backgroundTheme: {
    backgroundColor:
      rnuiTheme.mode === 'dark'
        ? rnuiTheme.darkColors?.shade800
        : rnuiTheme.lightColors?.background,
  },
})

export default InputFilter
