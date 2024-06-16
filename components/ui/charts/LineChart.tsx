import { Text, View } from '@/components/Themed'
import { LineChart, yAxisSides } from 'react-native-gifted-charts'
import React from 'react'
import { useTheme } from '@rneui/themed'

const UILineChart = () => {
  const { theme } = useTheme()
  const ptData = [
    { value: 160, date: '1 Apr 2022' },
    { value: 180, date: '2 Apr 2022' },
    { value: 190, date: '3 Apr 2022' },
    { value: 180, date: '4 Apr 2022' },
    { value: 140, date: '5 Apr 2022' },
    { value: 145, date: '6 Apr 2022' },
    { value: 160, date: '7 Apr 2022' },
    { value: 200, date: '8 Apr 2022' },

    { value: 220, date: '9 Apr 2022' },
    {
      value: 240,
      date: '10 Apr 2022',
      label: '10 Apr',
      labelTextStyle: { color: theme.colors.textColor, width: 60 },
    },
    { value: 280, date: '11 Apr 2022' },
    { value: 260, date: '12 Apr 2022' },
    { value: 340, date: '13 Apr 2022' },
    { value: 385, date: '14 Apr 2022' },
    { value: 280, date: '15 Apr 2022' },
    { value: 390, date: '16 Apr 2022' },

    { value: 370, date: '17 Apr 2022' },
    { value: 285, date: '18 Apr 2022' },
    { value: 295, date: '19 Apr 2022' },
    {
      value: 300,
      date: '20 Apr 2022',
      label: '20 Apr',
      labelTextStyle: { color: theme.colors.textColor, width: 60 },
    },
    { value: 280, date: '21 Apr 2022' },
    { value: 295, date: '22 Apr 2022' },
    { value: 260, date: '23 Apr 2022' },
    { value: 255, date: '24 Apr 2022' },

    { value: 190, date: '25 Apr 2022' },
    { value: 220, date: '26 Apr 2022' },
    { value: 205, date: '27 Apr 2022' },
    { value: 230, date: '28 Apr 2022' },
    { value: 210, date: '29 Apr 2022' },
    {
      value: 200,
      date: '30 Apr 2022',
      label: '30 Apr',
      labelTextStyle: { color: theme.colors.textColor, width: 60 },
    },
  ]

  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          marginBottom: 10,
        }}
      >
        Member Aktif
      </Text>
      <LineChart
        areaChart
        data={ptData}
        hideDataPoints
        spacing={10}
        color='#00ff83'
        thickness={2}
        startFillColor='rgba(20,105,81,0.3)'
        endFillColor='rgba(20,85,81,0.01)'
        startOpacity={theme.mode === 'dark' ? 0.9 : 1}
        endOpacity={theme.mode === 'dark' ? 0.2 : 0.5}
        initialSpacing={0}
        noOfSections={2}
        yAxisColor='white'
        yAxisThickness={0}
        rulesType='solid'
        rulesColor={
          theme.mode === 'dark' ? theme.colors.shade700 : theme.colors.shade400
        }
        yAxisTextStyle={{
          color:
            theme.mode === 'dark'
              ? theme.colors.shade700
              : theme.colors.shade600,
        }}
        yAxisSide={yAxisSides.LEFT}
        xAxisColor={
          theme.mode === 'dark' ? theme.colors.shade700 : theme.colors.shade400
        }
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor:
            theme.mode === 'dark'
              ? theme.colors.shade700
              : theme.colors.shade400,
          pointerStripWidth: 2,
          pointerColor:
            theme.mode === 'dark'
              ? theme.colors.shade700
              : theme.colors.shade400,
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: (items: any) => {
            return (
              <View
                style={{
                  height: 90,
                  width: 100,
                  justifyContent: 'center',
                  marginLeft: -40,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                  }}
                >
                  {items[0].date}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 16,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {'$' + items[0].value + '.0'}
                  </Text>
                </View>
              </View>
            )
          },
        }}
      />
    </View>
  )
}

export default UILineChart
