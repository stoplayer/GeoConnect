// SearcheAll.js
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
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import LocationScreen from './Location';

export default function SearcheAll() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [inMemoryContacts, setInMemoryContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);

  const searchByName = async () => {
    try {
      const response = await axios.get(`http://192.168.1.4:8080/public/contact/username/${searchQuery}`);
      const data = response.data;
      setContacts(data);
      setInMemoryContacts(data);
      console.log(response.data);
    } catch (error) {
      console.log('Error searching contacts by name:', error);
    }
  };

  const searchByPhone = async () => {
    try {
      const response = await axios.get(`http://192.168.1.4:8080/public/contact/contact/${searchQuery}`);
      const data = response.data;
      setContacts(data);
      setInMemoryContacts(data);
    } catch (error) {
      console.log('Error searching contacts by phone number:', error);
    }
  };

  const handlePreviousPage = () => {
    navigation.navigate('SearcheBar');
  };

  const handleNextPage = () => {
    navigation.navigate('');
  };

  const handleNavigateToMap = () => {
  navigation.navigate('LocationScreen');
};

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const renderItem = ({ item }) => (
    <View style={styles.contactContainer}>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactName}>
          {item.username}
        </Text>
        {item.contact ? (
          <View style={styles.contactNumberContainer}>
            <Ionicons name="call" size={18} color="#2f363c" />
            <Text style={styles.contactNumber}>{item.contact}</Text>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => openWhatsApp(item.contact)}
            >
              <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noPhoneNumber}>No phone number</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#2f363c"
          style={styles.searchBar}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.locationButton} onPress={handleNavigateToMap}>
          <Ionicons name="map" size={24} color="#2f363c" />
        </TouchableOpacity>
      </View>
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
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <Button
          title="Previous"
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        />
        <Text style={styles.pageText}>Page {currentPage}</Text>
        <Button
          title="Next"
          onPress={handleNextPage}
          disabled={indexOfLastContact >= contacts.length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    flex: 1,
    backgroundColor: '#D5FFFF',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#2f363c',
  },
  locationButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#D5FFFF',
    borderRadius: 40,
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
    marginHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 200,
    marginVertical: 16,
  },
  contactContainer: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f363c',
  },
  contactNumber: {
    fontSize: 14,
    color: '#2f363c',
  },
  noPhoneNumber: {
    fontSize: 14,
    color: '#8a8a8a',
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactsText: {
    fontSize: 16,
    color: '#8a8a8a',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  pageText: {
    fontSize: 16,
    color: '#2f363c',
  },
});