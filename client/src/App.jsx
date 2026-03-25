import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import MemeGenerator from './components/MemeGenerator';
import Profile from './components/Profile';
import AllMemes from './components/AllMemes';
import Welcome from './components/Welcome';


import { SessionProvider } from './contexts/SessionContext';

const App = () => {
  return (
    <div className="bg-dark">
      <SessionProvider>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/all-memes" element={<AllMemes />} />
        <Route path="/memes" element={<MemeGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
      </SessionProvider>
    </div>
  );
};

export default App;
