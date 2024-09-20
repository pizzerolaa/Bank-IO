import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);


  const handleSubmit = () => {
    // Aquí iría la lógica de autenticación real
    console.log(isLogin ? 'Iniciando sesión...' : 'Registrando...');
    navigation.navigate('Home');
  };

  const handleForgotPassword = () => {
    // Aquí iría la lógica para recuperar la contraseña
    console.log('Recuperando contraseña...');
  };

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View style={styles.container} testID="login-screen" >
        <Image
            style={styles.logo}
            source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDQW8JFjLTO0yjqybmN4ruKCndVXtLzABGaQ&s"
            placeholder={blurhash}
            contentFit="fill"
            transition={1000}
            />
        <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
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
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
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

export default LoginScreen;

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
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#e02e2e',
    borderRadius: 4,
    alignItems: 'center',
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
    width: 250,
    height: 250,
  },
});
