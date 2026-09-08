import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useWishlistStore } from '../../Utils/useWishlistStore'



const Wishlist = ({ navigation }: any) => {

    const wishlist = useWishlistStore((state: any) => state.wishlist)


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={wishlist}
                keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })} style={styles.itemContainer}>
                        <View style={styles.detailsContainer}>
                            <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>
                        </View>

                        <View style={styles.imageWrapper}>
                            <Image style={styles.itemImage} source={{ uri: item.images?.[0] }} />
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatlistContent}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Image resizeMode='cover' style={styles.emptyFolder} source={require('../../assets/images/Home/emptyFolder.png')} />
                        <Text style={styles.emptyText}>No item have been wishlisted</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default Wishlist

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        flexDirection: 'row',
        borderRadius: 12,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        overflow: 'hidden',

    },
    detailsContainer: {
        flexShrink: 1,
        marginRight: 10,
    },
    itemTitle: {
        fontFamily: 'Montserrat-Medium',
        marginBottom: 5,
    },
    itemPrice: {
        fontFamily: 'Montserrat-Semibold',
        fontSize: 16
    },
    imageWrapper: {
        width: 70,
        height: 70,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#e5e5e5',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    flatlistContent: {
        flexGrow: 1,
        padding: 15,
    },
    emptyListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    emptyFolder: {

        width: 150,
        height: 150,
    },
    emptyText: {
        fontSize: 16,
        color: '#9FA5C0',
        fontFamily: 'Montserrat-Medium'
    }
})