import { useNavigation } from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import React, { FC } from 'react'

import Speaker, { ParamList as SpeakerParamList } from './screens/Speaker'
import Speakers from './screens/Speakers'

export const screens = {
  SpeakersList: '',
  Speaker: {
    path: ':name',
    parse: {
      name: (name: string): string => decodeURI(name),
    },
    stringify: {
      name: (name: string): string => encodeURI(name),
    },
  },
}

type InfoStackParamList = {
  SpeakersList: undefined
} & SpeakerParamList

const Stack = createStackNavigator<InfoStackParamList>()

const BackButton = () => {
  const navigation = useNavigation()
  return navigation.canGoBack() ? (
    <HeaderBackButton canGoBack accessibilityLabel="Powrót" onPress={() => navigation.goBack()} />
  ) : null
}

const Informations: FC = () => (
  <Stack.Navigator initialRouteName="SpeakersList">
    <Stack.Screen
      name="SpeakersList"
      component={Speakers}
      options={{ title: 'Mówcy', headerShown: false }}
    />
    <Stack.Screen
      name="Speaker"
      component={Speaker}
      options={({ route }) => ({
        title: route?.params?.name,
        headerLeft: BackButton,
      })}
    />
  </Stack.Navigator>
)

export default Informations
