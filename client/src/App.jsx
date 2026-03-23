import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import MemeGenerator from './components/MemeGenerator';
import Profile from './components/Profile';


import { SessionProvider } from './contexts/SessionContext';

const App = () => {
  return (
    <div>
      <SessionProvider>
      <Header />
      <Routes>
                <Route path="/profile" element={<Profile />} />

        <Route path="/memes" element={<MemeGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1>Not Found or Welcome</h1>} />
      </Routes>
      </SessionProvider>
    </div>
  );
};

export default App;
