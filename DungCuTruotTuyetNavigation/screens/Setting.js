import React, { useContext, useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { CustomerContext } from '../Contexts/CustomerContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Setting() {
    const { logout, isLoading } = useContext(CustomerContext)
    const [customerInfo, setCustomerInfo] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('customerInfo')
            .then(value => {
                if (value != null) {
                    setCustomerInfo(JSON.parse(value))
                }
            }
            )
    }, [])
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <Ionicons name="person-circle-outline" size={128}></Ionicons>
            <Text style={styles.text}>Xin chào, {customerInfo.name}</Text>
            <Text >{customerInfo.email}</Text>
            <TouchableOpacity style={styles.button} onPress={logout} >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0f1",
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
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 8
    }

});
