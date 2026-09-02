import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'

const banners = [
    require('../../assets/images/Home/banner1.jpg'),
    require('../../assets/images/Home/banner2.jpg'),
    require('../../assets/images/Home/banner3.jpg'),
]

const ITEM_WIDTH = 360
const HomePage = ({ navigation }: any) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x
        const currentIndex = Math.round(contentOffsetX / ITEM_WIDTH)
        setActiveIndex(currentIndex)

    }
    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}
            <View>
                <TouchableOpacity>
                    <Image style={styles.menuBtnIcon} source={require('../../assets/images/Home/menu.png')} />
                </TouchableOpacity>

                <View>
                    <Image source={require('../../assets/images/Home/logo.png')} />
                    <Text>Stylish</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../../assets/images/Home/banner2.jpg')} style={styles.profilePicBtnIcon} />
                </TouchableOpacity>
            </View>


            {/* SEARCH BAR */}
            <MainInput
                text='Search any product...'
            />

            <ScrollView>

                {/* CATEGORY SECTION */}

                {/* SORTING & FILTER */}
                <View>
                    <Text>All Featured</Text>
                    <TouchableOpacity>
                        <Text>Sort</Text>
                        <Image style={styles.filterIcons} source={require('../../assets/images/Home/sort.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>Filter</Text>
                        <Image style={styles.filterIcons} source={require('../../assets/images/Home/filter.png')} />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <Image />
                        <Text>Beauty</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image />
                        <Text>Fashion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image />
                        <Text>Kids</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image />
                        <Text>Mens</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image />
                        <Text>Womens</Text>
                    </TouchableOpacity>
                </View>



                {/* BANNERS */}
                <View>
                    <ScrollView style={styles.bannerContainer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={360}
                        decelerationRate='fast'
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        <Image style={styles.bannerImg} source={require('../../assets/images/Home/banner1.jpg')} />
                        <Image style={styles.bannerImg} source={require('../../assets/images/Home/banner2.jpg')} />
                        <Image style={styles.bannerImg} source={require('../../assets/images/Home/banner3.jpg')} />
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



                {/* FEED */}

            </ScrollView>
        </SafeAreaView >
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    menuBtnIcon: {
        height: 25,
        width: 25
    },
    profilePicBtnIcon: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    filterIcons: {
        width: 25,
        height: 25,
    },
    bannerContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    bannerImg: {
        width: 320,
        height: 180,
        borderRadius: 10,
        marginHorizontal: 20,
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 3,
                blurRadius: 4,
                color: 'rgba(0,0,0,0.1)',
            },
        ],
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
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