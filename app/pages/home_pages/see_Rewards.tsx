import React from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, Title } from "react-native-paper";

function SeeRewards({ navigation }) {
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{"\n"}Recompensas{"\n"}</Text>
            <Text style={styles.text}>¡Felicitaciones! Has completado 5 donaciones.{"\n"}</Text>
            <Text style={styles.text}>Como recompensa, recibirás un descuento del 10% en tu próxima donación.{"\n"}</Text>
            <Text style={styles.text}>Además, recibirás un reconocimiento especial en tu perfil.{"\n"}</Text>
            <Text style={styles.text}>¡Gracias por tu compromiso!{"\n"}</Text>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Home')}>Volver al Inicio</Button>
        </ScrollView>
    );
}

export default SeeRewards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#e02e2e',
        borderRadius: 30,
        elevation: 3,
    },
});