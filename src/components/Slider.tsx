import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
    total: number
    activeIndex: number
}

const Slider = ({ total = 3, activeIndex }: Props) => {
    return (
        <View style={styles.dotsContainer}>
            {Array.from({ length: total }).map((_, index) => (
                <View
                    key={index}
                    style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]}
                />
            ))}
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        width: 24,
        backgroundColor: '#F73659',
    },
    inactiveDot: {
        width: 8,
        backgroundColor: '#E0E0E0',
    },
})