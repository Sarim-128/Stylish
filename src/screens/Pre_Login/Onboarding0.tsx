import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from '../../components/PrimaryButton'

const Onboarding0 = () => {
    return (
        <SafeAreaView>
            <Image style={styles.coverPic} source={require('../../assets/images/Onboardings/cover.jpg')} />
            <Text>You want Authentic, here you go!</Text>
            <Text>Find it here, buy it now!</Text>

            <PrimaryButton
                text='Get started'
                buttonStyle={{ width: '70%' }}
            />
        </SafeAreaView>
    )
}

export default Onboarding0

const styles = StyleSheet.create({
    coverPic: {
        width: 100,
        height: 100
    }
})