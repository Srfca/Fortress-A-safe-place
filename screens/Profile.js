import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import Footer from '../components/Footer.js';
import { Ionicons } from '@expo/vector-icons';
export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email || '');
        const userRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setName(docSnap.data().name || '');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          Alert.alert("Error", "Failed to load user data. Please try again.");
        }
      }
    };

    fetchUserData();
  }, []);

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Email cannot be empty");
      return false;
    }
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    const user = auth.currentUser;
    if (user) {
      try {
        if (oldPassword && (email !== user.email || newPassword)) {
          const credential = EmailAuthProvider.credential(user.email || '', oldPassword);
          await reauthenticateWithCredential(user, credential);
        }

        if (name !== user.displayName) {
          await updateProfile(user, { displayName: name });
          await updateDoc(doc(db, 'users', user.uid), { name });
        }

        if (email !== user.email) {
          if (!oldPassword) {
            throw new Error('Please enter your current password to change the email');
          }
          await updateEmail(user, email);
        }

        if (newPassword) {
          if (!oldPassword) {
            throw new Error('Please enter your current password to change the password');
          }
          await updatePassword(user, newPassword);
        }

        Alert.alert('Success', 'Profile updated successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Error', error.message);
        } else {
          Alert.alert('Error', 'An unknown error occurred');
        }
      }
    }
  };

  const renderInput = (placeholder, value, onChangeText, secureTextEntry = false, showPassword = false, setShowPassword = () => {}) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons
          name={showPassword ? 'eye-off' : 'eye'} // Change icon based on state
          size={20}
          color="#888"
        />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        {renderInput('Name', name, setName)}
        {renderInput('Email', email, setEmail)}
        {renderInput('Current Password', oldPassword, setOldPassword, true, showOldPassword, setShowOldPassword)}
        {renderInput('New Password', newPassword, setNewPassword, true, showNewPassword, setShowNewPassword)}
        {renderInput('Confirm New Password', confirmPassword, setConfirmPassword, true, showConfirmPassword, setShowConfirmPassword)}
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 17,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#192D38',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
  },
});

