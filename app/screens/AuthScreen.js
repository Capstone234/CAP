import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/AuthScreenStyles';

const AuthScreen = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (name === 'Rhonda' && password === '12345') {
      navigation.navigate('Continue Tests', { screen: 'Doctor Part' });
    } else {
      Alert.alert('Verification Failed', 'Please enter the correct username and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Identity Verification</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}  // Hides the password text
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
