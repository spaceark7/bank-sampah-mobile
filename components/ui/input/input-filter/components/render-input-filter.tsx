import { Text, View } from '@/components/Themed'
import { rnuiTheme } from '@/themes/rnui-theme'
import { DateFormatter } from '@/utils/helpers/Functions'
import { Filters } from '@/utils/types'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { Input } from '@rneui/themed'
import { CheckBox, Divider, Icon, useTheme } from '@rneui/themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import InputFilterDate from './input-filter-date'

interface IRenderInputFilterProps {
  filters?: Filters[]
  filter: Filters
  handleFilterPress?: (key: string, value: string) => void
}

const RenderInputFilter: React.FC<IRenderInputFilterProps> = ({
  filter,
  handleFilterPress,
}) => {
  //#region Hooks
  const { theme } = useTheme()
  //#region Methods
  const handlePress = (key: string, value: string) => {
    handleFilterPress && handleFilterPress(key, value)
  }

  switch (filter.type) {
    case 'radio':
      return (
        <>
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
              key={filter.key}
              style={{
                ...styles.row,
                backgroundColor:
                  theme.mode === 'dark'
                    ? theme.colors.shade800
                    : theme.colors.background,
              }}
            >
              {filter.options?.map((option) => (
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
              ))}
            </View>
            <Divider
              style={{
                marginVertical: 8,
              }}
            />
          </View>
        </>
      )
    case 'date':
      return (
        <>
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
              key={filter.key}
              style={{
                ...styles.row,

                backgroundColor:
                  theme.mode === 'dark'
                    ? theme.colors.shade800
                    : theme.colors.background,
                paddingVertical: 10,
              }}
            >
              <InputFilterDate
                filter={filter}
                handleOnChange={handlePress}
                buttonGroups={[
                  {
                    icon: 'calendar',
                  },
                  {
                    icon: 'clock',
                  },
                ]}
              />
            </View>
            <Divider
              style={{
                marginVertical: 8,
              }}
            />
          </View>
        </>
      )
    default:
      return null
  }

  // return (
  //   <>
  //     {filters.map(
  //       (filter) =>
  //         filter.key !== 'search' && (
  //           <View
  //             key={filter.key}
  //             style={{
  //               backgroundColor:
  //                 theme.mode === 'dark'
  //                   ? theme.colors.shade800
  //                   : theme.colors.background,
  //             }}
  //           >
  //             <Text
  //               style={{
  //                 backgroundColor:
  //                   theme.mode === 'dark'
  //                     ? theme.colors.shade800
  //                     : theme.colors.background,
  //               }}
  //               variants='subtitle2'
  //             >
  //               {filter.title}
  //             </Text>
  //             <View
  //               style={{
  //                 ...styles.row,
  //                 backgroundColor:
  //                   theme.mode === 'dark'
  //                     ? theme.colors.shade800
  //                     : theme.colors.background,
  //               }}
  //             >
  //               {!filter.type || filter.type === 'radio'
  //                 ? filter.options?.map((option) => (
  //                     <CheckBox
  //                       key={option.label}
  //                       containerStyle={{
  //                         backgroundColor:
  //                           theme.mode === 'dark'
  //                             ? theme.colors.shade800
  //                             : theme.colors.background,
  //                       }}
  //                       checked={filter.value === option.value}
  //                       onPress={() => handlePress(filter.key, option.value)}
  //                       title={option.label}
  //                       checkedIcon={
  //                         <Icon
  //                           name='radiobox-marked'
  //                           type='material-community'
  //                           size={20}
  //                           color={theme.colors.infoTextColor}
  //                         />
  //                       }
  //                       uncheckedIcon={
  //                         <Icon
  //                           name='radiobox-blank'
  //                           type='material-community'
  //                           size={20}
  //                           color={theme.colors.secondaryTextColor}
  //                         />
  //                       }
  //                     />
  //                   ))
  //                 : null}

  //             </View>
  //             <Divider
  //               style={{
  //                 marginVertical: 8,
  //               }}
  //             />
  //           </View>
  //         )
  //     )}
  //   </>
  // )
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
