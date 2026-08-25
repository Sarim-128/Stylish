import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const PasswordInput = ({ placeholder }: any) => {
    return (
        <View>
            <TextInput placeholder={placeholder} placeholderTextColor='#676767' />
        </View>
    )
}

export default PasswordInput

const styles = StyleSheet.create({})