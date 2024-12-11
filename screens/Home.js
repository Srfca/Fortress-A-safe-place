import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';
import { auth, db, rtdb } from '../firebaseConfig';
import { onValue, ref, set } from 'firebase/database';
import { collection, addDoc, query, orderBy, limit, onSnapshot, doc, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 1;
const CARD_HEIGHT = CARD_WIDTH * 0.7

const cardImages = [
  require('../assets/1.jpg'),
  require('../assets/2.jpg'),
  require('../assets/3.jpg')
];

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }
      });
    }

    const alertRef = ref(rtdb, 'alerts');
    const unsubscribe = onValue(alertRef, (snapshot) => {
      const data = snapshot.val();
      if (data && (data.type === 'Fire' || data.type === 'Gas')) {
        setAlertMessage(data);
        saveAlertToFirestore(data);
      } else {
        setAlertMessage(null);
      }
    });

    const historyRef = collection(db, 'alerts');
    const q = query(historyRef, orderBy('timestamp', 'desc'), limit(10));
    const historyUnsubscribe = onSnapshot(q, (querySnapshot) => {
      const alerts = [];
      querySnapshot.forEach((doc) => {
        alerts.push({ id: doc.id, ...doc.data() });
      });
      setHistory(alerts);
    });

    return () => {
      unsubscribe();
      historyUnsubscribe();
    };
  }, []);

  const saveAlertToFirestore = async (alertData) => {
    try {
      await addDoc(collection(db, 'alerts'), {
        ...alertData,
        timestamp: new Date(),
        userId: auth.currentUser.uid,
      });
    } catch (error) {
      console.error("Error saving alert to Firestore: ", error);
    }
  };

  const handleSafeButton = () => {
    setAlertMessage(null);
    set(ref(rtdb, 'alerts'), null);
  };

  const renderAlertIcon = (type) => {
    return type === 'Fire' ? 'fire' : 'wind';
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item} style={styles.cardImage} />
    </View>
  );

  const handleCardChange = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / CARD_WIDTH);
    setCurrentCardIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fortress</Text>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => auth.signOut().then(() => navigation.replace('Login'))}
        >
          <Icon name="log-out" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {userName}</Text>

        <View style={styles.cardContainer}>
          <FlatList
            ref={flatListRef}
            data={cardImages}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            onMomentumScrollEnd={handleCardChange}
          />
          <View style={styles.pagination}>
            {cardImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentCardIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {alertMessage && (alertMessage.type === 'Fire' || alertMessage.type === 'Gas') && (
          <View style={[styles.alertContainer, alertMessage.type === 'Fire' ? styles.fireAlert : styles.gasAlert]}>
            <Icon name={renderAlertIcon(alertMessage.type)} size={24} color="#fff" />
            <Text style={styles.alertText}>
              {alertMessage.type} detected
            </Text>
            <TouchableOpacity style={styles.safeButton} onPress={handleSafeButton}>
              <Text style={styles.safeButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Alerts</Text>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Icon name={renderAlertIcon(item.type)} size={20} color="#333" />
                <Text style={styles.historyText}>{item.type}</Text>
                <Text style={styles.historyDate}>{item.timestamp.toDate().toLocaleString()}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyHistoryText}>No recent alerts</Text>
            }
          />
        </View>
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  cardContainer: {
    height: CARD_HEIGHT,
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: (width - CARD_WIDTH) / 2,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#333',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  fireAlert: {
    backgroundColor: '#FF6B6B',
  },
  gasAlert: {
    backgroundColor: '#4ECDC4',
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  safeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  safeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    color: '#888',
  },
  emptyHistoryText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

