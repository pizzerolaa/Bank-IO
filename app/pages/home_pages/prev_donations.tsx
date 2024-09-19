import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Button, Title } from "react-native-paper";

function PrevDonations({ navigation }) {

    const donationInfo = [
        { title: 'Donación 1', date: '01/01/2021', ubi: 'CABA', amount: '10kg', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam'},
        { title: 'Donación 2', date: '01/02/2021', ubi: 'CABA', amount: '20kg', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam' },
        { title: 'Donación 3', date: '01/03/2021', ubi: 'CABA', amount: '30kg', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam' },
        { title: 'Donación 4', date: '01/04/2021', ubi: 'CABA', amount: '40kg', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam' },
        { title: 'Donación 5', date: '01/05/2021', ubi: 'CABA', amount: '50kg', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam' },
    ];

    const [selecteDonation, setSelectedDonation] = React.useState(null);

    const toggleDonationDetails = (index) => {
        if (selecteDonation === index) {
            setSelectedDonation(null);
        } else {
            setSelectedDonation(index);
        }
    }
    
    return(
        <ScrollView style={styles.container}>
            <Title style={styles.title}>{"\n"}Donaciones Anteriores{"\n"}</Title>
                {donationInfo.map((item, index) => (
                    <View key={index} style={styles.card}>
                    <Button
                        onPress={() => toggleDonationDetails(index)}
                        mode="contained"
                        style={styles.donationButton}
                        icon="information"
                        contentStyle={styles.buttonContent}
                        labelStyle={styles.buttonLabel}
                    >
                        {item.title}
                    </Button>
                    {selecteDonation === index && (
                        <View style={styles.detailsContainer}>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>Fecha: </Text>
                            <Text style={styles.text}>{item.date}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>Ubicación: </Text>
                            <Text style={styles.text}>{item.ubi}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>Cantidad: </Text>
                            <Text style={styles.text}>{item.amount}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>Detalles: </Text>
                            <Text style={styles.text}>{item.info}</Text>
                        </Text>
                        </View>
                    )}
                    </View>
                ))}
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
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
    },
    buttonLabel: {
      fontSize: 16,
      color: '#000',
      marginLeft: 10,
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
  