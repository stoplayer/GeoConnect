import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonSI from '../ButtonSI';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SignIn = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    console.log("Attempting sign in...");
  
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.4:8080/auth/signing', {
        email: email,
        password: password,
      });
      console.log("Response received:", response);

  
      if (response.status === 200 && response.data.statusCode === 200) {
        // Connexion réussie
        console.log("Sign in successful:", response.data);
        Alert.alert('Success', 'Signed in successfully');
        navigation.navigate('SearchBar');
        const userResponse = await axios.get(`http://192.168.1.4:8080/public/searchemail/${email}`);
        if (userResponse.status === 200) {
          // Stocker l'ID de l'utilisateur dans une variable
          const userId = userResponse.data.id;
          await AsyncStorage.setItem('userId', userId.toString());
          const usr = await AsyncStorage.getItem('userId');
          console.log("User ID:", usr);
          // Vous pouvez maintenant utiliser cette variable userId dans votre application
        } else {
          console.error("Error fetching user data:", userResponse.data);
        }



     

        
      } else if (response.status === 200 && response.data.statusCode === 500 && response.data.error === "Bad credentials") {
        // Erreur d'authentification
        console.error("Sign in error:", response.data);
        Alert.alert('Error', 'Invalid email or password');
      } else {
        // Autre erreur
        Alert.alert('Error', 'Failed to sign in');
      }
    } catch (error) {
      console.error("Error occurred during sign in:", error);
      Alert.alert('Error', 'An error occurred');
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Image
          source={require('../assets/book.png')}
          style={styles.image}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subTitle}>Sign in to your account</Text>
          {/* Add labels above input fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput placeholder="Enter your email" style={styles.textInput} onChangeText={setEmail} value={email} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput placeholder="Enter your password" style={styles.textInput} secureTextEntry={true} onChangeText={setPassword} value={password} />
          </View>
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordButtonText}>Forgot your password?</Text>
          </TouchableOpacity>
          <ButtonSI onPress={handleSignIn} />
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('SignUp')} // Navigate to SignUp screen
          >
            <Text style={styles.createAccountButtonText}>Don't have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    fontSize: 70,
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

export default SignIn;
