import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import SearchBar from './Screens/SearchBar';
import SearchAll from './Screens/SearchAll';

/*import SearchBar from './Screens/SearchBar';*/
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="SearchBar" component={SearchBar} options={{ headerShown: false }} />
        <Stack.Screen name="SearchAll" component={SearchAll} options={{ headerShown: false }} />
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Removed LoginScreen function

const styles = StyleSheet.create({
  // Styles remain unchanged
});
