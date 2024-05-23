import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

export default function App() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [inMemoryContacts, setInMemoryContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant permission to access your contacts.',
          [{ text: 'OK' }]
        );
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

     // console.log(data);
      setContacts(data);
      setInMemoryContacts(data);
      setIsLoading(false);

      // Save contacts to backend
      saveContactsToBackend(data);
     // checkAndSaveContacts(data);
    } catch (error) {
      console.log('Error loading contacts:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };



  const saveContactsToBackend = async (contacts) => {
    try {
      const backendUrl = 'http://192.168.1.4:8080/public/addcontact';
      
      // Iterate over each contact and make a POST request to the API
      contacts.forEach(async (contact) => {
        let username = contact.name;
        let phoneNumber = contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].digits : '';

        // Make a POST request to your backend API
        await axios.post(backendUrl, {
          username: username,
          contact: phoneNumber
        });

       // console.log('Contact saved:', { username, phoneNumber });
      });
    } catch (error) {
      console.log('Error saving contacts to backend:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  const checkAndSaveContacts = async (contacts) => {
    try {
      const backendUrl = 'http://172.20.10.12:8080/public/search-by-phone/';
     
  
      // Itérer sur chaque contact et vérifier s'il existe déjà dans la base de données
      for (const contact of contacts) {
      
        let phoneNumber = contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].digits : '';
  
        // Vérifier si le contact existe déjà dans la base de données
        const response = await axios.get(`${backendUrl}${phoneNumber}`);
        const existingUser = response.data;
        if (existingUser) {
          // Le contact existe déjà, récupérer son ID
          const friendid= existingUser.id;
          const userId=await AsyncStorage.getItem('userId');
          await axios.post(`http://172.20.10.12:8080/public/addfriend/${userId}/${friendid}`);
        }
      }
    } catch (error) {
      console.log('Error checking and saving contacts to backend:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  const filterByName = (contact) => {
    const contactLowercase = (
      contact.firstName +
      ' ' +
      contact.lastName
    ).toLowerCase();

    const searchTermLowercase = searchQuery.toLowerCase();

    return contactLowercase.indexOf(searchTermLowercase) > -1;
  };

  const filterByPhone = (contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      const contactPhoneNumber = contact.phoneNumbers[0].digits;
      const searchTermLowercase = searchQuery.toLowerCase();

      return contactPhoneNumber.indexOf(searchTermLowercase) > -1;
    }

    return false;
  };

  const searchByName = () => {
    const filteredContacts = inMemoryContacts.filter(filterByName);
    setContacts(filteredContacts);
  };

  const searchByPhone = () => {
    const filteredContacts = inMemoryContacts.filter(filterByPhone);
    setContacts(filteredContacts);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    navigation.navigate('SearchAll'); // Replace 'NextPage' with the name of the next screen
  };
  const openWhatsApp = (phoneNumber) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url);
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const renderItem = ({ item }) => (
    <View style={styles.contactContainer}>
      <Text style={styles.contactName}>
        {item.firstName} {item.lastName}
      </Text>
      {item.phoneNumbers && item.phoneNumbers.length > 0 ? (
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactNumber}>
            {item.phoneNumbers[0].digits}
          </Text>
          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={() => openWhatsApp(item.phoneNumbers[0].digits)}
          >
            <FontAwesome name="whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noPhoneNumber}>No phone number</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <TextInput
        placeholder="Search "
        placeholderTextColor="#2f363c"
        style={styles.searchBar}
        onChangeText={setSearchQuery}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={searchByName}
        >
          <Text style={styles.buttonText}>Search by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={searchByPhone}
        >
          <Text style={styles.buttonText}>Search by Phone</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactsContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2f363c" />
          </View>
        ) : null}
        <FlatList
          data={currentContacts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.noContactsContainer}>
              <Text style={styles.noContactsText}>No Contacts Found</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false} // Hide the scrolling bar
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>
          Page {currentPage}
        </Text>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={handleNextPage}
          disabled={indexOfLastContact >= contacts.length}
        >
          <Text style={styles.pageText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  searchBar: {
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#D5FFFF',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#2f363c',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#2f363c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  contactContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2f363c',
  },
  contactInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactNumber: {
    fontSize: 14,
    color: '#2f363c',
  },
  noPhoneNumber: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContactsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContactsText: {
    fontSize: 18,
    color: '#2f363c',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageButton: {
    backgroundColor: '#2f363c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  whatsappButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
