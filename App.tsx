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
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import HomePage from './src/screens/Post_Login/HomePage'
import Wishlist from './src/screens/Post_Login/Wishlist'
import Cart from './src/screens/Post_Login/Cart'
import Profile from './src/screens/Post_Login/Profile'



const Tabs = createNativeBottomTabNavigator()
const BottomTabs = () => {
  return (
    <Tabs.Navigator>
      {/* <Tabs.Screen name='HomePage' component={HomePage} />
      <Tabs.Screen name='Wishlist' component={Wishlist} />
      <Tabs.Screen name='Cart' component={Cart} /> */}
      {/* <Tabs.Screen name='unknown' component={unknown} /> */}
      <Tabs.Screen name='Profile' component={Profile} />
    </Tabs.Navigator>
  )
}



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
          <Stack.Screen name='Signin' component={Signin} /> 
          <Stack.Screen name='Signup' component={Signup} /> */}
          <Stack.Screen name='BottomTabs' component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App