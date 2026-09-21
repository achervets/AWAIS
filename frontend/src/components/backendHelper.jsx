import { apiUrl } from '@/config/api';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Something went wrong');
  }
  return data;
}

export const authService = {
  async register(userData, registrationKey) {
    const response = await fetch(apiUrl('/auth/register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(registrationKey ? { 'X-Registration-Key': registrationKey } : {}),
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  async login(credentials) {
    const response = await fetch(apiUrl('/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  }
};
