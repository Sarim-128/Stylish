import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from '../../components/PrimaryButton'
import LinearGradient from 'react-native-linear-gradient'




const Onboarding0 = ({ navigation }: any) => {
    return (

        <View style={styles.container}>
            <Image resizeMode='cover' style={StyleSheet.absoluteFill} source={require('../../assets/images/Onboardings/cover.png')} />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                locations={[0.3, 0.9]}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.content}>
                <Text style={styles.mainText}>You want Authentic, here you go!</Text>
                <Text style={styles.subText}>Find it here, buy it now!</Text>

                <PrimaryButton
                    text='Get started'
                    buttonStyle={{ width: '90%', marginBottom: 15, }}
                    onPress={() => navigation.navigate('Onboarding1')}
                />
            </SafeAreaView>
        </View>
    )
}

export default Onboarding0

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    mainText: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 10,
    },
    subText: {
        color: '#F2F2F2',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 25,
    },
})