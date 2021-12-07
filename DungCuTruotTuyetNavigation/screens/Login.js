import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Alert, Image } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ShopingImage from '../assets/shopping-bag.png';
import { CustomerContext } from '../Contexts/CustomerContext';


export default function Login() {

    const [lemail, setEmail] = useState('');
    const [lpassword, setPassword] = useState('');
    const { isLoading, login } = useContext(CustomerContext);
    const navigation = useNavigation();
    const {customerInfoAsync} = AsyncStorage.getItem('customerInfo')

    return (
        <View style={styles.container}>
       
            {(customerInfoAsync != null) ? navigation.navigate("MainView") : (
                <View style={styles.container}>
                    <Spinner visible={isLoading} />
                    <Image source={ShopingImage} style={styles.shopingImage} />
                    <TextInput onChangeText={(value) => setEmail(value)} style={styles.textInput} placeholder={"Enter the Email"} />
                    <TextInput onChangeText={(value) => setPassword(value)} style={styles.textInput} secureTextEntry={true} placeholder={"Enter the Password"} />
                    <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => { login(lemail, lpassword) }}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    button: {
        marginTop: 42,
        borderWidth: 1,
        height: 42,
        width: '70%',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    textInput: {
        height: 42,
        width: '70%',
        borderBottomWidth: 1,
        marginTop: '5%'
    },
    shopingImage: {
        width: 128,
        height: 128
    }
});


