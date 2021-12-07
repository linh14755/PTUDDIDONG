import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { CartContext } from '../Contexts/Cart'

import CartListItem from '../Components/CartListItem'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Cart() {
    const { cartItem } = useContext(CartContext)
    return (
        <View style={styles.container}>
            {cartItem.length == 0  && (
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
            <TouchableOpacity style={{
                backgroundColor: 'tomato',
                padding: 10,
                alignItems: 'center',
                borderRadius: 4,
                marginBottom: 8
            }}>
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 24, 
                    
                }}>THANH TOÁN</Text>
            </TouchableOpacity>
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
        paddingTop: 4
    },
    cartnull:{
        textTransform: 'uppercase',
        fontSize: 24,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});