import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'
import PasswordInput from '../../components/PasswordInput'
import PrimaryButton from '../../components/PrimaryButton'
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithCredential, updateProfile } from '@react-native-firebase/auth'
import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const Signup = ({ navigation }: any) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');


    // HANDLE EMAIL SIGNUP
    const handleSignUp = async () => {

        setErrorMessage('')
        Keyboard.dismiss()
        if (!fullName.trim() || !email.trim() || !password) {
            setErrorMessage('Please fill in all fields.')
            return
        }

        setLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), email.trim(), password)
            const user = userCredential.user

            await updateProfile(user, {
                displayName: fullName.trim(),
                photoURL: photoUrl || 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'
            })

            await sendEmailVerification(user)

            await getAuth().currentUser?.reload()

            navigation.navigate('EmailVerification')

        } catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setErrorMessage('That email address is already registered!');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('That email address is invalid!');
                    break;
                case 'auth/weak-password':
                    setErrorMessage('Password should be at least 6 characters.');
                    break;
                case 'auth/network-request-failed':
                    setErrorMessage('Network error. Please check your connection.');
                    break;
                default:
                    setErrorMessage(error.message || 'Something went wrong. Please try again.');
                    break;
            }

        } finally {
            setLoading(false);
        }
    }

    // HANDLE GOOGLE LOGIN
    const handleGoogleLogin = async () => {
        setErrorMessage('')

        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            })

            const userInfo = await GoogleSignin.signIn()

            const idToken = userInfo.data?.idToken

            if (!idToken) {
                throw new Error('No ID token found from Google Sign-In.')
            }

            const googleCredential = GoogleAuthProvider.credential(idToken)

            await signInWithCredential(getAuth(), googleCredential)

        } catch (error: any) {

            setErrorMessage(
                `${error?.code}: ${error?.message || 'Google Sign-In failed'}`,
            );
        }
    }

    // HANDLE FACEBOOK LOGIN
    const handleFacebookLogin = async () => {
        setErrorMessage('')

        Settings.initializeSDK()
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile'])

            if (result.isCancelled) {
                throw new Error('Facebook login was cancelled.')
            }

            const data = await AccessToken.getCurrentAccessToken()

            if (!data) {
                throw new Error('Something went wrong obtaining access token from Facebook.');
            }

            const facebookCredential = FacebookAuthProvider.credential(data.accessToken)

            await signInWithCredential(getAuth(), facebookCredential)

        } catch (error: any) {
            setErrorMessage(error.message || 'Facebook Sign-In failed');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{`Create an\naccount`}</Text>

            {!!errorMessage && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            )}

            <MainInput
                source={require('../../assets/images/Register Screens/user.png')}
                placeholder='Enter Username'
                containerStyle={{ marginBottom: 20 }}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
            />

            <MainInput
                source={require('../../assets/images/Onboardings/mail.png')}
                placeholder='Enter Email'
                containerStyle={{ marginBottom: 20 }}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <PasswordInput
                placeholder='Enter Password'
                containerStyle={{ marginBottom: 20 }}
                value={password}
                onChangeText={setPassword}
            />

            <Text style={styles.guideline}>By clicking the Register button, you agree to the public offer</Text>

            <PrimaryButton
                text='Create Account'
                buttonStyle={{ width: '95%' }}
                onPress={handleSignUp}
                loading={loading}
            />


            <Text style={styles.continue}>- Or continue with -</Text>

            <View style={styles.socialContainer}>
                <TouchableOpacity onPress={handleGoogleLogin} style={styles.socialBtns}>
                    <Image style={styles.socialIcon} source={require('../../assets/images/Register Screens/google.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleFacebookLogin} style={styles.socialBtns}>
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
    errorContainer: {
        backgroundColor: '#FEE2E2',
        borderColor: '#EF4444',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        color: '#991B1B',
        fontSize: 14,
        textAlign: 'center',
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