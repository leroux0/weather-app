// frontend/src/components/WeatherCard.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeatherData } from '../types';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  // Mock trends for chart (real: fetch 5-day forecast)
  const trendData = [
    { name: 'Now', temp: data.temp },
    { name: '1h', temp: data.temp - 1 },
    { name: '2h', temp: data.temp - 0.5 },
    { name: '3h', temp: data.temp + 1 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Weather</h2>
      <p className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">{data.temp}°C</p>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Feels like {data.feels_like}°C</p>
      <p className="text-md text-gray-600 dark:text-gray-400 mb-4 capitalize">{data.description}</p>
      {data.humidity && <p className="text-sm text-gray-500 dark:text-gray-500">Humidity: {data.humidity}%</p>}
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherCard;

export {};  // Module marker