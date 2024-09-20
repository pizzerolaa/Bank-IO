import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '../Login'; // Ajusta la ruta según sea necesario

test('simple test', () => {
  expect(true).toBe(true);
});

test('verifica si la vista de login existe', () => {
  const navigation = { navigate: jest.fn() }; // Mock de navegación
  const { getByTestId } = render(<LoginScreen navigation={navigation} />);
  
  const loginScreen = getByTestId('login-screen');
  expect(loginScreen).toBeTruthy();


});
