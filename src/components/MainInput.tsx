import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const MainInput = ({ placeholder }: any) => {
    return (
        <View>
            <TextInput placeholder={placeholder} placeholderTextColor='#676767' />
        </View>
    )
}

export default MainInput

const styles = StyleSheet.create({})