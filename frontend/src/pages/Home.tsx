// frontend/src/pages/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ThemeToggle from '../components/theme/ThemeToggle';
import WeatherCard from '../components/WeatherCard';
import api from '../services/api';
import { WeatherData } from '../types';

const Home: React.FC = () => {
  const [city, setCity] = useState('Prague');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();  // FIXED: = after from
  const navigate = useNavigate();

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get<WeatherData>(`/weather/current?city=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weather App</h1>
        <ThemeToggle />
      </header>
      <main className="max-w-md mx-auto">
        <form onSubmit={fetchWeather} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter city (e.g., Prague)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </Button>
        </form>
        {weather && <WeatherCard data={weather} />}
      </main>
    </div>
  );
};

export default Home;

export {};  // Module marker