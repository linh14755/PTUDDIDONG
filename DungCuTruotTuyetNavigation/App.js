import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login'
import MainView from './Components/MainView';
import { CustomerContextProvider } from './Contexts/CustomerContext';

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <CustomerContextProvider>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="MainView" component={MainView} />
          <MainStack.Screen name="Login" component={Login} />
          
        </MainStack.Navigator>
      </CustomerContextProvider>
    </NavigationContainer>
  );
}

