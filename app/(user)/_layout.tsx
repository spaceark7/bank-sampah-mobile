import React from 'react'
import { Link, Tabs } from 'expo-router'
import { Pressable, View } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Text } from '@/components/Themed'
import { useTheme } from '@rneui/themed'
// import ProfileHeader from '@/components/ui/profile/profile-header'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { theme } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarBackground: () => (
          <View
            style={{
              backgroundColor: theme.colors.background,
              height: 100,
              width: '100%',
            }}
          />
        ),

        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerBackground: () => (
          <View
            style={{
              backgroundColor: theme.colors.background,
              height: 80,
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
            <Link href='/modal' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
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
