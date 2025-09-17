// frontend/src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ThemeToggle from '../components/theme/ThemeToggle';
import { UserCreate } from '../types';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Mock register—real: api.post('/auth/register', {email, password}).then(() => login({email, password}))
      await login({ email, password } as UserCreate);  // Direct login after for demo
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed—email taken?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Register</h1>
        <ThemeToggle />
      </header>
      <main className="max-w-md mx-auto">
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Have account? <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">Login</button>
        </p>
      </main>
    </div>
  );
};

export default Register;