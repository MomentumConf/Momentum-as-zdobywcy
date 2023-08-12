/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import React, { FC, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useTheme } from '@emotion/react'
import ScheduleScreen, { screens as scheduleScreens } from './screens/Schedule'
import NotificationsScreen from './screens/Notifications'
import SpeakersScreen, {
  screens as speakersScreens,
} from 'screens/TabsNavigation/screens/Informations'
import TabIcon from './components/TabIcon'
import useNotifications from 'hooks/useNotifications'

export const screens = {
  Schedule: {
    path: 'plan',
    screens: scheduleScreens,
  },
  Notifications: 'powiadomienia',
  Speakers: {
    path: 'mowcy',
    screens: speakersScreens,
  },
}

const BottomTab = createBottomTabNavigator<Record<keyof typeof screens, undefined>>()

const ScheduleIcon: FC<{ color: string }> = ({ color }) => (
  <TabIcon name="calendar-sharp" color={color} />
)
const NotificationIcon: FC<{ color: string }> = ({ color }) => (
  <TabIcon name="notifications-sharp" color={color} />
)
const SpeakersIcon: FC<{ color: string }> = ({ color }) => (
  <TabIcon name="people-circle-sharp" color={color} />
)

const BottomTabNavigator: FC = () => {
  const theme = useTheme()
  const { unreadCount } = useNotifications()
  // TODO: refactor - icon and badge should be moved to different component (re-rendering issue)
  const [notificationsFocused, setNotificationsFocused] = useState<boolean>(false)

  return (
    <BottomTab.Navigator
      initialRouteName="Schedule"
      tabBarOptions={{
        activeTintColor: theme.navigation.colors.primary,
        style: {
          paddingVertical: 3,
          height: 56,
        },
        labelStyle: {
          fontSize: theme.fontSize.s,
          fontFamily: theme.font.default,
        },
        safeAreaInsets: {
          top: theme.spacing.xs,
          bottom: theme.spacing.xs,
        },
      }}
      backBehavior="initialRoute"
    >
      <BottomTab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ScheduleIcon,
          title: 'Plan',
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        listeners={() => ({
          focus: () => {
            setNotificationsFocused(true)
          },
          blur: () => {
            setTimeout(() => {
              // NOTE: additional time for unread count badge to update
              setNotificationsFocused(false)
            }, 1000)
          },
        })}
        options={{
          tabBarIcon: NotificationIcon,
          title: 'Powiadomienia',
          tabBarBadge: !unreadCount || notificationsFocused ? undefined : `${unreadCount}`,
          tabBarBadgeStyle: { backgroundColor: theme.color.accent },
        }}
      />
      <BottomTab.Screen
        name="Speakers"
        component={SpeakersScreen}
        options={{
          tabBarIcon: SpeakersIcon,
          title: 'Mówcy',
          unmountOnBlur: true,
        }}
        listeners={({ navigation }) => ({
          // Issue with `unmountOnBlur`: https://git.io/JGOxL
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator
