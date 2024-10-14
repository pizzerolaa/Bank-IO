import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Alert, View, Animated } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

function QrCodeScan({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }

    // Animation for the scanner overlay
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const response = await fetch(`http://192.168.100.161:5001/api/donations/${data}`);
      
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      navigation.navigate('DonationDetails', { barcode: data });
    } catch (error) {
      console.error('Error fetching donation:', error);
      Alert.alert("Error", "Ocurrió un problema al obtener los datos de la donación.");
    }
  };

  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>Camera access is needed to scan QR codes.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'android' && <StatusBar hidden />}
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer}></View>
            <View style={styles.focusedContainer}>
              {!scanned && (
                <Animated.View
                  style={[
                    styles.animatedLine,
                    {
                      transform: [
                        {
                          translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 200],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              )}
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
          <View style={styles.unfocusedContainer}></View>
        </View>
        <View style={styles.buttonContainer}>
          {scanned && (
            <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  middleContainer: {
    flexDirection: 'row',
    height: 200,
  },
  focusedContainer: {
    flex: 6,
  },
  animatedLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#ff0000',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgb(224, 46, 46)',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  permissionText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    margin: 20,
  },
});

export default QrCodeScan;