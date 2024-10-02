import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { Gift, Clock, Award, PieChart, Truck } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        const response = await fetch(`http://localhost:5001/api/users/user/${id}`); // Cambia esta línea
        const userData = await response.json();
        setUserName(userData.name); // Asegúrate de que 'name' sea la propiedad correcta
      }
    } catch (error) {
      console.error('Error retrieving user name:', error);
    }
  };

  const homeItems = [
    { title: 'Crear nueva donación', icon: Gift, description: 'Inicia una nueva donación ahora', route: 'NewDonation' },
    { title: 'Ver donaciones anteriores', icon: Clock, description: 'Revisa el historial de tus donaciones', route: 'PrevDonations' },
    { title: 'Ver recompensas', icon: Award, description: 'Descubre tus reconocimientos', route: 'SeeRewards' },
    { title: 'Consultar impacto', icon: PieChart, description: 'Mira cómo tus donaciones hacen la diferencia', route: 'DonationImpact' },
    { title: 'Seguimiento de Donación', icon: Truck, description: 'Ve el progreso de tu donación', route: 'DonationTracking' },
  ];

  return (

    <ScrollView style={styles.container}>
      <Title style={styles.title}>
        {"\n"}
        {userName ? `Bienvenido ${userName}` : 'Bienvenido!'}
        {"\n"}
      </Title>
      <View style={styles.grid}>
        {homeItems.map((item, index) => (

          <Card key={index} style={styles.card} onPress={() => navigation.navigate(item.route)}>
            <Card.Content style={styles.cardContent}>
              <item.icon color={'#e02e2e'} size={40} />
              <Title style={styles.cardTitle}>{item.title}</Title>
              <Paragraph style={styles.cardDescription}>{item.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

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
    paddingBottom: 20,
    color: 'red'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    marginBottom: 18,
    elevation: 4,
    backgroundColor: 'white',
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});
