import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'
import PasswordInput from '../../components/PasswordInput'
import PrimaryButton from '../../components/PrimaryButton'

const Signin = () => {
    return (
        <SafeAreaView>
            <Text>{`Welcome\nBack!`}</Text>

            <MainInput
                placeholder='Enter Email'
            />

            <PasswordInput
                placeholder='Enter Password' />

            <TouchableOpacity>
                <Text>Forget Password?</Text>
            </TouchableOpacity>

            <PrimaryButton
                text='Login'
                buttonStyle={{ width: '80%' }}
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
                <Text>Create an account</Text>
                <TouchableOpacity>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Signin

const styles = StyleSheet.create({
    socialIcon: {
        width: 50,
        height: 50
    }
})