import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const MainInput = ({ placeholder, source, containerStyle }: any) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.inputBox}>
                <Image style={styles.icon} source={source} />
                <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor='#BBBBBB' />
            </View>
        </View>
    )
}

export default MainInput

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    inputBox: {
        width: '95%',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#FFFFFF',
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 3,
                blurRadius: 4,
                color: 'rgba(0,0,0,0.1)',
            },
        ],
    },
    input: {

    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    }
})