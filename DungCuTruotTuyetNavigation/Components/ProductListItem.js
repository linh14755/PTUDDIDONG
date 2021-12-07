import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import WebUrl from '../Utils/WebUrl';
import { CartContext } from '../Contexts/Cart';
import moneyFormat from '../Utils/MoneyFormat';


export default function ProductListItem(props) {

    const { product } = props;

    //Thuộc tính onPress bên dưới khi được click sẽ gọi screen Category bằng useNavigation
    return (
        <TouchableOpacity>
            <View style={styles.shadow}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{ uri: WebUrl() + product.feature_image_path }} />
                    <View style={styles.info}>
                        <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
                        <View style={styles.priceRow}>
                            <Text style={styles.price}>
                                {moneyFormat(product.price)}
                            </Text>
                            <CartContext.Consumer>
                                {value =>
                                    <TouchableOpacity onPress={() => value.addToCart(product)}>
                                        <Text style={styles.cartText}><Ionicons name="cart-outline" color="tomato" size={36}></Ionicons></Text>
                                    </TouchableOpacity>
                                }
                            </CartContext.Consumer>

                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );

}

const styles = StyleSheet.create({
    cartText: {
        textTransform: 'uppercase',
        fontSize: 16,
        color: '#2f95dc',
    },
    shadow: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        marginTop: 4
    },
    container: {
        borderRadius: 4,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        marginBottom: 8
    },
    info: {
        padding: 8,
    },
    image: {
        height: 150,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    name: {
        fontSize: 16,
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        color: '#888',
        flex: 1
    }
})