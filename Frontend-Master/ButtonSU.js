import React from "react";
import { Pressable, StyleSheet, Text,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonSU ({onPress}) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#6ED6FF', '#2B9DF2']} 
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}    
                style={styles.button}
            >
                <Text style={styles.text}>SIGN UP</Text>
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 200,
        marginTop: 30,
    },

    text: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
  });