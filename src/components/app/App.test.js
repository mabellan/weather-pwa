import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../api/fetchWeather', () => ({
  fetchWeather: jest.fn(() => Promise.resolve({
    name: 'Barcelona',
    sys: { country: 'ES' },
    main: { temp: 20 },
    weather: [{ icon: '01d', description: 'clear sky' }]
  }))
}));

describe('App component', () => {
  it('renders the app', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    expect(getByText('Weather App')).toBeInTheDocument();
    expect(getByPlaceholderText('Search a city...')).toBeInTheDocument();
  });
});
