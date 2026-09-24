import { Alert, Image, Keyboard, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'
import PasswordInput from '../../components/PasswordInput'
import PrimaryButton from '../../components/PrimaryButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword } from '@react-native-firebase/auth'
import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next'


GoogleSignin.configure({
    webClientId: "995686697010-radtd1chmbqr3sqae3edu6kvglt8rmhq.apps.googleusercontent.com"
})



const Signin = ({ navigation }: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);


    // HANDLE EMAIL LOGIN
    const handleEmailLogin = async () => {
        setErrorMessage('');
        Keyboard.dismiss()

        // Basic client-side validation
        if (!email.trim() || !password) {
            setErrorMessage('Please enter both email and password')
            return
        }

        try {
            setLoading(true)
            await signInWithEmailAndPassword(getAuth(), email, password)

        } catch (error: any) {
            // Firebase login error codes
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setErrorMessage('Invalid email or password.');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('That email address is invalid!');
                    break;
                case 'auth/user-disabled':
                    setErrorMessage('This user account has been disabled.');
                    break;
                case 'auth/too-many-requests':
                    setErrorMessage('Too many failed attempts. Please try again later.');
                    break;
                case 'auth/network-request-failed':
                    setErrorMessage('Network error. Please check your connection.');
                    break;
                default:
                    setErrorMessage(error.message || 'Something went wrong. Please try again.');
                    break;
            }
        } finally {
            setLoading(false)
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

    // HANDLE FORGOT PASSWORD
    const handleForgotPassword = async () => {

        if (!email.trim()) {
            setErrorMessage('Please enter your email address first.')
            return;
        }

        try {
            await sendPasswordResetEmail(getAuth(), email.trim().toLocaleLowerCase())

            Alert.alert('Reset Password', 'Password reset email send! check your email spam folder.')

        } catch (error: any) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setErrorMessage('No user found with this email address.');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('That email address is invalid.');
                    break;
                default:
                    setErrorMessage(error.message || 'Failed to send reset email.');
                    break;
            }
        }
    }



    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle='dark-content' />

            <Text style={styles.title}>{`Welcome\nback!`}</Text>

            {!!errorMessage && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            )}

            <MainInput
                source={require('../../assets/images/Onboardings/mail.png')}
                placeholder='Enter Email'
                containerStyle={{ marginBottom: 20 }}
                value={email}
                onChangeText={setEmail}
            />

            <PasswordInput
                placeholder='Enter Password'
                containerStyle={{ marginBottom: 20 }}
                value={password}
                onChangeText={setPassword}
            />


            <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPassBtn}>
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
            </TouchableOpacity>

            <PrimaryButton
                text='Login'
                buttonStyle={{ width: '95%', marginVertical: 15, }}
                onPress={handleEmailLogin}
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
                <Text style={styles.footerTxt}>Create an account</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.footerBtnTxt}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}


export default Signin

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
    errorContainer: {
        backgroundColor: '#FEE2E2',
        borderColor: '#EF4444',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
    errorText: {
        color: '#991B1B',
        fontSize: 14,
        textAlign: 'center',
    },
    forgotPassBtn: {
        alignSelf: 'flex-end',
    },
    forgotPassText: {
        color: '#F83758',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        marginTop: 10,
        marginBottom: 20,
    },
    continue: {
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center',
        marginBottom: 25,
        marginTop: 10,
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