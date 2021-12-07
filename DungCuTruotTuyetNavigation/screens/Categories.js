import React from 'react';
import { ActivityIndicator, StyleSheet, View, FlatList,Text } from 'react-native';
import CategoryListItem from '../Components/CategoryListItem.js';

import WebUrl  from '../Utils/WebUrl'

//export: trả màn hình này ra để các File khác có thể gọi
export default class Categories extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: null,
      isLoading: true
    }
  }
  

  async getCategories() {
    try {
      const response = await fetch(WebUrl() + '/api/categories');
      const json = await response.json();
      this.setState({ categories: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getCategories();
  }


  render() {
    const { categories, isLoading } = this.state
    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
          <FlatList
         
            data={categories}
            renderItem={({ item }) => <CategoryListItem category={item} />}
            keyExtractor={item => item.id}
          />
        )}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    alignItems: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4
  },

});
