import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import ButtonSU from '../ButtonSU'; // Adjusted the import path for ButtonSI
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import 'react-native-gesture-handler';

export default function SignUp() {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.mainContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subTitle}></Text>
        <TextInput
          placeholder="first name"
          style={styles.textInput}
        />
        <TextInput
          placeholder="last name"
          style={styles.textInput}
        />
        <TextInput
          placeholder="country"
          style={styles.textInput}
        />
        <TextInput
          placeholder="phone number"
          style={styles.textInput}
        />
        <TextInput
          placeholder="email"
          style={styles.textInput}
        />
        <TextInput
          placeholder="password"
          style={styles.textInput}
          secureTextEntry={true}
        />
        <ButtonSU />
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('SignIn')} // Navigate to SignIn screen
        >
          <Text style={styles.createAccountButtonText}>Already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: -50,
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
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: '#D5FFFF',
  },
  forgotPasswordButton: {
    marginBottom: 20,
  },
  forgotPasswordButtonText: {
    fontSize: 15,
    color: '#2B9DF2',
  },
  createAccountButton: {
    marginBottom: 40,
  },
  createAccountButtonText: {
    fontSize: 15,
    color: '#2B9DF2',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
});
