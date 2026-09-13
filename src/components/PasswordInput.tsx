import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const PasswordInput = ({ placeholder, value, onChangeText, containerStyle }: any) => {

    const [show, setShow] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.inputBox}>
                <Image style={styles.icon} source={require('../assets/images/Onboardings/lock.png')} />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!show}
                    style={styles.input} placeholder={placeholder} placeholderTextColor='#676767' />
                <TouchableOpacity onPress={() => setShow(prev => !prev)}>
                    <Image style={styles.eye} source={require('../assets/images/Onboardings/show.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PasswordInput

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    inputBox: {
        width: '95%',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#A8A8A9',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input: {
        color: '#000',
        flex: 1
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    eye: {
        width: 20,
        height: 20,
        marginRight: 10,
    }
})