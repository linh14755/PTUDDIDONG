import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import WebUrl from '../Utils/WebUrl';
import { moneyFormat } from '../Utils/MoneyFormat';
import HtmlRender from '../Utils/HtmlRender';
import SliderRender from '../Utils/SliderRender';
import { CartContext } from '../Contexts/Cart';

export default function ProductDetail({ navigation, route }) {
    const product = route.params
    const [isLoading, setIsLoading] = useState(true)
    const [images, setImages] = useState([])

    useEffect(() => {
        fetch(WebUrl() + '/api/product-details-img/' + product.id)
            .then((response) => response.json())
            .then((json) => setImages(json))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack();
                        }}>
                            <Ionicons name="arrow-back-outline" size={28} color='tomato' />
                        </TouchableOpacity>

                        <CartContext.Consumer>
                            {value =>
                                <TouchableOpacity onPress={() => value.addToCart(product)}>
                                    <Ionicons name="cart-outline" color="tomato" size={28} />
                                </TouchableOpacity>
                            }
                        </CartContext.Consumer>
                    </View>
                    <View style={styles.imageContainer}>
                        {SliderRender(images)}
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={{
                            marginLeft: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',

                        }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', flex: 0.6 }}>{product.name}</Text>
                            <View style={styles.priceTag}>
                                <Text style={{
                                    marginLeft: 20,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 16
                                }}>{moneyFormat(product.price)}</Text>
                            </View>

                        </View>

                        <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
                            <Ionicons name="information-circle-outline" size={18} color='black' style={{ marginVertical: 5 }} />
                            {HtmlRender(product.content)}
                        </View>

                    </View>

                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        paddingTop: 10,
        flex: 0.35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 0.65,
        backgroundColor: '#f1f1f1',
        marginHorizontal: 7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
        paddingTop: 30
    },
    priceTag: {
        backgroundColor: 'tomato',
        flex: 0.4,
        height: 40,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent: 'center'
    }

})