import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
  Alert
} from 'react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [inMemoryData, setInMemoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery);

  const searchByName = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://192.168.137.1:7071/public/contact/username/${searchQuery}`);
      setData(response.data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error searching by name:', error);
      setIsLoading(false);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  const searchByPhone = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://192.168.137.1:7071/public/contact/contact/${searchQuery}`);
      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error searching by phone:', error);
      setIsLoading(false);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.recordContainer}>
      <Text style={styles.recordName}>{item.username}</Text>
      <Text style={styles.recordPhone}>{item.contact}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#2f363c"
        style={styles.searchBar}
        onChangeText={setSearchQuery}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.searchButton}>
          <Button
            title="Search by Name"
            onPress={searchByName}
            color="#2f363c"
          />
        </View>
        <View style={styles.searchButton}>
          <Button
            title="Search by Phone"
            onPress={searchByPhone}
            color="#2f363c"
          />
        </View>
      </View>
      <View style={styles.recordsContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#bad555" />
          </View>
        ) : null}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.noRecordsContainer}>
              <Text style={styles.noRecordsText}>No Records Found</Text>
            </View>
          )}
        />
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
  searchBar: {
    backgroundColor: '#D5FFFF',
    height: 50,
    width: 250,
    borderRadius: 40,
    alignSelf: 'center',
    fontSize: 25,
    padding: 10,
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  searchButton: {
    borderRadius: 40,
    paddingHorizontal: 10,
  },
  recordsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    overflow: 'hidden', // Add this line to hide the scrolling bar
  },
  recordContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  recordName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000', // Set text color to black for better visibility
  },
  recordPhone: {
    fontSize: 14,
    color: '#000000', // Set text color to black for better visibility
  },
  loadingContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordsText: {
    fontSize: 16,
    color: '#000000', // Set text color to black for better visibility
  },
});
