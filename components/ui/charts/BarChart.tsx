import { Text, View } from '@/components/Themed'
import { Divider, useTheme } from '@rneui/themed'
import React from 'react'
import { BarChart } from 'react-native-gifted-charts'

const UIBarChart = () => {
  const { theme } = useTheme()
  const barData = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T', frontColor: '#177AD5' },
    { value: 745, label: 'W', frontColor: '#177AD5' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F', frontColor: '#177AD5' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
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
          fontSize: 16,
          fontWeight: '700',
        }}
      >
        Member Aktif
      </Text>
      <Divider
        style={{
          marginVertical: 10,
        }}
      />
      <BarChart
        barWidth={18}
        height={150}
        noOfSections={3}
        barBorderRadius={4}
        frontColor='lightgray'
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextStyle={{
          color:
            theme.mode === 'dark'
              ? theme.colors.shade600
              : theme.colors.shade600,
        }}
        xAxisLabelTextStyle={{
          color:
            theme.mode === 'dark'
              ? theme.colors.shade600
              : theme.colors.shade600,
        }}
        yAxisColor={'gray'}
        hideRules
        showReferenceLine1
        referenceLine1Position={420}
        referenceLine1Config={{
          color: 'gray',
          dashWidth: 2,
          dashGap: 3,
        }}
      />
    </View>
  )
}

export default UIBarChart
