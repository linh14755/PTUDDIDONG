import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { moneyFormat } from '../Utils/MoneyFormat'

import { CartContext } from '../Contexts/Cart'
import { CustomerContext } from '../Contexts/CustomerContext'



export default function Checkout({ navigation }) {
    const { detailFormCheckout, postCheckout, isConfirm, resetConfirm } = useContext(CartContext)
    const { customerInfo } = useContext(CustomerContext)
    return (
        <View style={styles.container}>
            {isConfirm ?
                <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 20}}>
                    <Ionicons name="shield-checkmark-outline" size={136} color='tomato' />
                    <Text style={{ fontSize: 18 }}>Đặt hàng thành công</Text>
                    <Text style={{ fontSize: 18, marginVertical:12 }}> Chúng tôi sẽ liên hệ tới bạn sớm nhất!</Text>
                    
                        <TouchableOpacity
                        onPress={() => {
                            resetConfirm()
                            navigation.navigate("Cart");
                        }}
                            style={{
                                backgroundColor: 'tomato',
                                padding: 10,
                                alignItems: 'center',
                                borderRadius: 50,
                                paddingHorizontal: 36
                            }}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 20,

                            }}>QUAY LẠI</Text>
                        </TouchableOpacity>

                </View>
                :
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack();
                        }}>
                            <Ionicons name="arrow-back-outline" size={28} color='tomato' />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'tomato', textTransform: 'uppercase' }}>Thông tin người nhận</Text>
                        <View style={styles.texttitlewrapper}>

                            <View style={styles.texttitleitem}>
                                <Text style={styles.texttitle}>Email</Text>
                                <Text style={styles.texttitle}>{detailFormCheckout[0].email}</Text>
                            </View>

                            <View style={styles.texttitleitem}>
                                <Text style={styles.texttitle}>Tên</Text>
                                <Text style={styles.texttitle}>{detailFormCheckout[0].name}</Text>
                            </View>

                            <View style={styles.texttitleitem}>
                                <Text style={styles.texttitle}>Địa chỉ</Text>
                                <Text style={styles.texttitle}>{detailFormCheckout[0].address}</Text>
                            </View>

                            <View style={styles.texttitleitem}>
                                <Text style={styles.texttitle}>SĐT</Text>
                                <Text style={styles.texttitle}>{detailFormCheckout[0].phone}</Text>
                            </View>

                            <Text style={styles.texttitle}>Ghi chú </Text>
                            <Text>{detailFormCheckout[0].note}</Text>
                        </View>
                    </View>
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
                            onPress={() => postCheckout(customerInfo.customer)}
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
                                fontSize: 18,

                            }}>ĐẶT HÀNG</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
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
    }, header: {
        paddingHorizontal: 20,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

    },
    texttitlewrapper: {
        width: '90%',
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        borderStyle: 'dashed',
        marginTop: 16,
        borderColor: 'tomato'
    },
    texttitle: {
        fontSize: 14
    },
    texttitleitem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 8,
        borderBottomWidth: 0.3,
        borderBottomColor: '#cfccd2'
    }
})