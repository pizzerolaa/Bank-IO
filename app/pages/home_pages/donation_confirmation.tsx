import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Title } from "react-native-paper";
import { BadgeCheck } from "lucide-react-native";

function DonationConf({ navigation }) {
    return(
        <View style={styles.container}>
            <Title style={styles.title}>¡Donación Exitosa!</Title>
            <BadgeCheck color="#e02e2e" size={120} />
            <Text style={styles.text}>{"\n"}Gracias por tu donación. Tu ayuda es muy valiosa para nosotros.{"\n"}</Text>
            <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Home')}>Volver al Inicio</Button>
        </View>
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