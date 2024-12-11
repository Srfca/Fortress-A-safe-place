import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
export default function GetStartedScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>FORTRESS</Text>
        <Text style={styles.subtitle}>Stay Safe with Real-Time Alerts. Tap  {'\n'} below to monitor your home.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{
  color: '#000000',
  fontFamily: 'Poppins-Medium',
  fontSize: 17,
  textAlign: 'center'
}}>Register</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>   Log In    </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Black',
    fontSize: 90,
    color: '#FFFFFF',
    textAlign: 'center',
    top: -210,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 19,
    color: '#FFFFFF',
    textAlign: 'center',
    top: -245,
    marginBottom: 5,
  },
  button: {
    bottom : -230,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 228,
    borderRadius: 25,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#192D38',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    fontSize: 17,
    textAlign: 'center',
  },
});

