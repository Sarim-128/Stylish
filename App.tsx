import { View, Text, Image } from 'react-native'
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
import HomePage from './src/screens/Post_Login/HomePage'
import Wishlist from './src/screens/Post_Login/Wishlist'
import Cart from './src/screens/Post_Login/Cart'
import Profile from './src/screens/Post_Login/Profile'
import Search from './src/screens/Post_Login/Search'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CartButton from './src/components/CartButton'



const Tabs = createBottomTabNavigator()
const BottomTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#EB3030',
        tabBarInactiveTintColor: '#9FA5C0',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: '12.5%',
          paddingBottom: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,

        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Roboto-Regular'
        }
      }}
    >


      <Tabs.Screen name='Home' component={HomePage}
        options={{
          tabBarIcon: ({ color, size }: any) => (
            <Image
              source={require('./src/assets/images/BottomTabs/home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          )
        }}
      />

      <Tabs.Screen name='Wishlist' component={Wishlist}
        options={{
          tabBarIcon: ({ color, size }: any) => (
            <Image
              source={require('./src/assets/images/BottomTabs/heart.png')}
              style={{
                width: size, height: size, tintColor: color
              }}
            />
          )
        }} />

      <Tabs.Screen name='Cart' component={Cart}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./src/assets/images/BottomTabs/cart.png')}
              style={{ width: 28, height: 28, tintColor: focused ? '#FFFFFF' : '#9FA5C0' }} resizeMode="contain"
            />
          ),

          tabBarButton: (props) => (
            <CartButton {...props} />
          )
        }}
      />

      <Tabs.Screen name='Search' component={Search}
        options={{
          tabBarIcon: ({ color, size }: any) => (
            <Image
              source={require('./src/assets/images/BottomTabs/search.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          )
        }}
      />

      <Tabs.Screen name='Profile' component={Profile}
        options={{
          tabBarIcon: ({ color, size }: any) => (
            <Image
              source={require('./src/assets/images/BottomTabs/profile.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          )
        }}
      />
    </Tabs.Navigator>
  )
}



const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}>
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