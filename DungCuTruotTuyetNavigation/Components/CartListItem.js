import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { moneyFormat } from '../Utils/MoneyFormat'
import Ionicons from 'react-native-vector-icons/Ionicons';
import WebUrl from '../Utils/WebUrl';
import { CartContext } from '../Contexts/Cart';



export default function CartListItem(props) {

    const { product } = props;


    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: WebUrl() + product.feature_image_path }} />
            <View style={styles.title}>
                <Text numberOfLines={1} style={styles.name}>{product.name}</Text>
                <View style={styles.bottom}>
                    <Text style={styles.price}> {moneyFormat(product.price)}</Text>
                    <View style={styles.qty}>
                        <CartContext.Consumer>
                            {value =>
                                <TouchableOpacity onPress={() => value.updateCart('-', product.id, parseInt(product.price))}><Ionicons name="remove-circle-outline" color="tomato" size={26} /></TouchableOpacity>
                            }
                        </CartContext.Consumer>
                        <Text style={styles.qtytext}>{product.qty}</Text>
                        <CartContext.Consumer>
                            {value =>
                                <TouchableOpacity onPress={() => value.updateCart('+', product.id, parseInt(product.price))}><Ionicons name="add-circle-outline" color="tomato" size={26} /></TouchableOpacity>
                            }
                        </CartContext.Consumer>


                    </View>
                </View>
            </View>
            <CartContext.Consumer>
                {value =>
                    <TouchableOpacity style={styles.delete} onPress={() => value.deleteCart(product.id, parseInt(product.price * product.qty))}>
                        <Ionicons name="close-circle-outline" color="tomato" size={36} />
                    </TouchableOpacity>
                }
            </CartContext.Consumer>

        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: 'white',
        flexDirection: 'row',
        flex: 1,
        marginTop: 4,
        borderRadius: 8,
    },
    img: {
        flex: 0.25,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    title: {
        flex: 0.6,
        padding: 10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16
    },
    bottom: {
        flex: 1,
        marginBottom: 10
    },
    price: {
        flex: 0.6,

    },
    qty: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',

    }
    ,
    delete: {
        flex: 0.15,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center'
    },

    qtytext: {
        marginHorizontal: 15
    }
})