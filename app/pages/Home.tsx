import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { Gift, Clock, Award, PieChart, Truck, StepBack } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        const response = await fetch(
          `http://192.168.100.161:5001/api/users/user/${id}`
        );
        const userData = await response.json();
        setUserName(userData.name);
      }
    } catch (error) {
      console.error("Error retrieving user name:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      setUserName("");
      navigation.navigate("Login");
      Alert.alert("Sesión cerrada", "¡Hasta luego!");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const homeItems = [
    {
      title: "Crear nueva donación",
      icon: Gift,
      description: "Inicia una nueva donación ahora",
      route: "NewDonation",
    },
    {
      title: "Ver donaciones anteriores",
      icon: Clock,
      description: "Revisa el historial de tus donaciones",
      route: "PrevDonations",
    },
    {
      title: "Ver recompensas",
      icon: Award,
      description: "Descubre tus reconocimientos y recompensas",
      route: "SeeRewards",
    },
    {
      title: "Consultar impacto",
      icon: PieChart,
      description: "Mira cómo tus donaciones hacen la diferencia",
      route: "DonationImpact",
    },
    {
      title: "Seguimiento de Donación",
      icon: Truck,
      description: "Ve el progreso de tu donación",
      route: "DonationTracking",
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>
        {userName ? `¡Bienvenido ${userName}!` : "!Bienvenido!"}
      </Title>
      <View style={styles.grid}>
        {homeItems.map((item, index) => (
          <Card
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.route)}
          >
            <Card.Content style={styles.cardContent}>
              <item.icon color={"#e02e2e"} size={35} />
              <Title style={styles.cardTitle}>{item.title}</Title>
              <Paragraph style={styles.cardDescription}>
                {item.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
      <Button
          icon={() => <StepBack color={'white'} />}
          mode="contained"
          onPress={() => handleLogout()}
          style={styles.logoutButton}
        >
          Cerrar Sesión
        </Button>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    paddingBottom: 20,
    color: "#e02e2e",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    marginBottom: 18,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    transform: [{ scale: 1 }],
  },
  cardContent: {
    alignItems: "center",
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    color: "#333",
  },
  cardDescription: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    color: "#777",
  },
  logoutButton: {
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: "#e02e2e",
    borderRadius: 8,
    padding: 1,
  },
});
