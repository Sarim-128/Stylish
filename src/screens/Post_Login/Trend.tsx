import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchTrendProducts } from '../../Utils/handleApi'
import { useQuery } from '@tanstack/react-query'

const Trend = ({ navigation }: any) => {

    const { data, isFetching, isError, } = useQuery({
        queryKey: ['trendProducts'],
        queryFn: fetchTrendProducts,
        retry: false
    })

    const products: any[] = data?.products ?? []

    const featuredItems = products.slice(4, 7)
    const dailyChoiceItems = products.slice(1, 4)
    const mostPopularItems = products.filter((p) => p.rating >= 4.5)

    if (isFetching) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        )
    }

    if (isError) {
        return (
            <SafeAreaView style={styles.center}>
                <Text>Failed to load products.</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* FEATURED SECTION */}
                <Text style={styles.header}>Featured</Text>

                {featuredItems.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ItemDetails', { item })} style={styles.itemContainer}>
                        <View style={styles.detailsContainer}>
                            <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>
                        </View>

                        <View style={styles.imageWrapper}>
                            <Image style={styles.itemImage} source={{ uri: item.images?.[0] }} />
                        </View>
                    </TouchableOpacity>
                ))}

                <Text style={styles.header}>Daily Choice</Text>

                {dailyChoiceItems.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ItemDetails', { item })} style={styles.itemContainer}>
                        <View style={styles.detailsContainer}>
                            <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>
                        </View>

                        <View style={styles.imageWrapper}>
                            <Image style={styles.itemImage} source={{ uri: item.images?.[0] }} />
                        </View>
                    </TouchableOpacity>
                ))}

                <Text style={styles.header}>Most Pouplar</Text>

                {mostPopularItems.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ItemDetails', { item })} style={styles.itemContainer}>
                        <View style={styles.detailsContainer}>
                            <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>
                        </View>

                        <View style={styles.imageWrapper}>
                            <Image style={styles.itemImage} source={{ uri: item.images?.[0] }} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Trend

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 16,
        color: 'red'
    },
    scrollContent: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 30
    },
    header: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        marginVertical: 10
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        elevation: 4,
        marginBottom: 12,
    },
    detailsContainer: {
        flex: 1,
        marginRight: 10
    },
    itemTitle: {
        fontFamily: 'Montserrat-Medium',
        marginBottom: 5,
        fontSize: 15
    },
    itemPrice: {
        fontFamily: 'Montserrat-Semibold',
        fontSize: 14
    },
    imageWrapper: {
        width: 70,
        height: 70,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#e5e5e5'
    },
    itemImage: {
        width: '100%',
        height: '100%'
    },
})