import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCartStore } from '../../Utils/useCartStore'



const Cart = ({ navigation }: any) => {

    const cart = useCartStore((state: any) => state.cart)
    const updateQuantity = useCartStore((state: any) => state.updateQuantity)
    const removeFromCart = useCartStore((state: any) => state.removeFromCart)


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>

                        <View style={styles.detailsContainer}>

                            <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })}>
                                <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemPrice}>${item.price}</Text>
                            </TouchableOpacity>

                            <View style={styles.quantityContainer} >
                                <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => updateQuantity(item.id, 'decrease')} style={styles.qtyBtn}>
                                    <Text style={styles.qtyBtnText}>-</Text>
                                </TouchableOpacity>

                                <Text style={styles.qtyText}>{item.quantity || 1}</Text>


                                <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => updateQuantity(item.id, 'increase')} style={styles.qtyBtn}>
                                    <Text style={styles.qtyBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
                                <Text style={styles.deleteText}>remove</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })} style={styles.imageWrapper}>
                            <Image style={styles.itemImage} source={{ uri: item.images?.[0] }} />
                        </TouchableOpacity>

                    </View>
                )}
                contentContainerStyle={styles.flatlistContent}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Image resizeMode='cover' style={styles.emptyFolder} source={require('../../assets/images/Home/emptyCart.png')} />
                        <Text style={styles.emptyText}>No item have been added to the cart</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default Cart

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
        width: 100,
        height: 100,
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
        fontSize: 18,
        color: '#9FA5C0',
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
        marginTop: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
    },
    qtyBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    qtyText: {
        marginHorizontal: 12,
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: '#000000',
    },
    deleteBtn: {

    },
    deleteText: {
        color: 'red',
        fontFamily: 'Montserrat-Regular',
        marginTop: 10,
    },
})