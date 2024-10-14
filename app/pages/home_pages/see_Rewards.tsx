import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Animated } from "react-native";
import { Button, Card, ProgressBar } from "react-native-paper"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gift, LineChart, Trophy } from "lucide-react-native";

function SeeRewards({ navigation }) {
    const [donations, setDonations] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [rank, setRank] = useState("");
    const [progress, setProgress] = useState(0);
    const [nextRank, setNextRank] = useState("");
    const [nextGoal, setNextGoal] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(0)); // Para animaciones suaves

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const id = await AsyncStorage.getItem("userId");
                const response = await fetch(`http://192.168.100.161:5001/api/donations/getByDonor/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setDonations(data);
                    calculateTotal(data);
                } else {
                    Alert.alert('Error', data.message || 'Error al cargar las donaciones');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                Alert.alert('Error', 'Error en la solicitud de donaciones.');
            }
        };

        fetchDonations();

        // Animación de entrada suave
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const calculateTotal = (donations) => {
        const total = donations.reduce((sum, donation) => sum + donation.quantity, 0);
        setTotalQuantity(total);
        const rankData = determineRank(total);
        setRank(rankData.currentRank);
        setNextRank(rankData.nextRank);
        setNextGoal(rankData.nextGoal);
        setProgress(rankData.progress);
    };

    const determineRank = (total) => {
        if (total >= 10000) return { currentRank: "Gran Benefactor", nextRank: "Meta Alcanzada", nextGoal: 10000, progress: 1 }; // 10 toneladas, nivel máximo alcanzado
        if (total >= 5000) return { currentRank: "Embajador de Esperanza", nextRank: "Gran Benefactor", nextGoal: 10000, progress: (total - 5000) / (10000 - 5000) };
        if (total >= 1000) return { currentRank: "Héroe de la Comunidad", nextRank: "Embajador de Esperanza", nextGoal: 5000, progress: (total - 1000) / (5000 - 1000) };
        if (total >= 500) return { currentRank: "Colaborador Generoso", nextRank: "Héroe de la Comunidad", nextGoal: 1000, progress: (total - 500) / (1000 - 500) };
        if (total >= 100) return { currentRank: "Aliado Comprometido", nextRank: "Colaborador Generoso", nextGoal: 500, progress: (total - 100) / (500 - 100) };
        if (total >= 20) return { currentRank: "Iniciador Solidario", nextRank: "Aliado Comprometido", nextGoal: 100, progress: (total - 20) / (100 - 20) };
        return { currentRank: "No hay rango asignado", nextRank: "Iniciador Solidario", nextGoal: 20, progress: total / 20 };
    };

    const achievements = [
        { title: "Primera Donación", description: "Realizaste tu primera donación.", icon: Gift },
        { title: "Donante Frecuente", description: "Has donado por 3 meses consecutivos.", icon: LineChart },
        { title: "Impacto Comunitario", description: "Tus donaciones han beneficiado a 5 comunidades.", icon: Trophy },
    ];

    return (
        <Animated.ScrollView contentContainerStyle={styles.container} style={{ opacity: fadeAnim }}>
            <Text style={styles.title}>Tus Recompensas</Text>

            <Card style={styles.card}>
                <Card.Title title="Nivel Actual y Donaciones Totales" />
                <Card.Content>
                    <Text style={styles.rank}>Nivel del Donante: {rank}</Text>
                    <Text style={styles.cardText}>Cantidad de Donaciones: {totalQuantity} kg</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="Progreso hacia el Siguiente Nivel" />
                <Card.Content>
                    <Text style={styles.cardText}>Próximo Nivel: {nextRank}</Text>
                    <ProgressBar progress={progress} color="#e02e2e" style={styles.progressBar} />
                    <Text style={styles.progressText}>Progreso: {(progress * 100).toFixed(2)}% (Objetivo: {nextGoal} kg)</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="Tus Logros" />
                <Card.Content>
                    {achievements.map((achievement, index) => (
                        <View key={index} style={styles.achievementContainer}>
                            <achievement.icon size={40} style={styles.icon} />
                            <View>
                                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                            </View>
                        </View>
                    ))}
                </Card.Content>
            </Card>

            <Button
                style={styles.buttonBack}
                mode="contained"
                onPress={() => navigation.navigate("Home")}
            >
                Volver al Inicio
            </Button>
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#e02e2e",
        marginBottom: 20,
    },
    card: {
        width: "90%",
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        elevation: 3,
    },
    rank: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFC300",
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 10,
        color: "#333",
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "#e0e0e0",
        marginVertical: 10,
    },
    progressText: {
        fontSize: 14,
        color: "#888",
    },
    achievementContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
    },
    achievementTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
    },
    achievementDescription: {
        fontSize: 14,
        color: "#777",
    },
    icon: {
        marginRight: 15,
        color: "#e02e2e",
    },
    buttonBack: {
        marginTop: 20,
        backgroundColor: "#e02e2e",
        borderRadius: 20,
    },
});

export default SeeRewards;
