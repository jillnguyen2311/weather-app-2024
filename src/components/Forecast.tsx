import React from 'react';

interface ForecastProps {
  data: {
    date: string;
    temperature?: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
    windSpeed: number;
  }[];
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  return (
    <div>
      <h2>5-Day Forecast</h2>
      {data.map((forecast, index) => (
        <div key={index}>
          <p>Date: {forecast.date}</p>
          <p>Temperature: {forecast.temperature ? forecast.temperature.toFixed(1) : 'N/A'}°C</p>
          <p>Weather: {forecast.weather.main}</p>
          <p>Description: {forecast.weather.description}</p>
          <p>Wind Speed: {forecast.windSpeed} m/s</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
