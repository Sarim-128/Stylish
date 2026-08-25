import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding1 = () => {
    return (
        <SafeAreaView>

            <View>
                <Text>1</Text>
                <Text>/3</Text>
                <TouchableOpacity>
                    <Text>Skip</Text>
                </TouchableOpacity>
            </View>

            <Image source={require('../../assets/images/Onboardings/banner1.png')} />

            <Text>Choose Products</Text>
            <Text>Paragraph</Text>

            {/* SWIPE ANIMATION */}

            <TouchableOpacity>
                <Text>NEXT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Onboarding1

const styles = StyleSheet.create({})