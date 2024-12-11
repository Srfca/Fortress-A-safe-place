import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStartedScreen from '../screens/GetStarted';
import LoginScreen from '../screens/LogIn';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import AboutScreen from '../screens/About';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    
  );
};

export default Navigation;