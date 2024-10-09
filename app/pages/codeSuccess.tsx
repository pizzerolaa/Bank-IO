import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const VerifyScreen = ({ route, navigation }) => {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Para controlar el estado de envío
  const { email } = route.params;

  const handleVerify = async () => {
    console.log("Verifying code...");

    if (!code.trim()) {
      Alert.alert("Error", "Por favor, ingresa el código de verificación.");
      return;
    }

    setIsSubmitting(true); // Desactivar botón mientras se envía la solicitud
    try {
      const response = await fetch("http://10.43.57.90:5001/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Código verificado:", data);
        Alert.alert("Éxito", "Código verificado correctamente");
        navigation.navigate("Home");
      } else {
        throw new Error(data.message || "Error al verificar el código");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Código incorrecto o expirado";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false); // Reactivar el botón después de recibir la respuesta
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
      <Button
        title="Verificar"
        onPress={handleVerify}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
});

export default VerifyScreen;
