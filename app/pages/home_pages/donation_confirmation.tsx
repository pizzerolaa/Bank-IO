import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";
import { BadgeCheck } from "lucide-react-native";
import QRCode from "react-native-qrcode-svg";
import logoBanco from "../../assets/images/bancoqr.jpg";
import { useRoute } from "@react-navigation/native";

type DonationConfParams = {
  id: string;
};

function DonationConf({ navigation }) {
  const route = useRoute();
  const donationId = (route.params as DonationConfParams).id;

  const renderQR = () => {
    const qrValue = donationId;
    return (
      <QRCode
        value={qrValue}
        size={200}
        color="#000"
        backgroundColor="#fff"
        logo={logoBanco}
        logoSize={50}
        logoMargin={2}
        logoBorderRadius={10}
        quietZone={20}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>¡Donación Exitosa!</Title>
      <BadgeCheck color="#e02e2e" size={120} />
      <Text style={styles.text}>
        {"\n"}Gracias por tu donación. Tu ayuda es muy valiosa para nosotros.
      </Text>
      <Text style={styles.text}>Tu código QR para esta donación es:</Text>
      {renderQR()}
      <Text style={styles.text}>
        Preséntalo en el lugar de recolección para completar la donación.
      </Text>
      <Text style={styles.text}>¡Gracias por tu apoyo!</Text>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate("Home")}
      >
        Volver al Inicio
      </Button>
    </View>
  );
}

export default DonationConf;

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
  },
});
