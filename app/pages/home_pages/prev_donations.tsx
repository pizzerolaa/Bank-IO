import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Alert, Animated } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Title, Card, Paragraph } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, MapPin, AlertCircle, Info, Carrot } from "lucide-react-native"; // Iconos nuevos

function PrevDonations({ navigation }) {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (id) {
          fetchDonations(id);
        } else {
          Alert.alert("Error", "No se encontró el ID del usuario.");
        }
      } catch (error) {
        console.error("Error retrieving user ID:", error);
        Alert.alert("Error", "Error al recuperar el ID del usuario.");
      }
    };
    fetchUserId();
  }, []);

  const fetchDonations = async (userId) => {
    try {
      const response = await fetch(
        `http://192.168.100.161:5001/api/donations/getByDonor/${userId}`
      );
      const data = await response.json();
      if (response.ok) {
        setDonations(data);
      } else {
        Alert.alert("Error", data.message || "Error al cargar las donaciones");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Error en la solicitud de donaciones.");
    }
  };

  const toggleDonationDetails = (index) => {
    setSelectedDonation(selectedDonation === index ? null : index);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Title style={styles.title}>Donaciones Anteriores</Title>
      {donations.length === 0 ? (
        <Text style={styles.noDonations}>No hay donaciones registradas.</Text>
      ) : (
        donations.map((item, index) => (
          <Animated.View key={index} style={styles.animatedCard}>
            <Card
              style={[
                styles.card,
                selectedDonation === index && styles.selectedCard,
              ]}
              onPress={() => toggleDonationDetails(index)}
            >
              <Card.Title
                title={`Donación ${index + 1}: ${item.quantity} ${item.unit}`}
                left={() => <Info color={"#e02e2e"} size={25} />} // Icono llamativo
              />
              {selectedDonation === index && (
                <Card.Content style={styles.cardContent}>
                  <Paragraph>
                    <Text style={styles.boldText}>
                      <Carrot color="black" /> Alimeto:{" "}
                    </Text>
                    {item.comments}
                  </Paragraph>
                  <Paragraph>
                    <Text style={styles.boldText}>
                      <Calendar color="black" /> Fecha de Caducidad:{" "}
                    </Text>
                    {new Date(item.expirationDate).toLocaleDateString()}
                  </Paragraph>
                  <Paragraph>
                    <Text style={styles.boldText}>
                      <MapPin color="black" /> Ubicación:{" "}
                    </Text>
                    {item.location}
                  </Paragraph>
                  <Paragraph>
                    <Text style={styles.boldText}>
                      <AlertCircle color="black" />{" "}
                      Urgente:{" "}
                    </Text>
                    {item.urgent ? "Sí" : "No"}
                  </Paragraph>
                </Card.Content>
              )}
            </Card>
          </Animated.View>
        ))
      )}
      <Button
        style={styles.buttonNewDonation}
        mode="contained"
        onPress={() => navigation.navigate("NewDonation")}
      >
        Nueva Donación
      </Button>
      <Button
        style={styles.buttonBack}
        mode="contained"
        onPress={() => navigation.navigate("Home")}
      >
        Volver al Inicio
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default PrevDonations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "black",
  },
  noDonations: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#f9f9f9",
  },
  selectedCard: {
    backgroundColor: "#fff051", // Cambio de color al seleccionar
    elevation: 6,
  },
  cardContent: {
    paddingTop: 10,
  },
  boldText: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  buttonNewDonation: {
    marginTop: 16,
    backgroundColor: "#FFC300",
  },
  buttonBack: {
    marginTop: 10,
    marginBottom: 25,
    backgroundColor: "#e02e2e",
  },
});
