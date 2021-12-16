import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native'
import CategoriesImage from '../assets/responsive.png'
import { moneyFormat } from '../Utils/MoneyFormat';

//use Navigation
import { useNavigation } from '@react-navigation/core';


export default function ViewOrderListItem(props) {

    const navigation = useNavigation();
    const { orderItem } = props;

    return (
        <TouchableOpacity activeOpacity={0.5} >
            <View style={styles.container}>
                <View style={{flex: 1, borderBottomWidth: 0.3, borderBottomColor: '#d7dadb', padding:8}}>
                <View style={styles.titleHeading}>
                    
                    <Text style={styles.title}>{orderItem.created_at}</Text>
                    <Text style={styles.title}>{orderItem.order_status}</Text>
                </View>
            <Text>Mã đơn hàng: {orderItem.order_code}</Text>
                </View>
                <FlatList
                    data={orderItem.carts}
                    renderItem={({ item }) =>
                        <View style={styles.containercart}>
                            <Text style={{fontWeight: 'bold'}}>{item.product_name}</Text>
                            <View style={styles.titleHeading}>
                            <Text>{moneyFormat(item.product_price)}</Text>
                            <Text>x {item.product_sales_quantity}</Text>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.product_name}
                />

                <View style={{borderTopColor: '#d7dadb', padding:8, borderTopWidth: 0.3}}>
                <Text style={styles.title}>Tổng tiền: {moneyFormat(orderItem.order_total)}</Text>
                </View>


            </View>
        </TouchableOpacity>

    );

}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.3,
        borderColor: '#d7dadb',
        borderRadius: 4, //bo tròn
        backgroundColor: '#fff', //màu nền
        marginTop: 8
    },
    containercart: {
        paddingHorizontal: 16, 
        paddingVertical: 8,
        marginTop: 4,
        borderBottomColor: '#d7dadb',
        borderBottomWidth: 0.3,
        borderStyle: 'dashed',
        borderBottomColor: 'tomato'
    }
    ,
    title: {
        textTransform: 'uppercase', //Uppercase tất cả
        fontWeight: '700',
        color: 'tomato'
    },
    titleHeading: {
        fontWeight: '700', //độ đậm
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center'
    }
})