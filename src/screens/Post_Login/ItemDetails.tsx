import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Rating from '../../components/Rating'
import PrimaryButton from '../../components/PrimaryButton'



const ItemDetails = ({ route, navigation }: any) => {



    const { item } = route.params
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false}>


                {/* HEADER BUTTONS */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
                        <Image style={styles.backIcon} source={require('../../assets/images/Home/back.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.heartIconContainer}>
                        <Image style={styles.heartIcon} source={require('../../assets/images/BottomTabs/heart.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.itemImageContainer}>
                    <Image style={styles.itemImage} source={{ uri: item.images?.[0] }} />
                </View>

                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>

                <View style={styles.ratingRow}>
                    <Rating rating={item.rating?.rate ?? item.rating ?? '4.5'} styleImage={{ width: 20, height: 20 }} />
                    <Text style={styles.stock}>Stock: {item.stock}</Text>
                </View>

                <PrimaryButton
                    text='Add To Cart'
                    buttonStyle={{ width: '80%' }}
                />

                <Text style={styles.descriptionTitle}>Product Details</Text>
                <Text style={styles.description}>{item.description}</Text>

                <Text >• Brand: {item.brand}</Text>
                <Text >• Warranty: {item.warrantyInformation}</Text>
                <Text >• Return Policy: {item.returnPolicy}</Text>


                <Text style={styles.reviewTitle}>Reviews</Text>
                {/* REVIEW CARD */}

                {item.reviews?.map((review: any, index: number) => (
                    <View key={index} style={styles.reviewCard}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >

                            <View style={styles.userContainer}>
                                <View style={styles.userPicContainer}>
                                    <Text style={styles.userPicText}>{review.reviewerName?.slice(0, 1)}</Text>
                                </View>

                                <View>
                                    <Text>{review.reviewerName}</Text>
                                    <Text>{review.date?.slice(0, 10)}</Text>
                                </View>
                            </View>

                            <Rating rating={review.rating} />
                        </View>



                        <Text style={styles.comment}>{review.comment}</Text>
                    </View>
                ))}


            </ScrollView>
        </SafeAreaView>
    )
}

export default ItemDetails

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backIcon: {
        width: 40,
        height: 40,
    },
    heartIconContainer: {
        backgroundColor: '#e5e5e5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 40,
        opacity: 0.6
    },
    heartIcon: {
        width: 30,
        height: 30,
    },
    itemImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    itemImage: {
        width: '95%',
        height: 200,
        resizeMode: 'contain',
        backgroundColor: '#e5e5e5',
        borderRadius: 12,
        elevation: 5
    },
    itemTitle: {
        color: '#2E3E5C',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    itemPrice: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 4
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
        marginBottom: 12,
        gap: 4,
        elevation: 5
    },
    stock: {
        fontFamily: 'Montserrat-Regular',
        color: '#808080',
        marginRight: 4,
    },
    descriptionTitle: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold'
    },
    description: {
        fontSize: 12,
        marginBottom: 12,
    },
    reviewTitle: {
        marginTop: 22,
        marginBottom: 8,
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold'
    },
    reviewCard: {
        marginBottom: 30,
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        padding: 10,
        flex: 1
    },
    userContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    userPicContainer: {
        backgroundColor: '#F83758',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userPicText: {
        fontWeight: 'bold',
    },
    comment: {
        marginTop: 5,
    }

})