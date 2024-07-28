import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { Link, router } from 'expo-router';
import { signUpApi } from '../../libs/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/features/userSlice';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setIsLoading(true);
    
    // Input validation
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await signUpApi(username, email, password);
      if(response.status) {
        dispatch(setUser({ username, email }));
        router.replace('/home')
      }else {
        throw new Error(response.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button label="Sign Up" handlePress={handleSignUp} isLoading={isLoading} />
      <Text style={styles.linkText}>
        Have account? Click here to login{' '}
        <Link href="sign-in" style={styles.link}>
          Sign In
        </Link>
      </Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
