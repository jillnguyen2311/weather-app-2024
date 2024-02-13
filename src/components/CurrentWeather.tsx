interface CurrentWeatherProps {
    data: {
      temperature: number;
      weather: string;
      windSpeed: number;
    };
  }
  
  const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
    return (
      <div>
        <h2>Current Weather</h2>
        <p>Temperature: {data.temperature}°C</p>
        <p>Weather: {data.weather}</p>
        <p>Wind Speed: {data.windSpeed} m/s</p>
      </div>
    );
  };
  
  export default CurrentWeather;
  