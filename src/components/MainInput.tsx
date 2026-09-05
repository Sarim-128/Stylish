import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React from 'react'



const MainInput = ({ containerStyle, source, placeholder, value, onChangeText }: any) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.inputBox}>
                <Image style={styles.icon} source={source} />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.input} placeholder={placeholder} placeholderTextColor='#676767' />
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
    }
})