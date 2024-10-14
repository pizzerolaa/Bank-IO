import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DonationDetails = ({ route }) => {
    const navigation = useNavigation();
    const { barcode: donationId } = route.params;
    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonationDetails = async () => {
            try {
                const response = await fetch(`http://192.168.100.161:5001/api/donations/${donationId}`);
                const result = await response.json();
                console.log('Donation details:', result);
                setDonation(result);
            } catch (error) {
                console.error('Error fetching donation details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonationDetails();
    }, [donationId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#e02e2e" />
                <Text style={styles.loadingText}>Cargando detalles de la donación...</Text>
            </View>
        );
    }

    if (!donation) {
        return (
            <View style={styles.container}>
                <Text>No se encontraron detalles para esta donación.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de la Donación</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Donante</Text>
                    <Text>{donation.donor?.name} {donation.donor?.lastName}</Text>
                    <Text>RFC: {donation.donor?.rfc}</Text>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Información de la Donación</Text>
                    <Text>Alimento: {donation.comments || 'Sin definir'}</Text>
                    <Text>Tipo: {donation.type ? 'No Perecedero': 'Perecedero'}</Text>
                    <Text>Cantidad: {donation.quantity} {donation.unit}</Text>
                    <Text>Fecha de expiración: {donation.expirationDate || 'No caduca'}</Text>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Detalles Adicionales</Text>
                    <Text>Ubicación: {donation.location}</Text>
                    <Text>Horarios disponibles: {donation.availableTimes}</Text>
                    <Text>¿Es urgente?: {donation.urgent ? 'Sí' : 'No'}</Text>
                </Card.Content>
            </Card>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#e02e2e',
    },
    loadingText: {
        marginTop: 10,
        color: '#555',
    },
    card: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'rgb(224, 46, 46)',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default DonationDetails;
