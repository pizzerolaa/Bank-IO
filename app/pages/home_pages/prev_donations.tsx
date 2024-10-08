import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Title } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

function PrevDonations({ navigation }) {
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [userId, setUserId] = useState(null);

    // Obtener el ID del usuario
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    setUserId(id);
                    fetchDonations(id);
                } else {
                    Alert.alert('Error', 'No se encontró el ID del usuario.');
                }
            } catch (error) {
                console.error('Error retrieving user ID:', error);
                Alert.alert('Error', 'Error al recuperar el ID del usuario.');
            }
        };
        fetchUserId();
    }, []);

    const fetchDonations = async (userId) => {
        try {
            const response = await fetch(`http://10.43.57.90:5000/api/donations/getByDonor/${userId}`);
            const data = await response.json();

            if (response.ok) {
                setDonations(data);
            } else {
                Alert.alert('Error', data.message || 'Error al cargar las donaciones');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Alert.alert('Error', 'Error en la solicitud de donaciones.');
        }
    };

    const toggleDonationDetails = (index) => {
        if (selectedDonation === index) {
            setSelectedDonation(null);
        } else {
            setSelectedDonation(index);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>{"\n"}Donaciones Anteriores{"\n"}</Title>
            {donations.length === 0 ? (
                <Text style={styles.noDonations}>No hay donaciones registradas.</Text>
            ) : (
                donations.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Button
                            onPress={() => toggleDonationDetails(index)}
                            mode="contained"
                            style={styles.donationButton}
                            icon="information"
                            contentStyle={styles.buttonContent}
                            labelStyle={styles.buttonLabel}
                        >
                            {`Donación ${index + 1}: ${item.quantity} ${item.unit}`}
                        </Button>
                        {selectedDonation === index && (
                            <View style={styles.detailsContainer}>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Fecha de Caducidad: </Text>
                                    <Text style={styles.text}>{new Date(item.expirationDate).toLocaleDateString()}</Text>
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Ubicación: </Text>
                                    <Text style={styles.text}>{item.location}</Text>
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Comentarios: </Text>
                                    <Text style={styles.text}>{item.comments}</Text>
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Urgente: </Text>
                                    <Text style={styles.text}>{item.urgent ? 'Sí' : 'No'}</Text>
                                </Text>
                            </View>
                        )}
                    </View>
                ))
            )}
            <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Home')}>Volver al Inicio</Button>
        </ScrollView>
    );
}

export default PrevDonations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 26,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    noDonations: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
    card: {
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 10,
    },
    donationButton: {
        marginBottom: 5,
        backgroundColor: '#FFC300',
        borderRadius: 30,
        elevation: 3,
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Alinear el contenido a la izquierda
        alignItems: 'center',
        paddingVertical: 10,
    },
    buttonLabel: {
        fontSize: 16,
        color: '#000',
        marginLeft: 10,
        paddingLeft: 10, // Agregar padding a la izquierda del texto
    },
    detailsContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#e02e2e',
    },
});
