import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../Home'; 
import LoginScreen from '../Login'; 



test('simple test', () => {
  expect(true).toBe(true);
});

test('verifica si la vista de login existe', () => {
  const navigation = { navigate: jest.fn() }; // Mock de navegación
  const { getByTestId } = render(<LoginScreen navigation={navigation} />);
  
  const loginScreen = getByTestId('login-screen');
  expect(loginScreen).toBeTruthy();


});

test('verifica si la vista de home existe', () => {
  const navigation = { navigate: jest.fn() }; // Mock de navegación
  const { getByTestId } = render(<HomeScreen navigation={navigation} />);
  
  const homeScreenElement = getByTestId('Home-screen'); // Asegúrate de que coincida
  expect(homeScreenElement).toBeTruthy();
});
