import React, { FC, useContext, useMemo } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { isSameDay } from 'date-fns'

import { useGetScheduleQuery } from '@-local/db/lib/api'
import Header from 'components/Header'
import TextPage from 'components/TextPage'
import getDays from './utils/getDays'
import Session from './components/Session'
import ErrorBoundary from 'containers/error/Boundary'
import { FullLoader as Loader } from 'components/Loader'
import { NetworkInformationContext } from 'providers/NetworkInformation'
import usePolling from 'hooks/usePolling'

export const screens = {
  Day: ':id',
}

const Tab = createMaterialTopTabNavigator()

const DaysTabs: FC = () => {
  const { isConnected } = useContext(NetworkInformationContext)
  const { loading, error, data, startPolling, stopPolling } = useGetScheduleQuery({
    fetchPolicy: isConnected ? 'cache-and-network' : 'cache-only',
  })

  usePolling(startPolling, stopPolling, 10000)
  const { session } = data || {}
  const days = useMemo(() => session && getDays(session), [session])
  const tabs = useMemo(
    () =>
      days
        ? days.map(({ id, name, shortName, sessions }) => {
            const Page: FC = () => (
              <TextPage>
                {sessions.map((session) => (
                  <Session key={session.id} {...session} />
                ))}
              </TextPage>
            )

            return (
              <Tab.Screen
                key={id}
                name={name}
                component={Page}
                options={{ title: `Plan na ${name} | Zdobywcy`, tabBarLabel: shortName }}
              />
            )
          })
        : [],
    [days],
  )

  if (loading) return <Loader />
  if (error || !data || !days) throw error

  const currentDay = days.find(({ value }) => isSameDay(Date.now(), value))?.name || days[0].name

  return (
    <Tab.Navigator screenOptions={{ title: 'Plan' }} initialRouteName={currentDay}>
      {tabs}
    </Tab.Navigator>
  )
}

const Schedule: FC = () => {
  return (
    <>
      <Header>ZDOBYWCY 2023</Header>
      <ErrorBoundary>
        <DaysTabs />
      </ErrorBoundary>
    </>
  )
}

export default Schedule
