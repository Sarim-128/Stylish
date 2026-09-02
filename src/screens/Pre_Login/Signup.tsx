import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'
import PasswordInput from '../../components/PasswordInput'
import PrimaryButton from '../../components/PrimaryButton'

const Signup = ({ navigation }: any) => {

    const handleSignUp = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTabs' }]
        })
    }

    return (
        <SafeAreaView>
            <Text>{`Create an\naccount`}</Text>

            <MainInput
                placeholder='Enter Email'
            />

            <PasswordInput
                placeholder='Enter Password' />

            <PasswordInput
                placeholder='Confirm Password' />



            <PrimaryButton
                text='Create Account'
                buttonStyle={{ width: '80%' }}
                onPress={handleSignUp}
            />


            <Text>- Or continue with -</Text>

            <View>
                <TouchableOpacity>
                    <Image style={styles.socialIcon} source={require('../../assets/images/Register Screens/google.png')} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={styles.socialIcon} source={require('../../assets/images/Register Screens/facebook.png')} />
                </TouchableOpacity>
            </View>

            <View>
                <Text>I already have an account</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    socialIcon: {
        width: 50,
        height: 50
    }
})