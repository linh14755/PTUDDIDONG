import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import MoneyFormat from '../Utils/MoneyFormat'
import Ionicons from 'react-native-vector-icons/Ionicons';
import WebUrl from '../Utils/WebUrl';



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
                    <Text style={styles.price}> {MoneyFormat(product.price)}</Text>
                    <View style={styles.qty}>
                        <Text>SL: {product.qty}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.delete}>
                <Ionicons name="close-circle-outline" color="tomato" size={36} />
            </TouchableOpacity>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        height: 110,
        backgroundColor: 'white',
        flexDirection: 'row',
        flex: 1,
        marginTop: 4,
        borderRadius: 4,
    },
    img: {
        flex: 0.25,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4
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
        paddingTop: 18,
        flexDirection: 'row',
        flex: 1
    },
    price: {
        flex: 0.8
    },
    qty: {
        flex: 0.2,
    }
    ,
    delete: {
        flex: 0.15,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center'
    },
    qtyinput: {
        width: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
})