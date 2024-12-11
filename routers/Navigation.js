import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStartedScreen from '../screens/GetStarted';
import LoginScreen from '../screens/LogIn';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    
  );
};

export default Navigation;