import { ActivityIndicator, Image, LayoutAnimation, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CartButton from './src/components/CartButton'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ItemDetails from './src/screens/Post_Login/ItemDetails'
import Trend from './src/screens/Post_Login/Trend'
import { getAuth, onIdTokenChanged, User } from '@react-native-firebase/auth'
import EmailVerification from './src/screens/Pre_Login/EmailVerification'
import { useAppStore } from './src/Utils/useAppStore'
import { useUserStore } from './src/Utils/useUserStore'



const Tabs = createBottomTabNavigator()
const BottomTabs = () => {

  const insets = useSafeAreaInsets()
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#EB3030',
        tabBarInactiveTintColor: '#9FA5C0',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          borderTopWidth: 1,
          borderTopColor: '#EFEFEF',

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

      <Tabs.Screen name='Trend' component={Trend}
        options={{
          tabBarIcon: ({ color, size }: any) => (
            <Image
              source={require('./src/assets/images/BottomTabs/trend.png')}
              style={{ width: 28, height: 28, marginLeft: 5, tintColor: color }}
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


const queryClient = new QueryClient()

const Stack = createNativeStackNavigator()

const App = () => {

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const hasSeenOnboarding = useAppStore((state) => state.hasSeenOnboarding)

  useEffect(() => {

    const subscriber = onIdTokenChanged(getAuth(), (userState: any) => {
      if (userState) {
        setUser(userState)

        useUserStore.setState({ profileImageUri: userState.photoURL })
      } else {
        setUser(null)
        useUserStore.setState({ profileImageUri: null })
      }

      if (initializing) {
        setInitializing(false)
      }

    })
    return subscriber
  }, [])

  if (initializing) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} size="large" color="#2563EB" />
      </View>
    )
  }

  const isFacebookLogin = user?.providerData.some(
    (provider) => provider.providerId === 'facebook.com'
  )

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false, }}>

            {user ? (
              user.emailVerified || isFacebookLogin ? (
                <Stack.Screen name='BottomTabs' component={BottomTabs} />
              ) : (
                <Stack.Screen name='EmailVerification' component={EmailVerification} />
              )
            ) : !hasSeenOnboarding ? (
              <>
                <Stack.Screen name='Onboarding0' component={Onboarding0} options={{ animation: 'fade_from_bottom' }} />
                <Stack.Screen name='Onboarding1' component={Onboarding1} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name='Onboarding2' component={Onboarding2} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name='Onboarding3' component={Onboarding3} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name='Signin' component={Signin} options={{ animation: 'fade_from_bottom' }} />
                <Stack.Screen name='Signup' component={Signup} options={{ animation: 'fade_from_bottom' }} />
              </>
            ) : (
              <>
                <Stack.Screen name='Signin' component={Signin} options={{ animation: 'fade_from_bottom' }} />
                <Stack.Screen name='Signup' component={Signup} options={{ animation: 'fade_from_bottom' }} />
              </>
            )
            }

            <Stack.Screen name='ItemDetails' component={ItemDetails} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App