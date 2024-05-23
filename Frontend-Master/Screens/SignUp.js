import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import ButtonSU from '../ButtonSU';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';

export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [countryCode, setCountryCode] = useState('MA');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password and confirmation do not match');
      return;
    }
  
    try {
      const requestData = {
        name: username,
        email: email,
        password: password,
        phonenumber: countryCode + phoneNumber,
      };
  
      const response = await axios.post('http://192.168.1.4:8080/auth/signup', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        if (response.data.statusCode === 200) {
          console.log(response.data);
          Alert.alert('Success', 'User registered successfully');
        } else if (response.data.statusCode === 400 && response.data.error === 'Email already exists') {
          console.error('Email already exists:', response.data);
          Alert.alert('Error', 'Email already exists');
        } else {
          console.error('Registration error:', response.data);
          Alert.alert('Error', 'Failed to register user');
        }
      } else {
        console.error('Registration error:', response.data);
        Alert.alert('Error', 'Failed to register user');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Status code:', error.response.status);
        Alert.alert('Error', `Failed to register user. Status code: ${error.response.status}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        Alert.alert('Error', 'No response received from the server');
      } else {
        console.error('Request error:', error.message);
        Alert.alert('Error', `Request error: ${error.message}`);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subTitle}></Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              placeholder="Full Name"
              style={styles.textInput}
              onChangeText={setUsername}
              value={username}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <CountryPicker
                countryCode={countryCode}
                withFlagButton={true}
                withCallingCodeButton={true}
                withAlphaFilter={true}
                withCallingCode={true}
                onSelect={(country) => setCountryCode(country.cca2)}
              />
              <TextInput
                placeholder="Phone Number"
                style={[styles.textInput, { flex: 1 }]}
                keyboardType="phone-pad"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm Password"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>
          <ButtonSU onPress={handleSignUp}/>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.createAccountButtonText}>Already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  mainContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  loginContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    width: '80%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 40,
    color: '#2B9DF2',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 17,
    color: 'gray',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 5,
    color: '#2B9DF2',
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '100%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#D5FFFF',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createAccountButton: {
    marginBottom: 40,
  },
  createAccountButtonText: {
    fontSize: 15,
    color: '#2B9DF2',
  },
});
