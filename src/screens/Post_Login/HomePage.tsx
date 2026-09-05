import { ActivityIndicator, FlatList, Image, Modal, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../Utils/handleApi'
import FilterModal from '../../components/FilterModal'
import SortModal, { SortType } from '../../components/SortModal'


const banners = [
    require('../../assets/images/Home/banner1.jpg'),
    require('../../assets/images/Home/banner2.jpg'),
    require('../../assets/images/Home/banner3.jpg'),
]

const ITEM_WIDTH = 340


const HomePage = ({ navigation }: any) => {


    const [activeIndex, setActiveIndex] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
    const [isSortModalVisible, setIsSortModalVisible] = useState(false)
    const [sortOption, setSortOption] = useState<SortType>('default')
    const [search, setSearch] = useState('')
    const [debounceSearch, setDebounceSearch] = useState('')


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(search)
        }, 1500)

        return () => clearTimeout(timer)
    }, [search])


    // API HANDLING
    const { data: rawProducts, isFetching, isError, error, refetch, isRefetching } = useQuery({
        queryKey: ['products', debounceSearch],
        queryFn: () => fetchProducts(debounceSearch),
        retry: false
    })

    const products = rawProducts ?? []

    const processedProducts = useMemo(() => {

        let list = Array.isArray(products) ? [...products] : [];


        // Category filter
        if (selectedCategory && selectedCategory !== 'all') {
            list = list.filter((p: any) =>
                p?.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Sorting
        const sortedList = [...list];
        switch (sortOption) {
            case 'price-low':
                return sortedList.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
            case 'price-high':
                return sortedList.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
            case 'rating-high':
                return sortedList.sort((a, b) => {
                    const rateA = a.rating?.rate ?? a.rating ?? 0;
                    const rateB = b.rating?.rate ?? b.rating ?? 0;
                    return rateB - rateA;
                });
            case 'stock-high':
                return sortedList.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
            default:
                return sortedList;
        }
    }, [products, selectedCategory, sortOption,]);


    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x
        const currentIndex = Math.round(contentOffsetX / ITEM_WIDTH)
        setActiveIndex(currentIndex)
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


    const quickCategories = ['all', 'beauty', 'fragrances', 'furniture']

    return (


        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

            <StatusBar barStyle='dark-content' />

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
                value={search}
                onChangeText={(text: any) => setSearch(text)}
                placeholder='Search any product...'
                source={require('../../assets/images/Home/search.png')}
                containerStyle={{ marginVertical: 20, }}
            />




            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isRefetching} onRefresh={async () => { await refetch() }} />
                }
            >

                {/* CATEGORY SECTION */}

                {/* SORTING & FILTER */}
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryHeaderTitle}>All Featured</Text>

                    <View style={styles.categoryBtnsContainer}>
                        <TouchableOpacity
                            style={styles.sortContainer}
                            onPress={() => setIsSortModalVisible(true)}
                        >
                            <Text style={styles.sortTitle}>Sort</Text>
                            <Image style={styles.sortIcon} source={require('../../assets/images/Home/sort.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sortContainer}
                            onPress={() => setIsFilterModalVisible(true)}
                        >
                            <Text style={styles.sortTitle}>Filter</Text>
                            <Image style={styles.sortIcon} source={require('../../assets/images/Home/filter.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <FilterModal
                    visible={isFilterModalVisible}
                    selectedCategory={selectedCategory}
                    onClose={() => setIsFilterModalVisible(false)}
                    onSelectedCategory={(category) => setSelectedCategory(category)}
                />

                <SortModal
                    visible={isSortModalVisible}
                    sortOption={sortOption}
                    onClose={() => setIsSortModalVisible(false)}
                    onSelectSortOption={(option) => setSortOption(option)}
                />


                {/* SPECIFIC CATEGORIES */}


                <View style={styles.specificCategoriesCard}>

                    <TouchableOpacity
                        onPress={() => setSelectedCategory('all')}
                        style={styles.SCContainer}>
                        <Image style={styles.SCIcon} source={require('../../assets/images/Home/all.jpg')} />
                        <Text style={styles.SCText}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedCategory('beauty')}
                        style={styles.SCContainer}>
                        <Image style={styles.SCIcon} source={require('../../assets/images/Home/beauty.png')} />
                        <Text style={styles.SCText}>Beauty</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedCategory('fragrances')}
                        style={styles.SCContainer}>
                        <Image style={styles.SCIcon} source={require('../../assets/images/Home/fragnance.jpg')} />
                        <Text style={styles.SCText}>Fragrance</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedCategory('furniture')}
                        style={styles.SCContainer}>
                        <Image style={styles.SCIcon} source={require('../../assets/images/Home/furniture.jpg')} />
                        <Text style={styles.SCText}>Furniture</Text>
                    </TouchableOpacity>

                </View>





                {/* BANNERS */}
                <View style={styles.bannerContainer}>
                    <ScrollView style={styles.bannerScroll}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={340}
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
                <View>
                    <FlatList
                        scrollEnabled={false}
                        data={processedProducts}
                        numColumns={2}
                        keyExtractor={(item: any) => item.id.toString()}
                        columnWrapperStyle={styles.rowWrapper}
                        contentContainerStyle={styles.feedContainer}

                        renderItem={({ item }) => (


                            <TouchableOpacity style={styles.cardWrapper}>

                                <View style={styles.itemCard}>

                                    <View style={styles.imageContainer}>
                                        <Image style={styles.itemImage} source={{ uri: item.images?.[0] }} />
                                    </View>

                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>

                                        <Text style={styles.itemPrice}>${item.price}</Text>


                                        <View style={styles.ratingRow}>
                                            <View style={styles.ratingBadge}>
                                                <Text style={styles.ratingIcon}>★</Text>
                                                <Text style={styles.ratingText}>{item.rating?.rate ?? item.rating ?? '4.5'}</Text>
                                            </View>
                                            <Text style={styles.stock}>Stock: {item.stock}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )}
                    />

                    {isFetching && <ActivityIndicator size='large' style={{ paddingRight: 10 }} color="black" />}




                </View>
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
        paddingHorizontal: 15,
        paddingTop: 15,
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
        elevation: 3, // For Android
        shadowColor: '#000', // For iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

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
        gap: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 8,
        elevation: 2, // For Android
        shadowColor: '#000', // For iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    SCContainer: {
        alignItems: 'center',
    },
    SCIcon: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    SCText: {
        fontSize: 10,
        fontFamily: 'Montserrat-Regular'
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


    // FEED STYLE
    rowWrapper: {
        justifyContent: 'space-between',
        marginBottom: 16
    },
    feedContainer: {
        paddingVertical: 10,
        paddingHorizontal: 2,
    },
    cardWrapper: {
        width: '48%'
    },
    itemCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 8,
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    imageContainer: {
        width: '100%',
        height: 140,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        overflow: 'hidden'
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        paddingTop: 8,
        paddingHorizontal: 2,
    },
    itemTitle: {
        color: '#2E3E5C',
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 18,
        minHeight: 36,
    },
    itemPrice: {
        color: '#000',
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 4
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
        gap: 4,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff4d9',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        gap: 2,
    },
    ratingIcon: {
        color: '#FFB800',
        fontSize: 11,
    },
    ratingText: {
        fontSize: 11,
        fontFamily: 'Montserrat-SemiBold',
        color: '#A06D00'
    },
    stock: {
        fontSize: 10,
        fontFamily: 'Montserrat-Regular',
        color: '#808080',
        marginRight: 4,
    },


})