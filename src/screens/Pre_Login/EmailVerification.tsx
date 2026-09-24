import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, sendEmailVerification, signOut } from '@react-native-firebase/auth';

const EmailVerification = () => {

    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false)

    const handleVerification = async () => {
        setLoading(true)

        try {
            const user = getAuth().currentUser

            if (user) {
                await user.reload()

                const updatedUser = getAuth().currentUser

                if (updatedUser?.emailVerified) {
                    await updatedUser.getIdToken(true)
                } else {
                    Alert.alert('Not Verified Yet', 'Please check your email spam folder and click the verification link')
                }

            }

        } catch (error: any) {
            Alert.alert('Error', error.message)

        } finally {
            setLoading(false)
        }
    }

    const handleResendEmail = async () => {
        setResendLoading(true)

        try {
            const user = getAuth().currentUser

            if (user) {
                await sendEmailVerification(user)
                Alert.alert('Email sent', 'A new verification link has been sent to your email address')
            }

        } catch (error: any) {

            if (error.code === 'auth/too-many-requests') {
                Alert.alert('Slow down', 'Too many requests. Please wait a few minutes before trying again.');
            } else {
                Alert.alert('Error', error.message);
            }

        } finally {
            setResendLoading(false)
        }
    }

    const handleSignOut = async () => {
        await signOut(getAuth())
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.card}>
                <Text style={styles.title}>Verify Your Email</Text>
                <Text style={styles.subtitle}>
                    We've sent a verification email to:{'\n'}
                    <Text style={styles.emailText}>{getAuth().currentUser?.email}</Text>
                </Text>
                <Text style={styles.instructions}>
                    Please tap the link in that email to continue, then tap below to confirm.
                </Text>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleVerification}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>I've Verified My Email</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleResendEmail}
                    disabled={resendLoading}
                >
                    {resendLoading ? (
                        <ActivityIndicator color="#2563EB" />
                    ) : (
                        <Text style={styles.secondaryButtonText}>Resend Verification Email</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <Text style={styles.signOutText}>Cancel / Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default EmailVerification

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        elevation: 4
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 12,
    },
    emailText: {
        fontWeight: '600',
        color: '#111827',
    },
    instructions: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
    },
    primaryButton: {
        backgroundColor: '#F83758',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: '#ffdffb',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    secondaryButtonText: {
        color: '#F83758',
        fontSize: 15,
        fontWeight: '600',
    },
    signOutButton: {
        padding: 8,
    },
    signOutText: {
        color: 'red',
        fontSize: 14,
        fontWeight: '500',
    },
})