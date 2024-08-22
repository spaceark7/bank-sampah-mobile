import { StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import Stepper, { StepperRefAttributes } from 'react-native-stepper-view'
import { Text, View } from '@/components/Themed'
import { Button, Icon, useTheme } from '@rneui/themed'
import RegisterForm from './components/register-member-form'
import RegisterCitizenshipForm from './components/register-member-citizenship-form'
import { router } from 'expo-router'

const RegisterMember = () => {
  const { theme } = useTheme()
  const [userId, setUserId] = React.useState<string>('')
  const stepperRef = useRef<StepperRefAttributes>(null)
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
        ref={stepperRef}
        onSubmit={handleSubmit}
        onPrevStep={handlePrevStep}
        onNextStep={handleNextStep}
        numberOfSteps={2}
        stepContainerStyle={{
          backgroundColor: theme.colors.background,
        }}
        stepIconsContainerStyle={{
          width: '100%',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.background,
        }}
        showButtons={true}
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
          label='Informasi'
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
          <View style={styles.form_container}>
            <RegisterForm
              setUserId={setUserId}
              onCallback={() => {
                stepperRef.current?.nextStep()
              }}
            />
          </View>
        </Stepper.Step>

        <Stepper.Step
          label='Identitas'
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
          <View style={styles.form_container}>
            <RegisterCitizenshipForm
              userId={userId}
              onCallback={() => {
                router.dismiss()
              }}
            />
          </View>
        </Stepper.Step>
      </Stepper>
    </View>
  )
}

export default RegisterMember

const styles = StyleSheet.create({
  form_container: {
    paddingVertical: 20,
  },
})
