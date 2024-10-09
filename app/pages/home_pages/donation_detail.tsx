import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const DonationDetails = ({ route }) => {
    const { barcode: donationId } = route.params;
    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonationDetails = async () => {
            try {
                const response = await fetch(`http://10.43.57.90:5001/api/donations/${donationId}`);
                const result = await response.json();
                console.log('Donation details:', result); // Verifica la estructura del resultado
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
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando detalles de la donación...</Text>
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
            <Text>Donante: {donation.donor?.name} {donation.donor?.lastName}</Text>
            <Text>Tipo: {donation.type}</Text>
            <Text>Cantidad: {donation.quantity} {donation.unit}</Text>
            <Text>Fecha de expiración: {donation.expirationDate || 'No disponible'}</Text>
            <Text>Ubicación: {donation.location}</Text>
            <Text>Horarios disponibles: {donation.availableTimes}</Text>
            <Text>Comentarios: {donation.comments || 'Sin comentarios'}</Text>
            <Text>¿Es urgente?: {donation.urgent ? 'Sí' : 'No'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default DonationDetails;
