import React, { useRef } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Title } from "react-native-paper";
import { BadgeCheck } from "lucide-react-native";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from 'expo-media-library';
import ViewShot from "react-native-view-shot";
import { useRoute } from "@react-navigation/native";

type DonationConfParams = {
  id: string;
};

function DonationConf({ navigation }) {
  const route = useRoute();
  const donationId = (route.params as DonationConfParams).id;
  const qrRef = useRef();

  const renderQR = () => {
    const qrValue = donationId;
    return (
      <QRCode
        value={qrValue}
        size={200}
        color="#000"
        backgroundColor="#fff"
        logo={require("../../assets/images/bancoqr.jpg")}
        logoSize={50}
        logoMargin={2}
        logoBorderRadius={10}
        quietZone={20}
      />
    );
  };

  const saveQRCode = async () => {
    try {
      // Request permission to access the media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to save the QR code.');
        return;
      }

      // Capture the QR code as an image
      const uri = await qrRef.current.capture();

      // Save the image to the device's gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("DonationQRCodes", asset, false);

      Alert.alert('Completado', 'Código QR guardado en tu galería!');
    } catch (error) {
      console.error('Error guardando el cod. QR:', error);
      Alert.alert('Error', 'Fallo al guardar QR. Por favor intente de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>¡Donación Exitosa!</Title>
      <BadgeCheck color="#e02e2e" size={120} />
      <Text style={styles.text}>
        {"\n"}Gracias por tu donación. Tu ayuda es muy valiosa para nosotros.
      </Text>
      <Text style={styles.text}>Tu código QR para esta donación es:</Text>
      <ViewShot ref={qrRef} options={{ format: "png", quality: 0.9 }}>
        {renderQR()}
      </ViewShot>
      <Text style={styles.text}>
        Te recomendamos guardar este QR para presentarlo en el lugar de recolección para completar la donación.
      </Text>
      <Text style={styles.text}>¡Gracias por tu apoyo!</Text>
      <Button
        style={styles.button}
        mode="contained"
        onPress={saveQRCode}
      >
        Guardar Código QR
      </Button>
      <Button
        style={[styles.button, styles.homeButton]}
        mode="contained"
        onPress={() => navigation.navigate("Home")}
      >
        Volver al Inicio
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#e02e2e",
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: "#4a4a4a",
  },
});

export default DonationConf;