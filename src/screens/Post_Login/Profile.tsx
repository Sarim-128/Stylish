import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from '../../components/PrimaryButton'
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { storage } from '../../Utils/storage'
import { useUserStore } from '../../Utils/useUserStore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { getAuth, signOut } from '@react-native-firebase/auth'


const PROFILE_STORAGE_KEY = 'user_profile_data'

const Profile = () => {


  // Business Address Details
  const [pincode, setPincode] = useState('462016')
  const [address, setAddress] = useState('216 St Pauls Rd,')
  const [city, setCity] = useState('London')
  const [state, setState] = useState('N1 2LL')
  const [country, setCountry] = useState('United Kingdom')

  // Bank Account Details
  const [accountNumber, setAccountNumber] = useState('204350000000X')
  const [accountName, setAccountName] = useState('Abhiay Sovatya')
  const [ifscCode, setIfscCode] = useState('SBIN00420')

  // PROFILE IMAGE UPDATE (USING ZUSTAND)
  const profileImageUri = useUserStore((state: any) => state.profileImageUri)
  const setProfileImageUri = useUserStore((state: any) => state.setProfileImageUri)

  const handleSelectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image')
        return
      }

      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri
        if (selectedImage) {
          setProfileImageUri(selectedImage)
        }
      }
    })

  }


  // SAVING DATA TO STORAGE
  useEffect(() => {
    const savedData = storage.getString(PROFILE_STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        if (parsed.pincode) setPincode(parsed.pincode)
        if (parsed.address) setAddress(parsed.address)
        if (parsed.city) setCity(parsed.city)
        if (parsed.state) setState(parsed.state)
        if (parsed.country) setCountry(parsed.country)
        if (parsed.accountNumber) setAccountNumber(parsed.accountNumber)
        if (parsed.accountName) setAccountName(parsed.accountName)
        if (parsed.ifscCode) setIfscCode(parsed.ifscCode)
        if (parsed.profileImageUri) setProfileImageUri(parsed.profileImageUri)
      } catch (error) {
        console.error('Failed to load profile data from MMKV', error)
      }
    }
  }, [])


  const handleSaveProfile = () => {
    const profileData = {
      pincode,
      address,
      city,
      state,
      country,
      accountNumber,
      accountName,
      ifscCode,
      profileImageUri,
    }

    try {
      storage.set(PROFILE_STORAGE_KEY, JSON.stringify(profileData))
      Alert.alert('Details has been updated!')
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile details.')
    }
  }

  const handleLogout = async () => {
    await GoogleSignin.signOut()
    await signOut(getAuth())
  }

  // FOR DISPLAYING EMAIL, NAME & PROFILE PIC
  const auth = getAuth()
  const user = auth.currentUser


  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity onPress={handleLogout}>
            <Image style={styles.logout} source={require('../../assets/images/Home/logout.png')} />
          </TouchableOpacity>
        </View>

        {/* PROFILE PIC */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>

            {user?.photoURL && (
                <Image style={styles.avatarImage}
                  source={user.photoURL ? { uri: user.photoURL } : require('../../assets/images/Home/guest.png')} />
            )}

            <TouchableOpacity onPress={handleSelectImage} activeOpacity={0.7} style={styles.editBadge}>
              <Image style={styles.editIcon} source={require('../../assets/images/Home/edit.png')} />
            </TouchableOpacity>
          </View>
        </View>


        {/* PERSONAL DETAILS SECTION */}
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <Text style={styles.label}>Username</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>{user?.displayName}</Text>
        </View>

        <Text style={styles.label}>Email Address</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>{user?.email}</Text>
        </View>

     

        {/* BUSINESS ADDRESS DETAILS */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Business Address Details</Text>

        <Text style={styles.label}>Pincode</Text>
        <TextInput
          style={styles.input}
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>State</Text>
        <View style={styles.dropdownInput}>
          <TextInput
            style={styles.dropdownText}
            value={state}
            onChangeText={setState}
          />
          <Image source={require('../../assets/images/Home/dropdown.png')} style={styles.dropdownIcon} />
        </View>

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
        />

        {/* BANK ACCOUNT DETAILS */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Bank Account Details</Text>

        <Text style={styles.label}>Bank Account Number</Text>
        <TextInput
          style={styles.input}
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Account Holder's Name</Text>
        <TextInput
          style={styles.input}
          value={accountName}
          onChangeText={setAccountName}
        />

        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          value={ifscCode}
          onChangeText={setIfscCode}
          autoCapitalize="characters"
        />

        <PrimaryButton
          text="Save"
          buttonStyle={{ width: '95%', marginVertical: 20, }}
          onPress={handleSaveProfile}
        />

      </ScrollView>
    </SafeAreaView >
  )

}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    marginVertical: 10,
  },
  logout: {
    width: 25,
    height: 25,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 110,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  avatarWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius:45
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4392F9',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editIcon: {
    width: 12,
    height: 12,
    tintColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#666666',
    marginBottom: 6,
    marginTop: 12,
  },
  box: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  boxText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  dropdownInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  dropdownIcon: {
    width: 14,
    height: 14,
    tintColor: '#666666',
    resizeMode: 'contain',
  },
  saveButton: {
    backgroundColor: '#F83758',
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
})