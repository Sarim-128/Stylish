import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding3 = () => {
    return (
        <SafeAreaView>

            <View>
                <Text>3</Text>
                <Text>/3</Text>
                <TouchableOpacity>
                    <Text>Skip</Text>
                </TouchableOpacity>
            </View>

            <Image source={require('../../assets/images/Onboardings/banner3.png')} />

            <Text>Choose Products</Text>
            <Text>Paragraph</Text>

            <TouchableOpacity>
                <Text>Prev</Text>
            </TouchableOpacity>

            {/* SWIPE ANIMATION */}

            <TouchableOpacity>
                <Text>NEXT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Onboarding3

const styles = StyleSheet.create({})