import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-background.jpg';
import { useSession } from '../contexts/SessionContext';
import '../style.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const { user } = useSession();

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
    <header className = "main-header shadow d-flex align-items-end" style={{ backgroundImage: `url(${logo})`}}>
      <nav class = "navbar navbar-expand-lg navbar-dark bg-dark flex-fill">
        <div className = "container-fluid">
          <ul className = "nav nav-pills">
            <li className = "nav-item">
            <Link className="nav-link text-light mx-3" to="/">All Memes</Link>
            </li>
            {token ? (
              <>
              <li className = "nav-item">
                <Link className="nav-link text-light mx-3" to="/profile">{wordCase(user.username)}'s Memes</Link>
              </li>
              <li className = "nav-item">
                <Link className="nav-link text-light mx-3" to="/memes">Meme Generator</Link>
              </li>
              <li className = "nav-item">
                <button className = "nav-link text-light mx-3" onClick={handleLogout}>Logout</button>
              </li>
              </>
            ) : (
              <>
                <Link className="nav-link text-light mx-3" to="/login">Login</Link>
                <Link className="nav-link text-light mx-3" to="/signup">Signup</Link>
              </>

            )}
            </ul>
          </div>
      </nav>
    </header>
  );
};

export default Header;
