import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding2 = () => {
    return (
        <SafeAreaView>

            <View>
                <Text>2</Text>
                <Text>/3</Text>
                <TouchableOpacity>
                    <Text>Skip</Text>
                </TouchableOpacity>
            </View>

            <Image source={require('../../assets/images/Onboardings/banner2.png')} />

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

export default Onboarding2

const styles = StyleSheet.create({})