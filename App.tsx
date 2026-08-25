import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding0 from './src/screens/Pre_Login/Onboarding0'
import { NavigationContainer } from '@react-navigation/native'
import Onboarding1 from './src/screens/Pre_Login/Onboarding1'
import Onboarding2 from './src/screens/Pre_Login/Onboarding2'
import Onboarding3 from './src/screens/Pre_Login/Onboarding3'
import Signin from './src/screens/Pre_Login/Signin'
import Signup from './src/screens/Pre_Login/Signup'



const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name='Onboarding0' component={Onboarding0} />
          <Stack.Screen name='Onboarding1' component={Onboarding1} />
          <Stack.Screen name='Onboarding2' component={Onboarding2} />
          <Stack.Screen name='Onboarding3' component={Onboarding3} /> 
          <Stack.Screen name='Signin' component={Signin} /> */}
          <Stack.Screen name='Signup' component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App