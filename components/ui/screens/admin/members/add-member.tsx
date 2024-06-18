import { StyleSheet } from 'react-native'
import React from 'react'
import Stepper from 'react-native-stepper-view'
import { Text, View } from '@/components/Themed'
import { Button, Icon, useTheme } from '@rneui/themed'

const AddMember = () => {
  const { theme } = useTheme()

  //* Methods
  const handleSubmit = React.useCallback(() => {
    console.log('submitted')
  }, [])

  const handlePrevStep = React.useCallback((prevStep: number) => {
    console.log('navigate to:', prevStep)
  }, [])

  const handleNextStep = React.useCallback((nextStep: number) => {
    console.log('navigate to:', nextStep)
  }, [])

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Stepper
        onSubmit={handleSubmit}
        onPrevStep={handlePrevStep}
        onNextStep={handleNextStep}
        numberOfSteps={3}
        stepContainerStyle={{
          backgroundColor: theme.colors.background,
        }}
        ButtonComponent={({ onPress, disabled, step, type }) => (
          <Button
            onPress={onPress}
            title={
              type === 'submit'
                ? 'Submit'
                : type === 'next'
                ? 'Next'
                : 'Previous'
            }
            disabled={disabled}
            text
            style={{
              marginVertical: 10,
              backgroundColor: theme.colors.primary,
            }}
          />
        )}
      >
        <Stepper.Step
          label='Step 1'
          activeStepIconBgColor={theme.colors.primary}
          activeStepIconBorderColor={theme.colors.primary}
          completedStepIconBgColor={theme.colors.primary}
          disabledStepIconBgColor={theme.colors.shade300}
          disabledStepNumColor={theme.colors.primaryTextColor}
          progressBarBgColor={
            theme.mode === 'dark'
              ? theme.colors.shade000
              : theme.colors.shade400
          }
          completedProgressBarBgColor={theme.colors.primary}
          activeIcon={
            <Icon
              name='card-account-details'
              size={24}
              color={theme.colors.primaryTextColor}
              type='material-community'
            />
          }
          completedIcon={
            <Icon
              name='check-bold'
              size={24}
              color={theme.colors.primaryTextColor}
              type='material-community'
            />
          }
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Step 1 view</Text>
          </View>
        </Stepper.Step>

        <Stepper.Step
          label='Step 2'
          activeStepIconBgColor={theme.colors.primary}
          activeStepIconBorderColor={theme.colors.primary}
          completedStepIconBgColor={theme.colors.primary}
          disabledStepIconBgColor={theme.colors.shade300}
          disabledStepNumColor={theme.colors.primaryTextColor}
          progressBarBgColor={
            theme.mode === 'dark'
              ? theme.colors.shade000
              : theme.colors.shade400
          }
          completedProgressBarBgColor={theme.colors.primary}
          activeIcon={
            <Icon
              name='card-account-details'
              size={24}
              color={theme.colors.primaryTextColor}
              type='material-community'
            />
          }
          completedIcon={
            <Icon
              name='check-bold'
              size={24}
              color={theme.colors.primaryTextColor}
              type='material-community'
            />
          }
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Step 2 view</Text>
          </View>
        </Stepper.Step>

        <Stepper.Step
          activeStepIconBgColor={theme.colors.primary}
          activeStepIconBorderColor={theme.colors.primary}
          completedStepIconBgColor={theme.colors.primary}
          disabledStepIconBgColor={theme.colors.shade300}
          disabledStepNumColor={theme.colors.primaryTextColor}
          progressBarBgColor={
            theme.mode === 'dark'
              ? theme.colors.shade000
              : theme.colors.shade400
          }
          completedProgressBarBgColor={theme.colors.primary}
          activeIcon={
            <Icon
              name='card-account-details'
              size={24}
              color={theme.colors.primaryTextColor}
              type='material-community'
            />
          }
          completedIcon={
            <Icon
              name='check-bold'
              size={24}
              color={theme.colors.primaryTextColor}
              type='material-community'
            />
          }
          label='Step 3'
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Step 3 view</Text>
          </View>
        </Stepper.Step>
      </Stepper>
    </View>
  )
}

export default AddMember

const styles = StyleSheet.create({})
