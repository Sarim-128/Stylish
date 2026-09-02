import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding3 = ({ navigation }: any) => {
    return (
        <SafeAreaView>

            <View>
                <Text>3</Text>
                <Text>/3</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text>Skip</Text>
                </TouchableOpacity>
            </View>

            <Image source={require('../../assets/images/Onboardings/banner3.png')} />

            <Text>Choose Products</Text>
            <Text>Paragraph</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')}>
                <Text>Prev</Text>
            </TouchableOpacity>

            {/* SWIPE ANIMATION */}

            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text>Get started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Onboarding3

const styles = StyleSheet.create({})