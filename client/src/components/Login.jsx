import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

import { useSession } from '../contexts/SessionContext';

const defaultUser = {
  email: 'example@devmeme.com',
  password: 'Letmein123!',
};

const Login = () => {
  const [email, setEmail] = useState(defaultUser.email);
  const [password, setPassword] = useState(defaultUser.password);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setUser } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/users/login', { email: email, password: password });
      const data = response.data;

    
      // Update the user in the context (temporary state)
      setUser({
        username: data.user.username,
        id: data.user.id,
      });

      // Persistent state - localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('username', data.user.username);
      navigate('/all-memes');
    } catch (error) {
      console.error('Login failed', error);
       if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
