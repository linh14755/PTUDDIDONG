import React, { useEffect, useContext, useState } from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import WebUrl from '../Utils/WebUrl';

import { CustomerContext } from '../Contexts/CustomerContext'
import ViewOrderListItem from '../Components/ViewOrderListItem';

export default function ViewOrder() {
    const [isLoading, setLoading] = useState(true);
    const [listOrder, setData] = useState([]);
    const { customerInfo } = useContext(CustomerContext);

    const getListOrder = async () => {
        try {
            const response = await fetch(WebUrl() + '/api/list-order/' + customerInfo.customer.id);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getListOrder();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <FlatList
                    data={listOrder}
                    renderItem={({ item }) => <ViewOrderListItem orderItem={item} />}
                    keyExtractor={item => item.created_at}
                />
            )}
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
      paddingBottom: 4
    },
  });
  

