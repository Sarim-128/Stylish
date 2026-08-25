import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainInput from '../../components/MainInput'

const HomePage = () => {
    return (
        <SafeAreaView>

            {/* HEADER */}
            <View>
                <TouchableOpacity>
                    <Image style={styles.menuBtnIcon} source={require('../../assets/images/Home/menu.png')} />
                </TouchableOpacity>

                <View>
                    <Image source={require('../../assets/images/Home/logo.png')} />
                    <Text>Stylish</Text>
                </View>

                <TouchableOpacity>
                    <Image style={styles.profilePicBtnIcon} />
                </TouchableOpacity>
            </View>


            {/* SEARCH BAR */}
            <MainInput
                text='Search any product...'
            />


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

            </View>


            {/* FEED */}
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({
    menuBtnIcon: {
        height: 25,
        width: 25
    },
    filterIcons: {
        width: 25,
        height: 25,
    }
})