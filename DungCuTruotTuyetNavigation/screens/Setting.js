import React, { useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { CustomerContext } from '../Contexts/CustomerContext'


export default function Setting() {
    const { customerInfo, logout, isLoading } = useContext(CustomerContext)
   
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <Text style={styles.text}>Xin chào, {customerInfo.customer.name}</Text>
            <TouchableOpacity style={styles.button} onPress={ logout } >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View >
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
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18
    }

});
