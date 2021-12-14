import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { CartContext } from '../Contexts/Cart'

export default function FormCheckout({ navigation }) {

    const { setDetailFormCheckout } = useContext(CartContext)

    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidName, setIsValidName] = useState(true)
    const [isValidAddress, setIsValidAddress] = useState(true)
    const [isValidPhone, setIsValidPhone] = useState(true)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [note, setNote] = useState('')

    const handleValidEmail = (val) => {
        if (val.trim().length > 1) {
            setIsValidEmail(true)
        } else {
            setIsValidEmail(false)
        }
    }

    const handleValidName = (val) => {
        if (val.trim().length > 1) {
            setIsValidName(true)
        } else {
            setIsValidName(false)
        }
    }

    const handleValidAddress = (val) => {
        if (val.trim().length > 1) {
            setIsValidAddress(true)
        } else {
            setIsValidAddress(false)
        }
    }

    const handleValidPhone = (val) => {
        if (val.trim().length > 1) {
            setIsValidPhone(true)
        } else {
            setIsValidPhone(false)
        }
    }
    function handleAccessDetail() {
        if (isValidEmail && isValidName && isValidAddress && isValidPhone) {
            setDetailFormCheckout([{
                email: email,
                name: name,
                address: address,
                phone: phone,
                note: note
            }])
            navigation.navigate('Checkout')
        } else {
            Alert.alert('Vui lòng điền đầy đủ thông tin.')
        }
    }

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Ionicons name="arrow-back-outline" size={28} color='tomato' />
                    </TouchableOpacity>

                </View>
            <View style={styles.title}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'tomato', textTransform: 'uppercase' }}>Điền thông tin gửi hàng</Text>
                <TextInput placeholder='Email' style={styles.textInput}
                    autoFocus={true}
                    onChangeText={(val) => setEmail(val)}
                    onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)} />
                {isValidEmail ? null :
                    <Text style={styles.errorMes}>Email không được để trống.</Text>
                }
                <TextInput placeholder='Họ và tên' style={styles.textInput}
                    onChangeText={(val) => setName(val)}
                    onEndEditing={(e) => handleValidName(e.nativeEvent.text)} />
                {isValidName ? null :
                    <Text style={styles.errorMes}>Họ và tên không được để trống.</Text>
                }
                <TextInput placeholder='Địa chỉ' style={styles.textInput}
                    onChangeText={(val) => setAddress(val)}
                    onEndEditing={(e) => handleValidAddress(e.nativeEvent.text)} />
                {isValidAddress ? null :
                    <Text style={styles.errorMes}>Địa chỉ không được để trống.</Text>
                }
                <TextInput placeholder='Phone' style={styles.textInput}
                    onChangeText={(val) => setPhone(val)}
                    onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)} />
                {isValidPhone ? null :
                    <Text style={styles.errorMes}>Phone không được để trống.</Text>
                }
                <TextInput placeholder='Ghi chú cho đơn hàng của bạn' multiline={true} numberOfLines={6} style={styles.textAreaInput} onChangeText={(val) => setNote(val)} />

                <TouchableOpacity
                    onPress={() => handleAccessDetail()}
                    style={{
                        backgroundColor: 'tomato',
                        padding: 10,
                        alignItems: 'center',
                        borderRadius: 50,
                        marginTop: 48,
                        width: '70%'
                    }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,

                    }}>XÁC NHẬN</Text>
                </TouchableOpacity>


            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1",
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
    },
    header: {
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
    textInput: {
        height: 42,
        width: '70%',
        borderBottomWidth: 1,
        marginTop: '3%'
    },
    textAreaInput: {
        width: '70%',
        borderBottomWidth: 1,
        marginTop: '3%'
    },
    errorMes: {
        color: 'red',
        width: '70%'
    }
})
