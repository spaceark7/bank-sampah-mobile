import React from 'react'
import { Link, Tabs } from 'expo-router'
import { Appearance, Pressable } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
// import ProfileHeader from '@/components/ui/profile/profile-header'
import { useTheme } from '@rneui/themed'
import { View, Text } from '@/components/Themed'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { theme, updateTheme } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor:
            theme.mode === 'dark'
              ? theme.colors.shade700
              : theme.colors.shade300,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerBackground: () => (
          <View
            style={{
              height: 100,
              width: '100%',
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Beranda',
          headerTitle: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),

          headerLeft: () => <Text> Profile Header </Text>,
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerRight: () => (
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name={theme.mode === 'dark' ? 'sun-o' : 'moon-o'}
                  size={25}
                  color={theme.colors.textColor}
                  onPress={() => {
                    updateTheme({
                      mode: theme.mode === 'dark' ? 'light' : 'dark',
                    })
                    Appearance.setColorScheme(
                      theme.mode === 'dark' ? 'light' : 'dark'
                    )
                  }}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name='administration'
        options={{
          title: 'Admin',
          headerTitle: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'grid' : 'grid-outline'}
              color={color}
            />
          ),

          headerLeft: () => <Text> Profile Header </Text>,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerTitleStyle: {
            color: theme.colors.textColor,
          },
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerBackground: () => (
            <View
              style={{
                height: 100,
                width: '100%',
                backgroundColor: theme.colors.background,
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? 'user' : 'user-o'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
