import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text } from 'react-native';
import ProductListItem from '../Components/ProductListItem';

import WebUrl from '../Utils/WebUrl';
import { useNavigation } from '@react-navigation/core';


export default function Category({ route }) {

  const {CategoryId } = route.params;
  

  const [isLoading, setLoading] = useState(true);
  const [product, setData] = useState([]);

  const getProduct = async () => {
    try {
      const response = await fetch(WebUrl() + '/api/products/' + CategoryId);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <FlatList
          numColumns={2}
          data={product}
          renderItem={({ item }) =>
            <View style={styles.container}>
              <ProductListItem product={item}
              />
            </View>
            }
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    alignItems: 'stretch',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4
  },
});
