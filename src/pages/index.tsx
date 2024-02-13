import { useState } from 'react';
import { getCoordinatesFromLocation, getCurrentWeatherData, getForecastData } from './api/weather';

const Home: React.FC = () => {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const { latitude, longitude } = await getCoordinatesFromLocation(location);
      const currentData = await getCurrentWeatherData(latitude, longitude);
      const forecast = await getForecastData(latitude, longitude);
      setCurrentWeather(currentData);
      setForecastData(forecast);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getWeatherImage = (weather: string) => {
    switch (weather) {
      case 'Clear':
        return '/clear.png';
      case 'Clouds':
        return '/clouds.png';
      case 'Rain':
        return '/rain.png';
      default:
        return '/clear.png';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-CA') + ' ' + date.toLocaleTimeString('en-CA');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className='mt-5 mb-10 bg-blue-100 p-20'>
        <h1 className="text-5xl font-bold">Weather Forecast Web App</h1>
      </header>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-4 mb-2"
        placeholder="Enter location..."
      />
      <button
        onClick={handleSearch}
        className="bg-blue-300 hover:bg-blue-500 border border-gray-600 font-bold py-2 px-4 rounded-md mb-4"
      >
        Search
      </button>
      <div className="mt-10 mb-5">
        <p className="text-2xl font-bold">Ask the weather base on your location!</p>
        <ul>
          <li className="text-xl">1. Enter a location</li>
          <li className="text-xl">2. Find out the location Current Weather & Next 5-day Weather Forecast</li>
        </ul>
      </div>
      {currentWeather && (
        <div className="rounded-lg border border-gray-400 flex items-center justify-between p-20 mb-20">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold">Current Weather</h2>
            <p className="text-xl font-bold mt-5 mb-5">Location: {currentWeather.name}, {currentWeather.sys.country}</p>
            <p className="text-lg">Last Update: {formatDate(new Date(currentWeather.dt * 1000).toString())}</p>
            <p className="text-lg">Temperature: {currentWeather.main.temp}°C</p>
            <p className="text-lg">Weather: {currentWeather.weather[0].main}</p>
            <p className="text-lg">Wind Speed: {currentWeather.wind.speed} m/s</p>
          </div>
          <div className="ml-20">
            <img src={getWeatherImage(currentWeather.weather[0].main)} alt="Weather Icon" className="h-60 w-90" />
          </div>
        </div>
      )}
      {forecastData && (
        <div className="mt-2">
          <h2 className="text-2xl font-bold">5-Day Forecast (within every 3 hour)</h2>
          {forecastData.list.map((item: any, index: number) => (
            <div key={index} className="mt-2 p-10 rounded-lg border border-gray-300 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">Date: {formatDate(item.dt_txt)}</p>
                <p className="text-lg">Temperature: {item.main.temp}°C</p>
                <p className="text-lg">Weather: {item.weather[0].main}</p>
                <p className="text-lg">Description: {item.weather[0].description}</p>
                <p className="text-lg">Wind Speed: {item.wind.speed} m/s</p>
              </div>
              <div className="ml-20">
                <img src={getWeatherImage(item.weather[0].main)} alt="Weather Icon" className="h-40 w-50" />
              </div>
            </div>
          ))}
        </div>
      )}
       <footer className="py-7 px-8 text-center text-lg">
        <p>&copy; 2024 Weather App. Created by Jill Nguyen</p>
      </footer>
    </div>
  );
};

export default Home;
