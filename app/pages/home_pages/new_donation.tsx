import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, RadioButton, Switch, Text, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { Calendar, Clock, MapPin, MessageSquare, AlertTriangle } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

function NewDonationForm({ navigation }) {
  const theme = useTheme();
  const [foodType, setFoodType] = useState('perishable');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [comments, setComments] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Obtener el ID del usuario
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
        } else {
          setUserId('No user ID found');
        }
      } catch (error) {
        console.error('Error retrieving user ID:', error);
        setUserId('Error retrieving ID');
      }
    };

    fetchUserId();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShowDatePicker(false);
    setExpirationDate(currentDate);
  };

  // Función para reproducir sonido
  const playSound = async () => {
     const { sound } = await Audio.Sound.createAsync(require('./sounds/pop.mp3'));  
     await sound.playAsync();
  };

  const handleSubmit = async () => {
    const donationData = {
      donor: userId, // ID del donante
      type: foodType,
      quantity: quantity ? quantity : null,
      unit: unit ? unit : null,
      expirationDate: foodType === 'perishable' ? (expirationDate ? expirationDate.toISOString() : null) : null,
      location: location ? location : null,
      availableTimes: availableTimes ? availableTimes : null,
      comments: comments ? comments : null,
      urgent,
    };

    console.log('Datos de donación a enviar:', donationData);

    setLoading(true);

    try {
      const response = await fetch('http://192.168.100.161:5000/api/donations/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Donación enviada exitosamente', data);
        await playSound(); // Reproducir sonido al enviar
        navigation.navigate('DonationConfirmation');
      } else {
        console.error('Error en la respuesta:', data);
        Alert.alert('Error', data.message || 'Error al enviar la donación');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };
  
  const color = '#e02e2e';

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Nueva Donación</Title>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Tipo de Alimento</Title>
          <RadioButton.Group onValueChange={value => setFoodType(value)} value={foodType}>
            <View style={styles.radioGroup}>
              <RadioButton.Item label="Perecedero" value="perishable" color='#e02e2e'/>
              <RadioButton.Item label="No Perecedero" value="non-perishable" color='#e02e2e' />
            </View>
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Cantidad</Title>
          <View style={styles.quantityContainer}>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Cantidad de alimentos"
              placeholderTextColor={'#887878'}
              activeUnderlineColor='#FFC300'
            />
            <RadioButton.Group onValueChange={value => setUnit(value)} value={unit}>
              <View style={styles.unitGroup}>
                <RadioButton.Item label="unidades" value="units" color='#e02e2e' />
                <RadioButton.Item label="kg" value="kg" color='#e02e2e' />
                <RadioButton.Item label="ton" value="ton" color='#e02e2e' />
              </View>
            </RadioButton.Group>
          </View>
        </Card.Content>
      </Card>

      {foodType === 'perishable' && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Fecha de Caducidad</Title>
            <Button 
              icon={() => <Calendar color={color} />}
              onPress={() => setShowDatePicker(true)}
              textColor='black'
            >
              {expirationDate.toLocaleDateString()}
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={expirationDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Title>Ubicación de la Donación</Title>
          <TextInput
            left={<TextInput.Icon icon={() => <MapPin color={'#e02e2e'} />} />}
            value={location}
            onChangeText={setLocation}
            placeholder="Dirección para recoger los alimentos"
            placeholderTextColor={'#887878'}
            style={{ backgroundColor: 'white' }}
            activeUnderlineColor='#FFC300'
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Horarios Disponibles</Title>
          <TextInput
            left={<TextInput.Icon icon={() => <Clock color={color} />} />}
            value={availableTimes}
            onChangeText={setAvailableTimes}
            placeholder="Ej: Lunes a Viernes, 9AM - 5PM"
            placeholderTextColor={'#887878'}
            style={{ backgroundColor: 'white' }}
            activeUnderlineColor='#FFC300'
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Comentarios Adicionales</Title>
          <TextInput
            left={<TextInput.Icon icon={() => <MessageSquare color={color} />} />}
            value={comments}
            onChangeText={setComments}
            multiline
            numberOfLines={10}
            activeUnderlineColor='#FFC300'
            placeholder='Información adicional'
            placeholderTextColor={'#887878'}
            style={{ backgroundColor: 'white' }}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Urgencia</Title>
          <View style={styles.switchContainer}>
            <Text>¿Es una donación urgente?</Text>
            <Switch value={urgent} onValueChange={setUrgent} color='#e02e2e' />
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: '#4a4341' }]}>
        <Card.Content>
          <Title style={{ color: theme.colors.background }}>Sugerencia de Donación</Title>
          <Paragraph style={{ color: theme.colors.background }}>
            En este momento, los alimentos más necesarios son:
            Arroz, frijoles, aceite y leche en polvo.
          </Paragraph>
        </Card.Content>
      </Card>

      <Button 
        mode="contained" 
        style={styles.submitButton}
        icon={() => <AlertTriangle color={theme.colors.background} />}
        onPress={() => handleSubmit()}
        disabled={loading} // Desactiva el botón mientras se envía
      >
        {loading ? 'Enviando...' : 'Enviar Donación'}
      </Button>

      <View style={styles.userIdContainer}>
        <Text>User ID: {userId ? String(userId) : 'No ID available'}</Text>
      </View>
    </ScrollView>
  );
}

export default NewDonationForm;

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
    margin: 9,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityInput: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  unitGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 32,
    backgroundColor: '#e02e2e',
  },
  userIdContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});