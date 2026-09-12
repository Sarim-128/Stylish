import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '../../components/Slider'

const Onboarding2 = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}
            <View style={styles.headerContainer}>
                <View style={styles.pageContainer}>
                    <Text style={styles.currentPage}>2</Text>
                    <Text style={styles.totalPages}>/3</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/*  MAIN CONTENT */}
            <View style={styles.body}>
                <Image style={styles.image} source={require('../../assets/images/Onboardings/banner2.png')} />

                <Text style={styles.title}>Choose Products</Text>
                <Text style={styles.subtitle}>Instant search, personalized recommendations, and instant one-tap checkout.</Text>
            </View>


            {/* FOOTER */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Onboarding1')}>
                    <Text style={styles.prevText}>Prev</Text>
                </TouchableOpacity>

                <View style={styles.sliderContainer}>
                    <Slider total={3} activeIndex={1} />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Onboarding3')}>
                    <Text style={styles.nextText} >NEXT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default Onboarding2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        justifyContent: 'space-between'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pageContainer: {
        flexDirection: 'row',

    },
    currentPage: {
        fontFamily: 'Montserrat-SemiBold',
    },
    totalPages: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#A0A0A1'
    },
    skipText: {
        fontFamily: 'Montserrat-SemiBold',
    },
    body: {
        alignItems: 'center',
    },
    image: {
        marginTop: '10%'
    },
    title: {
        fontSize: 22,
        fontFamily: 'Montserrat-ExtraBold'
    },
    subtitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#A8A8A9',
        textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    prevText: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#C4C4C4'
    },
    sliderContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextText: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#F83758'
    },
})