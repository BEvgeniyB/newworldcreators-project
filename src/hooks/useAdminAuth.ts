import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_admin: boolean;
  telegram_id: string;
  telegram_username?: string;
  chakra_id?: number;
}

const API_URL = 'https://functions.poehali.dev/ec72bbed-cfa0-4561-8e43-5fe96626422b';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [telegramId, setTelegramId] = useState('');
  const [telegramGroupId, setTelegramGroupId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedUser = localStorage.getItem('currentUser');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (onSuccess?: () => void) => {
    if (!telegramId.trim() || !telegramGroupId.trim()) {
      setError('Введите Telegram ID и ID группы');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: telegramId.trim(),
          telegram_group_id: telegramGroupId.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        setCurrentUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('currentUser');
  };

  return {
    isAuthenticated,
    token,
    currentUser,
    telegramId,
    setTelegramId,
    telegramGroupId,
    setTelegramGroupId,
    loading,
    error,
    handleLogin,
    handleLogout,
  };
};