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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{`Create an\naccount`}</Text>

            <MainInput
                source={require('../../assets/images/Onboardings/mail.png')}
                placeholder='Enter Email'
                containerStyle={{ marginBottom: 20 }}
            />

            <PasswordInput
                placeholder='Enter Password'
                containerStyle={{ marginBottom: 20 }}
            />


            <PasswordInput
                placeholder='Confirm Password'
                containerStyle={{ marginBottom: 20 }}
            />



            <Text style={styles.guideline}>By clicking the Register button, you agree to the public offer</Text>

            <PrimaryButton
                text='Create Account'
                buttonStyle={{ width: '95%' }}
                onPress={handleSignUp}
            />


            <Text style={styles.continue}>- Or continue with -</Text>

            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialBtns}>
                    <Image style={styles.socialIcon} source={require('../../assets/images/Register Screens/google.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialBtns}>
                    <Image style={styles.socialIcon} source={require('../../assets/images/Register Screens/facebook.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerTxt}>I already have an account</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text style={styles.footerBtnTxt}>Login</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 30,
        marginBottom: 25,
    },
    guideline: {
        color: '#676767',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        marginTop: 10,
        marginBottom: 20,
    },
    continue: {
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center',
        marginVertical: 10,
        color: '#575757'
    },
    socialContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 15,
        marginVertical: 10,

    },
    socialBtns: {
        backgroundColor: '#FCF3F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F83758',
        padding: 12,
        borderRadius: 35,
    },
    socialIcon: {
        width: 40,
        height: 40
    },
    footer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    footerTxt: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#575757',
    },
    footerBtnTxt: {
        color: '#F83758',
        fontFamily: 'Montserrat-SemiBold',
        textDecorationLine: 'underline',
    },
})