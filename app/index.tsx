import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/Login'; // Asegúrate de que la ruta es correcta
import HomePage from './pages/Home'; // Asegúrate de que la ruta es correcta
import NewDonationForm from './pages/home_pages/new_donation';
import DonationConf from './pages/home_pages/donation_confirmation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}}/>
        <Stack.Screen name="NewDonation" component={NewDonationForm} options={{headerShown: false}}/>
        <Stack.Screen name="DonationConfirmation" component={DonationConf} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
