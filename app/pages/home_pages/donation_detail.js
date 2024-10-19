// DonationDetails.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import DonationDetails from './DonationDetails'; // Importa tu componente
import { fetchDonationDetails } from './api'; // Importa tu función de API
import * as MediaLibrary from 'expo-media-library';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('./api'); // Simular la API
jest.mock('expo-media-library'); // Simular la biblioteca de medios

describe('DonationDetails', () => {
    // Para evitar errores relacionados con la navegación
    const renderWithNavigation = (component) => {
        return render(<NavigationContainer>{component}</NavigationContainer>);
    };

    it('should display loading indicator initially', () => {
        fetchDonationDetails.mockResolvedValueOnce(null); // Simular respuesta de API

        renderWithNavigation(<DonationDetails route={{ params: { barcode: '123' } }} />);

        expect(screen.getByText('Cargando detalles de la donación...')).toBeTruthy();
    });

    it('should display donation details when fetched successfully', async () => {
        const mockDonation = {
            donor: { name: 'Juan', lastName: 'Pérez', rfc: 'RFC123' },
            comments: 'Alimentos',
            type: true,
            quantity: 10,
            unit: 'kg',
            expirationDate: '2024-12-31',
            location: 'Centro de Acopio',
            availableTimes: '9 AM - 5 PM',
            urgent: false,
        };

        fetchDonationDetails.mockResolvedValueOnce(mockDonation); // Simular respuesta de API

        renderWithNavigation(<DonationDetails route={{ params: { barcode: '123' } }} />);

        await waitFor(() => {
            expect(screen.getByText('Detalles de la Donación')).toBeTruthy();
            expect(screen.getByText('Donante')).toBeTruthy();
            expect(screen.getByText('Juan Pérez')).toBeTruthy();
            expect(screen.getByText('Alimento: Alimentos')).toBeTruthy();
        });
    });

    it('should display no data message when donation details are not found', async () => {
        fetchDonationDetails.mockResolvedValueOnce(null); // Simular respuesta de API

        renderWithNavigation(<DonationDetails route={{ params: { barcode: '123' } }} />);

        await waitFor(() => {
            expect(screen.getByText('No se encontraron detalles para esta donación')).toBeTruthy();
        });
    });

    it('should save QR code to gallery when button is pressed', async () => {
        MediaLibrary.saveToLibraryAsync.mockResolvedValueOnce(true); // Simular que se guarda correctamente

        renderWithNavigation(<DonationDetails route={{ params: { barcode: '123' } }} />);

        fireEvent.press(screen.getByText('Guardar Código QR')); // Simular clic en el botón

        await waitFor(() => {
            expect(MediaLibrary.saveToLibraryAsync).toHaveBeenCalled(); // Verificar que se llamó a la función de guardado
            expect(screen.getByText('Código QR guardado exitosamente!')).toBeTruthy(); // Verificar mensaje de éxito
        });
    });

    it('should navigate to home screen when back button is pressed', () => {
        const navigation = { navigate: jest.fn() }; // Simular la navegación

        renderWithNavigation(<DonationDetails route={{ params: { barcode: '123' } }} navigation={navigation} />);

        fireEvent.press(screen.getByText('Volver al Inicio')); // Simular clic en el botón de volver

        expect(navigation.navigate).toHaveBeenCalledWith('Home'); // Verificar que la navegación se llamó con la ruta correcta
    });
});
