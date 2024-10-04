import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";
import { BadgeCheck } from "lucide-react-native";

function DonationConf({ navigation }) {
    return(
        <View style={styles.container}>
            <Title style={styles.title}>¡Donación Exitosa!</Title>
            <BadgeCheck color="#e02e2e" size={120} />
            <Text style={styles.text}>{"\n"}Gracias por tu donación. Tu ayuda es muy valiosa para nosotros.{"\n"}{"\n"}</Text>
            <Text style={styles.text}>Tu código QR para esta donación es:{"\n"}</Text>
            <Text style={styles.text}>1234567890{"\n"}</Text>
            <Text style={styles.text}>Preséntalo en el lugar de recolección para completar la donación.{"\n"}</Text>
            <Text style={styles.text}>¡Gracias por tu apoyo!{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Home')}>Volver al Inicio</Button>
        </View>

        //FALTA AGREGAR LA FUNCIONALIDAD DE CREACION DE CODIGOS QR
    );
}

export default DonationConf;

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
    text: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#e02e2e',
        borderRadius: 4,
        alignItems: 'center',
    },
});