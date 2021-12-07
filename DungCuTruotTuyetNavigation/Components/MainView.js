import React, { Component } from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Category from '../screens/Category';
import Categories from '../screens/Categories';
import Cart from '../screens/Cart';
import Orders from '../screens/Orders';
import Setting from '../screens/Setting';
import { CartProvider } from '../Contexts/Cart'
import { CartContext } from '../Contexts/Cart'


const Tab = createBottomTabNavigator();
const CategoriesStack = createStackNavigator();

function CategoriesStackScreen() {

    return (
        <CategoriesStack.Navigator screenOptions={{ headerShown: false }}>
            <CategoriesStack.Screen name="Categories" component={Categories} />
            <CategoriesStack.Screen name="Category" component={Category} />
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
                            } else if (route.name === 'Cart') {
                                iconName = focused ? 'cart' : 'cart-outline';
                            } else if (route.name === 'Orders') {
                                iconName = focused ? 'card' : 'card-outline';
                            }
                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        headerTitleAlign: 'center'
                    })}
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
                        name="Cart"
                        component={Cart}
                    />
                    <Tab.Screen options={{ title: "Đơn hàng" }} name="Orders" component={Orders} />
                    <Tab.Screen options={{ title: "Settings" }} name="Setting" component={Setting} />
                </Tab.Navigator>

            </CartProvider>
        )
    }
}
