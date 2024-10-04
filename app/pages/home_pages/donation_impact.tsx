import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph, useTheme, DataTable } from 'react-native-paper';
import { Users, MapPin, TrendingUp } from 'lucide-react-native';
import { PieChart } from 'react-native-svg-charts';


function DonationImpact({ navigation }) {
    const impactData = {
        totalBeneficiaries: 1250,
        communitiesReached: 5,
        totalDonations: 500, // in kg
        communityDistribution: [
        { name: 'Comunidad A', value: 30, color: '#FF5733' },
        { name: 'Comunidad B', value: 25, color: '#33FF57' },
        { name: 'Comunidad C', value: 20, color: '#3357FF' },
        { name: 'Comunidad D', value: 15, color: '#FF33E9' },
        { name: 'Comunidad E', value: 10, color: '#33FFF6' },
        ],
    };

    const pieData = impactData.communityDistribution.map((item) => ({
        value: item.value,
        svg: { fill: item.color },
        key: item.name,
    }));

    const themeColor = '#e02e2e'; 

    const Legend = ({ data }) => (
        <View style={styles.legendContainer}>
            {data.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                    <Paragraph style={styles.legendText}>{item.name}</Paragraph>
                </View>
            ))}
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Impacto de tus donaciones</Title>

            {/* Card para beneficiados totales */}
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.statRow}>
                        <Users color={themeColor} size={24} />
                        <View style={styles.statText}>
                            <Title>{impactData.totalBeneficiaries}</Title>
                            <Paragraph>Personas Beneficiadas</Paragraph>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            {/* Card para comunidades alcanzadas*/}
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.statRow}>
                        <MapPin color={themeColor} size={24} />
                        <View style={styles.statText}>
                            <Title>{impactData.communitiesReached}</Title>
                            <Paragraph>Comunidades Alcanzadas</Paragraph>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            {/* Card para total de alimentos donados*/}
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.statRow}>
                        <TrendingUp color={themeColor} size={24} />
                        <View style={styles.statText}>
                            <Title>{impactData.totalDonations}</Title>
                            <Paragraph>Total de Alimentos Donados (en kg)</Paragraph>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            {/* Card para grafica de comunidades*/}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Distribución de Donaciones por Comunidad</Title>
                    <View style={styles.chartContainer}>
                        <PieChart
                            style={styles.chart}
                            data={pieData}
                            innerRadius="50%"
                            outerRadius="80%"
                        />
                    </View>
                    <Legend data={impactData.communityDistribution} />
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Comunidad</DataTable.Title>
                            <DataTable.Title numeric>Porcentaje</DataTable.Title>
                        </DataTable.Header>
                        {impactData.communityDistribution.map((item, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.value}%</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </Card.Content>
            </Card>

            {/* Card agradecimiento donaciones */}
            <Card style={styles.card}>
                <Card.Content>
                <Title>Tu Impacto</Title>
                <Paragraph>
                    Gracias a tus donaciones, has ayudado a combatir la inseguridad alimentaria en {impactData.communitiesReached} comunidades diferentes. 
                    Tus contribuciones han proporcionado alimentos nutritivos a {impactData.totalBeneficiaries} personas necesitadas, 
                    marcando una diferencia significativa en sus vidas. Cada kilogramo de alimento que donas 
                    se traduce en esperanza y bienestar para estas comunidades. ¡Sigue haciendo la diferencia!
                </Paragraph>
                </Card.Content>
            </Card>

        </ScrollView>
    );
}

export default DonationImpact;

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
    statRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statText: {
      marginLeft: 16,
    },
    chartContainer: {
        height: 200,
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chart: {
        height: 200,
        width: Dimensions.get('window').width - 64,
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 8,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 4,
    },
    legendText: {
    },
  });