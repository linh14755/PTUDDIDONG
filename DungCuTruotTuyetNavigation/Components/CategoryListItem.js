import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'
import CategoriesImage from '../assets/responsive.png'

//use Navigation
import { useNavigation } from '@react-navigation/core';


export default function CategoryListItem(props) {

    const navigation = useNavigation();
    const { category } = props;

    //Thuộc tính onPress bên dưới khi được click sẽ gọi screen Category bằng useNavigation
    return (

        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Category', { CategoryName: category.name, CategoryId: category.id })}>
            <View style={styles.container}>
                <Text style={styles.title}>{category.name}</Text>
                <Image source={CategoriesImage} style={styles.categoryImage} />
            </View>
        </TouchableOpacity>

    );

}

const styles = StyleSheet.create({
    containerHeading: {
        alignItems: 'center', //Căn chỉnh item
        padding: 16, //đối nội
        borderRadius: 4, //bo tròn
        backgroundColor: 'tomato', //màu nền
        marginTop: 8
    },
    container: {
        alignItems: 'center', //Căn chỉnh item
        padding: 16, //đối nội
        borderRadius: 4, //bo tròn
        backgroundColor: '#fff', //màu nền
        marginTop: 8
    },
    categoryImage: {
        width: 64, //rộng
        height: 64 //cao
    },

    title: {
        textTransform: 'uppercase', //Uppercase tất cả
        fontWeight: '700' //độ đậm
    },
    titleHeading: {
        textTransform: 'uppercase', //Uppercase tất cả
        fontWeight: '700', //độ đậm
        color: 'white'
    }
})