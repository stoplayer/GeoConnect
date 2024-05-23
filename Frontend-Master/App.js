//App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchAll from './Screens/SearchAll';
import LocationScreen from './Screens/Location';// Renamed from 'Location'
import SearcheBar from './Screens/SearchBar';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
        
        <Stack.Screen
          name="SearchBar"
          component={SearcheBar}
        />
        <Stack.Screen
          name="SearchAll"
          component={SearchAll}
          //options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen} // Updated component name
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}