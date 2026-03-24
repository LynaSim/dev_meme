import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSession } from '../contexts/SessionContext';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const { user } = useSession();
  // const username = localStorage.getItem('username');


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };


  const wordCase = (word) => {  
    if (word === undefined) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <header>
      <nav>
        <Link to="/">All Memes</Link>
        {token ? (
          <>
            <Link to="/profile">{wordCase(user.username)}'s Memes</Link>
            <Link to="/memes">Meme Generator</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>

        )}
      </nav>
      <img src={logo} alt="Logo" width='300'/>
    </header>
  );
};

export default Header;
