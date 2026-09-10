import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const banners = [
    require('../assets/images/Home/banner1.jpg'),
    require('../assets/images/Home/banner2.jpg'),
    require('../assets/images/Home/banner3.jpg'),
]

const ITEM_WIDTH = 340

const Banner = () => {

    const [activeIndex, setActiveIndex] = useState(0)

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x
        const currentIndex = Math.round(contentOffsetX / ITEM_WIDTH)
        setActiveIndex(currentIndex)
    }

    return (
        <View style={styles.bannerContainer}>
            <ScrollView style={styles.bannerScroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={340}
                decelerationRate='fast'
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Image style={styles.bannerImg} source={require('../assets/images/Home/banner1.jpg')} />
                <Image style={styles.bannerImg} source={require('../assets/images/Home/banner2.jpg')} />
                <Image style={styles.bannerImg} source={require('../assets/images/Home/banner3.jpg')} />
            </ScrollView>

            {/* CIRCLE INDICATORS */}
            <View style={styles.paginationContainer}>
                {banners.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>

    )
}

export default Banner

const styles = StyleSheet.create({
    bannerContainer: {
        marginVertical: 20,
    },
    bannerScroll: {
        flexDirection: 'row',
    },
    bannerImg: {
        width: 300,
        height: 180,
        borderRadius: 10,
        marginHorizontal: 20,
        elevation: 3, // For Android
        shadowColor: '#000', // For iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        width: 24,
        backgroundColor: '#FFA3B3',
    },
    inactiveDot: {
        width: 8,
        backgroundColor: '#E0E0E0',
    },
})