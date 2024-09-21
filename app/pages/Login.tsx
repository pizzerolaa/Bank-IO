import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Mail, Lock, User, FileText, UserCircle } from 'lucide-react-native';

function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rfc, setRFC] = useState('');

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        //login
        const response = await fetch('http://192.168.100.161:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password}),
        });

        const data = await response.json();

        if(response.ok) {
          console.log('Inicio de sesión exitoso', data);
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', data.message || 'Error al iniciar sesión');
        }
      } catch (error) {
        Alert.alert('Error', 'Error en la solicitud');
      }
    } else {
      try {
        //registro
        const response = await fetch('http://192.168.100.161:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: firstName, lastName: lastName, email, password, rfc }),
        });

        const data = await response.json();

        if (response.ok) {
          //registro exitoso
          console.log('Registro exitoso', data);
          setIsLogin(true); //cambiar a pantalla de inicio de sesión
        } else {
          //error al registrar
          Alert.alert('Error', data.message || 'Error al registrarse');
        }
      } catch (error) {
        Alert.alert('Error', 'Error en la solicitud');
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Recuperando contraseña...');
  };

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDQW8JFjLTO0yjqybmN4ruKCndVXtLzABGaQ&s"
        placeholder={blurhash}
        contentFit="fill"
        transition={1000}
      />
      <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
      
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