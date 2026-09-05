import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Rating = ({ rating = 0, styleImage }: any) => {

    const starCount = Math.round(rating)

    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5].map((startIndex) => (
                <Image
                    key={startIndex}
                    source={
                        startIndex <= starCount ?
                            require('../assets/images/Home/starFilled.png')
                            :
                            require('../assets/images/Home/star.png')

                    }
                    style={[styles.starIcon, styleImage]}
                />
            ))}
        </View>
    )
}

export default Rating

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        width: 16,
        height: 16,
        marginRight: 2,
    },
})