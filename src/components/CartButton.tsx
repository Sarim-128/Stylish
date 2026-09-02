import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useIsFocused } from '@react-navigation/native'

const CartButton = ({ children, onPress, accessibilityState }: any) => {

    const isFocused = useIsFocused()
    return (
        <TouchableOpacity
            style={styles.customButtonContainer}
            onPress={onPress}
            activeOpacity={0.85}>

            <View style={[styles.customButton,
            {
                backgroundColor: isFocused ? '#EB3030' : '#F5F5F7',
                shadowOpacity: isFocused ? 0.35 : 0,
                shadowColor: isFocused ? '#EB3030' : null
            }
            ]}>
                {children}
            </View>

        </TouchableOpacity >
    )
}

export default CartButton

const styles = StyleSheet.create({
    customButtonContainer: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#EB3030',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 5,
        elevation: 5,
    }
})