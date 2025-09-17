// frontend/src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ThemeToggle from '../components/theme/ThemeToggle';
import { Location } from '../types';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newCity, setNewCity] = useState('');
  const [newAlerts, setNewAlerts] = useState({ rain: false, temp_threshold: 20 });
  const [loading, setLoading] = useState(false);
  const { token, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchLocations();
  }, [isAuthenticated, navigate]);

  const fetchLocations = async () => {
    try {
      const response = await api.get<Location[]>('/users/me/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Fetch locations error:', error);
    }
  };

  const addLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCity) return;
    setLoading(true);
    try {
      await api.post('/users/locations', { city: newCity, alerts: newAlerts });
      setNewCity('');
      setNewAlerts({ rain: false, temp_threshold: 20 });
      fetchLocations();
    } catch (error) {
      console.error('Add location error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendAlert = async (locationId: number, email: string) => {
    try {
      await api.post(`/users/me/locations/${locationId}/alerts`);  // Mock endpoint; real: /alerts/send
      console.log(`[ALERT] To: ${email} | Message: Alert for location ${locationId}`);  // Mock console
    } catch (error) {
      console.error('Send alert error:', error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="max-w-2xl mx-auto space-y-6">
        <form onSubmit={addLocation} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add Location</h2>
          <Input
            type="text"
            placeholder="City (e.g., Prague)"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-2 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newAlerts.rain}
                onChange={(e) => setNewAlerts({ ...newAlerts, rain: e.target.checked })}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Rain alert</span>
            </label>
            <label className="flex items-center">
              <input
                type="number"
                value={newAlerts.temp_threshold}
                onChange={(e) => setNewAlerts({ ...newAlerts, temp_threshold: Number(e.target.value) })}
                className="mr-2 w-20"
              />
              <span className="text-gray-700 dark:text-gray-300">Temp threshold</span>
            </label>
          </div>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Location'}
          </Button>
        </form>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved Locations</h2>
          {locations.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No locations yet. Add one above!</p>
          ) : (
            locations.map((loc) => (
              <div key={loc.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{loc.city}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alerts: {Object.keys(loc.alerts).join(', ')}</p>
                </div>
                <Button variant="secondary" onClick={() => sendAlert(loc.id, 'user@example.com')}>
                  Send Alert
                </Button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

export {};  // Module marker