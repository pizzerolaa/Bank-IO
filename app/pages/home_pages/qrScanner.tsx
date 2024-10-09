import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Platform, StatusBar, Button, Alert } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';

function QrCodeScan({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false); // Estado para verificar si ya se ha escaneado

    const handleBarCodeScanned = async ({ data }) => {
        if (scanned) return; // Evita que se procese el escaneo si ya se ha escaneado una vez
        setScanned(true); // Cambia el estado a 'scanned' para evitar múltiples escaneos

        console.log('Raw data from scan:', data);
        const donationId = data; 
        console.log('ID escaneado:', donationId);
    
        try {
            const response = await fetch(`http://10.43.57.90:5001/api/donations/${donationId}`);
            console.log('Fetching URL:', `http://10.43.57.90:5001/api/donations/${donationId}`);
    
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
    
            navigation.navigate('DonationDetails', { barcode: donationId });
        } catch (error) {
            console.error('Error fetching donation:', error);
            Alert.alert("Error", "Ocurrió un problema al obtener los datos de la donación.");
        }
    };

    // Request permission when the component is mounted
    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, []);

    if (!permission?.granted) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.permissionText}>Camera access is needed to scan QR codes.</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {Platform.OS === 'android' ? <StatusBar hidden /> : null}
            <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                onBarcodeScanned={handleBarCodeScanned}
            >
                {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
            </CameraView>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        margin: 20,
    },
});

export default QrCodeScan;
