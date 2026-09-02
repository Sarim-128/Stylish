import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding2 = ({ navigation }: any) => {
    return (
        <SafeAreaView>

            <View>
                <Text>2</Text>
                <Text>/3</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text>Skip</Text>
                </TouchableOpacity>
            </View>

            <Image source={require('../../assets/images/Onboardings/banner2.png')} />

            <Text>Choose Products</Text>
            <Text>Paragraph</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Onboarding1')}>
                <Text>Prev</Text>
            </TouchableOpacity>

            {/* SWIPE ANIMATION */}

            <TouchableOpacity onPress={() => navigation.navigate('Onboarding3')}>
                <Text>NEXT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Onboarding2

const styles = StyleSheet.create({})