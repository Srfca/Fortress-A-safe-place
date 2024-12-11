import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer.js'; // Ensure Footer component exists and is correct

const { width } = Dimensions.get('window');
const imageSize = (width - 60) / 3; // 3 images per row with some padding

const AboutScreen = ({ navigation }) => { // Make sure to pass navigation as a prop
  const images = [
    require('../assets/1.png'), // 
    require('../assets/2.png'),
    require('../assets/3.png'),
    require('../assets/4.png'),
    require('../assets/5.png'),
    require('../assets/6.png'),
    require('../assets/7.png'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Fortress</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            Fortress is an innovative home security solution designed to provide peace of mind and protection for your loved ones and belongings. Our state-of-the-art system integrates seamlessly with your smart home devices, offering real-time monitoring and instant alerts for any potential threats.
          </Text>
          <Text style={styles.paragraph}>
          We are Group 8from BSIT-3A at Colegio De Montalban aims to build a user-friendly application and a valuable project to establish the group's purpose in the community. The developers' excellence and professionalism are their edge in the IT industry
          </Text>
        </View>
        <View style={styles.albumContainer}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={image} // Using local images directly
              style={styles.image}
            />
          ))}
        </View>
      </ScrollView>
      <Footer navigation={navigation} /> {/* Ensure Footer has access to navigation */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    
  },
  contentContainer: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 15,
  },
  albumContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: imageSize,
    height: imageSize,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default AboutScreen;
