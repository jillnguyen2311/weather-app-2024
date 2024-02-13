import axios from 'axios';

const API_KEY = 'de0c98b5e615ad95e73ad35189f3c197';
const API_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

export const getCoordinatesFromLocation = async (location: string, limit: number = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/direct?q=${encodeURIComponent(location)}&limit=${limit}&appid=${API_KEY}`);
    console.log('Coordinates Response:', response.data);
    const data = response.data[0];
    if (data) {
      const { lat, lon } = data;
      return { latitude: lat, longitude: lon };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

export const getCurrentWeatherData = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log('Current Weather Response:', response.data);

    const temperatureCelsius = (response.data.main.temp - 273.15).toFixed(1);
    response.data.main.temp = parseFloat(temperatureCelsius);

    return response.data;
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    throw error;
  }
};

export const getForecastData = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log('Forecast Response:', response.data);

    response.data.list.forEach((item: any) => {
      item.main.temp = parseFloat((item.main.temp - 273.15).toFixed(1));
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
