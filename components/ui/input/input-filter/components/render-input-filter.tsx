import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, View } from '@/components/Themed'
import { CheckBox, Divider, Icon, useTheme } from '@rneui/themed'
import { rnuiTheme } from '@/themes/rnui-theme'
import { Filters } from '@/utils/types'

interface IRenderInputFilterProps {
  filters: Filters[]
  handleFilterPress?: (key: string, value: string) => void
}

const RenderInputFilter: React.FC<IRenderInputFilterProps> = ({
  filters,
  handleFilterPress,
}) => {
  //#region Hooks
  const { theme } = useTheme()

  //#region Methods
  const handlePress = (key: string, value: string) => {
    handleFilterPress && handleFilterPress(key, value)
  }
  return (
    <>
      {filters.map(
        (filter) =>
          filter.key !== 'search' && (
            <View
              key={filter.key}
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
                {filter.title}
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
                {!filter.type || filter.type === 'radio'
                  ? filter.options?.map((option) => (
                      <CheckBox
                        key={option.label}
                        containerStyle={{
                          backgroundColor:
                            theme.mode === 'dark'
                              ? theme.colors.shade800
                              : theme.colors.background,
                        }}
                        checked={filter.value === option.value}
                        onPress={() => handlePress(filter.key, option.value)}
                        title={option.label}
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
                    ))
                  : null}
                {/* <CheckBox
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
              onPress={() => handlePress('order', 'asc')}
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
              onPress={() => handlePress('order', 'asc')}
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
              onPress={() => handlePress('order', 'desc')}
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
            /> */}
              </View>
              <Divider
                style={{
                  marginVertical: 8,
                }}
              />
            </View>
          )
      )}
    </>
  )
}

export default RenderInputFilter

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
