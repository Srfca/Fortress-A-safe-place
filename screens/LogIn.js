import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(
        'Input Required',
        'Please fill out the required fields.', 
        [{ text: 'Okay', onPress: () => console.log('OK Pressed') }] 
      );
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailError(true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Instruction Sent',
        `We sent your instruction to change password to ${email}. Please check both your inbox and spam.`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>We're thrilled to see you again</Text>
      <Text style={styles.label}>Account Information</Text>
      <TextInput
        style={[styles.input, emailError && styles.inputError]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(false);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
  <Ionicons
    name={showPassword ? 'eye-off' : 'eye'}
    size={24}
    color="#000"
    style={{ right:8  }}
  />
</TouchableOpacity>

        </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontFamily: 'Poppins-Black',
    fontSize: 29,
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    top: -5,
    textAlign: 'center',
    marginBottom: 30,
    color: '#605D5D',
  },
  label: {
    color: '#605D5D',
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    marginBottom: 10,
  },
  input: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontFamily: 'Poppins-Medium',
  },
  inputError: {
    borderColor: 'red',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    fontSize: 17,
    flex: 1,
    padding: 10,
    fontFamily: 'Poppins-Medium',
  },
  forgotPassword: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: '#192D38',
    bottom: -100,
    textAlign: 'center',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#192D38',
    paddingVertical: 12,
    borderRadius: 5,
    top: -30,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
});

