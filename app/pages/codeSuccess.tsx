import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Title, Paragraph } from "react-native-paper";

const VerifyScreen = ({ route, navigation }) => {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Para controlar el estado de envío
  const { email } = route.params;

  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert("Error", "Por favor, ingresa el código de verificación.");
      return;
    }

    setIsSubmitting(true); // Desactivar botón mientras se envía la solicitud
    try {
      const response = await fetch("http://192.168.100.161:5001/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Código verificado correctamente");
        navigation.navigate("Home");
      } else {
        throw new Error(data.message || "Error al verificar el código");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Código incorrecto o expirado";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false); // Reactivar el botón después de recibir la respuesta
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Verificar Código</Title>
      <Paragraph style={styles.paragraph}>
        Hemos enviado un código a tu correo electrónico: {email}
      </Paragraph>
      <TextInput
        label="Ingresa tu código"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: "#FFC300" } }}
      />
      <Button
        mode="contained"
        onPress={handleVerify}
        disabled={isSubmitting}
        loading={isSubmitting}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Verificar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#e02e2e",
  },
  paragraph: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  input: {
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#e02e2e",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 18,
    color: "white",
  },
});

export default VerifyScreen;
