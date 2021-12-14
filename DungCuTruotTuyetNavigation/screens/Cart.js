import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native'
import { CartContext } from '../Contexts/Cart'
import { useNavigation } from '@react-navigation/native'

import CartListItem from '../Components/CartListItem'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { moneyFormat } from "../Utils/MoneyFormat";

export default function Cart() {
    const { cartItem } = useContext(CartContext)
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {cartItem.length == 0 && (
                <Text style={styles.cartnull}>Giỏ hàng trống</Text>
            )}
            <FlatList style={{
                marginBottom: 10
            }}
                numColumns={1}
                data={cartItem}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <CartListItem product={item} />
                    </View>
                }
                keyExtractor={item => item.id}
            />
            <View style={{
                padding: 10,
                borderRadius: 10,
                marginBottom: 16,
                marginHorizontal: 20
            }}>
                <CartContext.Consumer>
                    {value =>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 16,
                            borderTopWidth: 1,
                            borderTopColor: 'tomato'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: 'black',
                                fontWeight: 'bold',

                            }}>Tổng</Text>
                            <Text style={{
                                fontSize: 18,
                                color: 'black',
                                fontWeight: 'bold'
                            }}>{moneyFormat(parseInt(value.total))}</Text>
                        </View>

                    }
                </CartContext.Consumer>
                <TouchableOpacity
                    onPress={() => { cartItem.length == 0 ? Alert.alert('Giỏ hàng trống.') : navigation.navigate('FormCheckout') }}
                    style={{
                        backgroundColor: 'tomato',
                        padding: 10,
                        alignItems: 'center',
                        borderRadius: 50,
                        marginHorizontal: 48
                    }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,

                    }}>THANH TOÁN</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
        alignItems: 'stretch',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
    },
    cartnull: {
        textTransform: 'uppercase',
        fontSize: 24,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'tomato',
        marginTop: 200

    }
});