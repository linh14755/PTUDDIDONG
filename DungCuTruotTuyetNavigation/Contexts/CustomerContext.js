import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebUrl from '../Utils/WebUrl';
import { useNavigation } from '@react-navigation/core';
import { Alert } from 'react-native';

export const CustomerContext = createContext();

export const CustomerContextProvider = ({ children }) => {

    const [customerInfo, setCustomerInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const login = (lemail, lpassword) => {
        setIsLoading(true)
        try {
            fetch(WebUrl() + '/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    email: lemail,
                    password: lpassword
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.code == 200) {
                        setCustomerInfo(json)
                        AsyncStorage.setItem('customerInfo', JSON.stringify(json.customer))
                        setIsLoading(false)
                        navigation.navigate("MainView")
                    } else {
                        setIsLoading(false)
                        Alert.alert(json.message)
                    }
                })
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setIsLoading(true)
         try {
            AsyncStorage.removeItem('customerInfo')
            setIsLoading(false)
            return navigation.navigate("Login")
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
    }

    

    return (
        <CustomerContext.Provider value={{
            customerInfo,
            isLoading,
            login,
            logout,
        }}>
            {children}
        </CustomerContext.Provider>
    )
}
