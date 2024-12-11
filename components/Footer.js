import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
        <Icon name="home" size={30} color="#192D38" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconContainer}>
        <Icon name="person" size={30} color="#192D38" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.iconContainer}>
        <Icon name="info" size={30} color="#192D38" />
        <Text style={styles.label}>About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  iconContainer: {
    alignItems: 'center', 
  },
  label: {
    marginTop: 4, 
    fontSize: 12, 
    color: '#192D38', 
  },
});
