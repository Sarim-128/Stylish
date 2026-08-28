import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Checkout</Text>


      {/* PROFILE PIC */}
      <View>
        <Image />
        <TouchableOpacity>
          <Image />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})