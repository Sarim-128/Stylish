import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Checkout</Text>


      {/* PROFILE PIC */}
      <View>
        <Image source={require('../../assets/images/Home/logo.png')} />
        <TouchableOpacity style={styles.editIconContainer}>
          <Image style={styles.editIcon} source={require('../../assets/images/Home/edit.png')} />
        </TouchableOpacity>
      </View>



      {/* PERSONAL DETAILS */}
      <View>
        <Text>Personal Details</Text>

        <Text>Email</Text>
        <View>
          <Text>----</Text>
        </View>

        <Text>Password</Text>
        <View>
          <Text >---</Text>
        </View>

        <TouchableOpacity>
          <Text>Change Password?</Text>
        </TouchableOpacity>



        <View style={styles.separator}></View>

        {/* BUSINESS ADDRESS DETAILS */}


        <View>
          <Text>Business Address Details</Text>
          <TouchableOpacity><Text>Edit</Text></TouchableOpacity>
        </View>


        <Text>Pincode</Text>
        <View>
          <Text>---</Text>
        </View>

        <Text>Adress</Text>
        <View>
          <Text>---</Text>
        </View>

        <Text>City</Text>
        <View>
          <Text>---</Text>
        </View>

        <Text>State</Text>
        <View>
          <Text>---</Text>
        </View>

        <Text>Country</Text>
        <View>
          <Text>---</Text>
        </View>






      </View>

    </SafeAreaView>
  )

}

export default Profile

const styles = StyleSheet.create({
  editIconContainer: {
    backgroundColor: '#4392F9',
    width: 35,
    height: 35,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  separator: {
    backgroundColor: '#C4C4C4',
    width: '90%',
    height: 1,
    margin: "10%",
    alignSelf: 'center'
  }
})