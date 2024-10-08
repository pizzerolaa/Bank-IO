import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { Image } from 'expo-image';
import { Mail, Lock, User, FileText, UserCircle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rfc, setRFC] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!email.trim() || !password.trim() || (!isLogin && (!firstName.trim() || !lastName.trim() || !rfc.trim()))) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Ingresa un correo válido.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un símbolo.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    if (!validateForm()) {
      return;
    }
    if (isLogin) {
      try {
        const response = await fetch('http://10.43.57.90:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if(response.ok) {
          //login exitoso
          Alert.alert('Login exitoso', 'Se ha enviado un código de verificación a tu correo.');
          console.log('Navigate to verify screen');
          navigation.navigate('Verify', { email });
          await AsyncStorage.setItem('userId', data.id);
        } else {
          setErrorMessage(data.message || 'Error al iniciar sesión');
        }
      } catch (error) {
        setErrorMessage('Error en la solicitud');
      }
    } else {
      try {
        const response = await fetch('http://10.43.57.90:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: firstName, lastName, email, password, rfc }),
        });

        const data = await response.json();

        if (response.ok) {
          //registro exitoso
          Alert.alert('Registro exitoso', 'Se ha enviado un código de verificación a tu correo.');
          navigation.navigate('Verify', { email }); //cambiar a pantalla de inicio de sesión
          await AsyncStorage.setItem('userId', data.id);
        } else {
          setErrorMessage(data.message || 'Error al registrarse');
        }
      } catch (error) {
        setErrorMessage('Error en la solicitud');
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Recuperando contraseña...');
  };

  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={100} // Ajusta este valor según la altura de tu encabezado o logo
    >
      <View 
        style={styles.container}
      >
        <Image
          style={styles.logo}
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDQW8JFjLTO0yjqybmN4ruKCndVXtLzABGaQ&s" }} // Cambié el source para ser un objeto con uri
          placeholder={blurhash}
          contentFit="fill"
          transition={1000}
        />
        <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
        
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        
        {!isLogin && (
          <>
            <View style={styles.inputContainer}>
              <User color="#666" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor={'#666'}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputContainer}>
              <UserCircle color="#666" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                placeholderTextColor={'#666'}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View style={styles.inputContainer}>
              <FileText color="#666" size={20} />
              <TextInput
                style={styles.input}
                placeholder="RFC"
                placeholderTextColor={'#666'}
                value={rfc}
                onChangeText={setRFC}
              />
            </View>
          </>
        )}
        
        <View style={styles.inputContainer}>
          <Mail color="#666" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={'#666'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Lock color="#666" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={'#666'}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleButton}>
              {isLogin ? 'Regístrate' : 'Inicia Sesión'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {isLogin && (
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#e02e2e',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 14,
  },
  toggleButton: {
    color: '#ba1423',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#ba1423',
    fontSize: 14,
  },
  logo: {
    width: 260,
    height: 250,
    marginBottom: 20,
  },
});

export default LoginScreen;