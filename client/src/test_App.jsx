import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import MemeGenerator from './components/MemeGenerator';

import { SessionProvider } from './contexts/SessionContext';

const App = () => {
  return (
    <div>
      <MemeGenerator />
    </div>
  );
};

export default App;
