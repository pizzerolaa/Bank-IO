import React from "react";
import { ScrollView, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image'
import { Card, Title, Paragraph, Button, ProgressBar, useTheme, List } from 'react-native-paper';
import { Award, Share2, TrendingUp, Gift } from 'lucide-react-native';
import { Share } from "react-native";

function SeeRewards({ navigation }) {
    const theme = useTheme();

    const rewardsData = {
        donorName: "Juan Pérez",
        donorLevel: "Donante Platino",
        totalDonations: 1500, // in kg
        certificateUrl: "https://example.com/certificate.pdf",
        nextLevelProgress: 0.75,
        nextLevelName: "Donante Diamante",
        achievements: [
        { name: "Primera Donación", description: "Realizaste tu primera donación", icon: Gift },
        { name: "Donante Frecuente", description: "Has donado por 3 meses consecutivos", icon: TrendingUp },
        { name: "Impacto Comunitario", description: "Tus donaciones han beneficiado a 5 comunidades", icon: Award },
        ],
    };

    const shareCertificate = async () => {
        try {
            await Share.share({
                title: "Certificado de Donación",
                message: `¡He alcanzado el nivel de ${rewardsData.donorLevel} en mis donaciones al Banco de Alimentos!`,
                url: rewardsData.certificateUrl
            });
        } catch (error) {
            console.error('Errror al compartir', error);
        }
    };

    const themeColor = '#e02e2e';

    return(
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Tus Recompensas y Reconocimientos</Title>

            {/* Card para nivel actual y donaciones totales */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>{rewardsData.donorName}</Title>
                    <Paragraph>{rewardsData.donorLevel}</Paragraph>
                    <View style={styles.certificateContainer}>
                        <Image source="https://picsum.photos/seed/picsum/400/300" style={styles.certificateImage} />
                    </View>
                    <Button 
                        mode="outlined"
                        icon={() => <Share2 color={themeColor} />}
                        style={styles.shareButton} 
                        onPress={shareCertificate}
                    >
                        Compartir Certificado
                    </Button>
                </Card.Content>    
            </Card> 

            {/* Card para progreso al siguiente nivel */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Progreso hacia {rewardsData.nextLevelName}</Title>
                    <ProgressBar progress={rewardsData.nextLevelProgress} color={themeColor} style={styles.progressBar} />
                    <Paragraph>
                        {`${Math.round(rewardsData.nextLevelProgress * 100)}% completado`}
                    </Paragraph>
                </Card.Content>
            </Card>

            {/* Card para logros */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Tus Logros</Title>
                    <List.Section>
                        {rewardsData.achievements.map((achievement, index) => (
                            <List.Item
                                key={index}
                                title={achievement.name}
                                description={achievement.description}
                                left={() => <achievement.icon color={themeColor} size={24} />}
                            />
                        ))}
                    </List.Section>
                </Card.Content>
            </Card>

            {/*Card estadisticas de donación*/}
            <Card style={styles.card}>
                <Card.Content>
                <Title>Estadísticas de Donación</Title>
                <Paragraph>Total de alimentos donados: {rewardsData.totalDonations} kg</Paragraph>
                <Paragraph>Nivel actual: {rewardsData.donorLevel}</Paragraph>
                <Paragraph>Siguiente nivel: {rewardsData.nextLevelName}</Paragraph>
                </Card.Content>
            </Card>

            {/*Card impacto en responsabilidad social*/}
            <Card style={styles.card}>
                <Card.Content>
                <Title>Impacto en Responsabilidad Social</Title>
                <Paragraph>
                    Tus donaciones no solo ayudan a combatir la inseguridad alimentaria, sino que también 
                    demuestran tu compromiso con la responsabilidad social. Puedes utilizar este certificado 
                    y tus logros en reportes corporativos para mostrar el impacto positivo de tu organización 
                    en la comunidad.
                </Paragraph>
                </Card.Content>
            </Card>

            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Home')}>Volver al Inicio</Button>
        </ScrollView>
    );
}

export default SeeRewards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        marginBottom: 16,
    },
    certificateContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    certificateImage: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
    },
    shareButton: {
        marginTop: 8,
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
        marginVertical: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#e02e2e',
        borderRadius: 30,
        elevation: 3,
    },
});