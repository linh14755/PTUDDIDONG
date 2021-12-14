import React, { Component } from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Home
import Category from '../screens/Category';
import Categories from '../screens/Categories';
import ProductDetail from '../screens/ProductDetail';

import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import FormCheckout from '../screens/FormCheckout';
import ViewOrder from '../screens/ViewOrder';
import Setting from '../screens/Setting';

import { CartProvider } from '../Contexts/Cart'
import { CartContext } from '../Contexts/Cart'


const Tab = createBottomTabNavigator();
const CategoriesStack = createStackNavigator();
const CartStack = createStackNavigator()

function CartStackScreen() {
    return (
        <CartStack.Navigator screenOptions={{ headerShown: false }}>
            <CartStack.Screen name="Cart" component={Cart} />
            <CartStack.Screen name="FormCheckout" component={FormCheckout} />
            <CartStack.Screen name="Checkout" component={Checkout} />
        </CartStack.Navigator>
    )
}

function CategoriesStackScreen() {

    return (
        <CategoriesStack.Navigator screenOptions={{ headerShown: false }}>
            <CategoriesStack.Screen name="Categories" component={Categories} />
            <CategoriesStack.Screen name="Category" component={Category} />
            <CategoriesStack.Screen name="ProductDetail" component={ProductDetail} />
        </CategoriesStack.Navigator>
    )
}

export default class MainView extends Component {

    render() {
        return (
            <CartProvider>

                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Setting') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            } else if (route.name === 'Carts') {
                                iconName = focused ? 'cart' : 'cart-outline';
                            } else if (route.name === 'ViewOrder') {
                                iconName = focused ? 'card' : 'card-outline';
                            }
                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        headerTitleAlign: 'center'
                    })

                    }
                >

                    <Tab.Screen name="Home" component={CategoriesStackScreen} />
                    <Tab.Screen
                        options={{
                            title: "Giỏ hàng",
                            tabBarBadge:
                                <CartContext.Consumer>
                                    {value => value.cartItem.length}
                                </CartContext.Consumer>
                        }}
                        name="Carts"
                        component={CartStackScreen}
                    />
                    <Tab.Screen options={{ title: "Đơn hàng" }} name="ViewOrder" component={ViewOrder} />
                    <Tab.Screen options={{ title: "Settings" }} name="Setting" component={Setting} />
                </Tab.Navigator>

            </CartProvider>
        )
    }
}
