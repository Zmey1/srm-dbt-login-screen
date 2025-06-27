import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = async () => {
    try {
      console.log('Attempting login with:', { username, password });

      const response = await fetch('http://192.168.29.85:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Raw response:', response);

      const data = await response.json();
      console.log('Response JSON:', data);

      if (data.success) {
        setMessage('Login successful!');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Server error');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.29.85:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (data.success) {
        Alert.alert('Registered', 'User created successfully');
      } else {
        Alert.alert('Registration Failed', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Error', 'Could not register');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SRM-DBT Login</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {message !== '' && <Text style={styles.message}>{message}</Text>}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // dark background
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#3f51b5',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: '#607d8b',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  message: {
    color: '#fff',
    marginTop: 16,
    textAlign: 'center',
  },
});
