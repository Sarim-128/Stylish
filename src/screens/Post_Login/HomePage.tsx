import { ActivityIndicator, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../Utils/handleApi'



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


    // API HANDLING
    const { data: products, isLoading, isError, error, refetch, isRefetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        retry: false
    })

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4392F9" />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorTxt}>
                    {error instanceof Error ? error.message : 'An unexpected error occurred.'}
                </Text>

                <TouchableOpacity
                    style={styles.errorBtnContainer}
                    onPress={() => refetch()}
                    disabled={isRefetching}
                >
                    {isRefetching ? (
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.errorBtnTxt}>Retry</Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    }




    return (

        <SafeAreaView style={styles.container}>

            <StatusBar />

            {/* HEADER */}
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.menuBtnContainer}>
                    <Image style={styles.menuBtnIcon} source={require('../../assets/images/Home/menu.png')} />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/images/Home/logo.png')} />
                    <Text style={styles.logoText}>Stylish</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../../assets/images/Home/banner2.jpg')} style={styles.profilePicBtnIcon} />
                </TouchableOpacity>
            </View>


            {/* SEARCH BAR */}
            <MainInput
                placeholder='Search any product...'
                source={require('../../assets/images/Home/search.png')}
                containerStyle={{ marginTop: '10%', marginBottom: '8%' }}
            />

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isRefetching} onRefresh={async () => { await refetch() }} />
                }
            >

                {/* CATEGORY SECTION */}

                {/* SORTING & FILTER */}
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryHeaderTitle}>All Featured</Text>

                    <View style={styles.categoryBtnsContainer}>
                        <TouchableOpacity style={styles.sortContainer}>
                            <Text style={styles.sortTitle}>Sort</Text>
                            <Image style={styles.sortIcon} source={require('../../assets/images/Home/sort.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortContainer}>
                            <Text style={styles.sortTitle}>Filter</Text>
                            <Image style={styles.sortIcon} source={require('../../assets/images/Home/filter.png')} />
                        </TouchableOpacity>
                    </View>
                </View>


                {/* SPECIFIC CATEGORIES */}
                <View style={styles.specificCategoriesCard}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.specificCategoriesScrollContent}
                    >

                        <TouchableOpacity style={styles.SCContainer}>
                            <Image style={styles.SCIcon} source={require('../../assets/images/Home/beauty.png')} />
                            <Text style={styles.SCText}>Beauty</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.SCContainer}>
                            <Image style={styles.SCIcon} source={require('../../assets/images/Home/fashion.jpg')} />
                            <Text style={styles.SCText}>Fashion</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.SCContainer}>
                            <Image style={styles.SCIcon} source={require('../../assets/images/Home/kids.jpg')} />
                            <Text style={styles.SCText}>Kids</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.SCContainer}>
                            <Image style={styles.SCIcon} source={require('../../assets/images/Home/mens.jpg')} />
                            <Text style={styles.SCText}>Mens</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.SCContainer}>
                            <Image style={styles.SCIcon} source={require('../../assets/images/Home/womens.png')} />
                            <Text style={styles.SCText}>Womens</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>








                {/* BANNERS */}
                <View style={styles.bannerContainer}>
                    <ScrollView style={styles.bannerScroll}
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
                <FlatList
                    scrollEnabled={false}
                    data={products}
                    numColumns={2}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.title}</Text>
                            <Text></Text>
                        </View>
                    )}
                />

            </ScrollView>
        </SafeAreaView >
    )
}

export default HomePage

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    errorTxt: {
        fontSize: 22,
        fontFamily: 'Montserrat-SemiBold',
        color: '#D8000C',
        textAlign: 'center',
        marginBottom: 16
    },
    errorBtnContainer: {
        backgroundColor: '#4392F9',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 120,
    },
    errorBtnTxt: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    container: {
        flex: 1,
        padding: 15
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menuBtnContainer: {
        backgroundColor: '#e4e4e4',
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

    },
    menuBtnIcon: {
        height: 25,
        width: 25,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    logo: {
        width: 50,
        height: 40,

    },
    logoText: {
        fontSize: 16,
        color: '#4392F9',
        fontFamily: 'LibreCaslonText-Bold'
    },
    profilePicBtnIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#363636'
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryHeaderTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
    },
    categoryBtnsContainer: {
        flexDirection: 'row',
        gap: 10,

    },
    sortContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        padding: 2.5,
        borderRadius: 5,
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 3,
                blurRadius: 4,
                color: 'rgba(0,0,0,0.1)',
            },
        ],

    },
    sortTitle: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        margin: 2
    },
    sortIcon: {
        width: 20,
        height: 20,
    },
    specificCategoriesCard: {
        marginVertical: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 3,
                blurRadius: 4,
                color: 'rgba(0,0,0,0.1)',
            },
        ],
    },
    specificCategoriesScrollContent: {
        alignItems: 'center',
        gap: 15,
    },
    SCContainer: {
        alignItems: 'center',
    },
    SCIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    SCText: {

    },
    bannerContainer: {
        marginVertical: 20,
    },
    bannerScroll: {
        flexDirection: 'row',
        flex: 1,
    },
    bannerImg: {
        width: 300,
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