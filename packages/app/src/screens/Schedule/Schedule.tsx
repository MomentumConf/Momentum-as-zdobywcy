import React, { FC } from 'react'
// import Constants from 'expo-constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import TextPage from 'components/TextPage'
import Markdown from 'components/Markdown'

const schedule = [
  {
    title: 'Poniedziałek',
    slug: 'pn',
    content: `
12.00 - REJESTRACJA
20.00 - SESJA WIECZORNA
22.30 - FUN NIGHT
    `,
  },
  {
    title: 'Wtorek',
    slug: 'wt',
    content: `
8.00 - MODLITWA
10.00 - SESJA PORANNA
12.00 - EQUIP

- Wolność od strachu i oceny. Wolność od pułapki oczekiwań.
  Maria Marszałek- Łuczniczka
- Wolność do bycia człowiekiem, który wnosi błogosławieństwo, a nie hejt.
  Kuba Kuzynin - Staff Room
- Wolność w relacjach. Czyste źródło.
  Jak budować zdrowy związek, relację, małżeństwo?
  Kasia i Ryszard Augustyniak - Sala Główna
    `,
  },
  {
    title: 'Środa',
    slug: 'śr',
    content: `
8.00 - MODLITWA
10.00 - SESJA PORANNA
12.00 - EQUIP

- Wolność od depresji, smutku.
Gosia Bieniaszewska - Sala Główna
- Wolność do bycia tam, gdzie Kościół boi się wyjść.
Ania Greenwood - Staff Room
- Wolność w relacjach. Wolne Serce.
Jak być wolnym i przebaczać duże i małe sprawy?
Gosia i Dominik Tomaszewscy - Łuczniczka

13.30 - STREFA CHILL & BE ACTIVE
17.00 - MOMENTUM W AKCJI
20.00 - SESJA WIECZORNA
22.30 - FUN NIGHT
    `,
  },
  {
    title: 'Czwartek',
    slug: 'czw',
    content: `
8.00 - MODLITWA
10.00 - SESJA PORANNA
12.00 - EQUIP

- Wolność od zniewoleń
Zbyszek Zarożny - Sala Główna
- Wolność do wykorzystania 100% swojego potencjału
Gosia Bieniaszewska - Staff Room
- Wolność w relacjach. Język niosący życie
Jak rozmawiać, komunikować w relacjach z rodzicami, przyjaciółmi, ludźmi z Kościoła i w związku?
Daria i Kuba Marciniak - Łuczniczka

13.30 - STREFA CHILL & BE ACTIVE
17.00 - MOMENTUM W AKCJI
20.00 - SESJA WIECZORNA
22.30 - FUN NIGHT
    `,
  },
  {
    title: 'Piątek',
    slug: 'pt',
    content: `
8.00 - MODLITWA
10.00 - SESJA PORANNA
12.00 - EQUIP

- Wolność od wstydu, życia przeszłością, naznaczenia.
  Gosia Bieniaszewska- Łuczniczka
- Wolność do zrozumienia siebie i odkrycia swojego powołania.
  Marysia i Marcin Lindner - Staff Room
- Wolność w relacjach. Zrozumieć i pokochać Kościół.
  Dlaczego czasami, jest tak trudno w relacjach w Kościele? Jaką
  przyjmować postawę, aby zrozumieć i pokochać Kościół?
  bp Marek Kamiński - Sala Główna

13.30 - STREFA CHILL & BE ACTIVE
16.00 - MOMENTUM W AKCJI
19.00 - SESJA WIECZORNA
22.00 - KONCERT NA PLAŻY
    `,
  },
  {
    title: 'Sobota',
    slug: 'sob',
    content: `
8.00 - MODLITWA
10.00 - SESJA PORANNA
    `,
  },
]

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const Schedule: FC = () => (
  <Tab.Navigator
    screenOptions={{ title: 'Plan' }}
    initialRouteName={schedule[0].title.toLocaleLowerCase()}
  >
    {schedule.map((day) => {
      const Page: FC = () => (
        <TextPage>
          <Markdown>{day.content || ''}</Markdown>
        </TextPage>
      )

      return (
        <Tab.Screen
          key={day.title}
          name={day.title.toLocaleLowerCase()}
          component={Page}
          options={{ title: day.title, tabBarLabel: day.slug.toUpperCase() }}
        />
      )
    })}
  </Tab.Navigator>
)

const ScheduleStack: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Schedule} options={{ title: 'Momentum' }} />
  </Stack.Navigator>
)

export default ScheduleStack
