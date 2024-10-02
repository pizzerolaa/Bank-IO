import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const VerifyScreen = ({ route, navigation }) => {
    const [code, setCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);  // Para controlar el estado de envío
    const { email } = route.params;

    const handleVerify = async () => {
        if (!code.trim()) {
            Alert.alert('Error', 'Por favor, ingresa el código de verificación.');
            return;
        }

        setIsSubmitting(true);  // Desactivar botón mientras se envía la solicitud
        try {
            const response = await axios.post('http://192.168.100.161:5000/api/users/verify', {
                email,
                code,
            });

            Alert.alert('Verificación exitosa', 'Tu cuenta ha sido verificada.');
            navigation.navigate('Home');  // Redirige al home después de verificar
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Código incorrecto o expirado';
            Alert.alert('Error', errorMessage);
        } finally {
            setIsSubmitting(false);  // Reactivar el botón después de recibir la respuesta
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificar Código</Text>
            <Text>Hemos enviado un código a tu correo electrónico.</Text>
            <TextInput
                placeholder="Ingresa tu código"
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Verificar" onPress={handleVerify} disabled={isSubmitting} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 4,
    },
});

export default VerifyScreen;
