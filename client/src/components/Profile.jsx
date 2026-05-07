// from delete-feature branch

import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import '../style.css';

function Profile() {
  const [userMemes, setUserMemes] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchMyMemes = async () => {
      try {
        const response = await api.get('/api/memes/my-memes');
        setUserMemes(response.data);
      } catch (err) {
        console.error("Failed to load user's memes:", err);
      }
    };

    fetchMyMemes();
  }, []);

  const handleDelete = async (id) => {
  try {
    await api.delete(`/api/memes/${id}`);
    
    setUserMemes((prevMemes) => 
      prevMemes.filter((meme) => String(meme.id) !== String(id))
    );
    
    console.log("Meme deleted successfully");
  } catch (error) {
    console.error(
      "Failed to delete meme:", 
      error.response?.data?.message || error.message
    );
    alert("Could not delete meme. Are you logged in?");
  }
};

  return (
    <section className="container my-5 px-5 text-white">
      <h1>{username}'s Saved Memes</h1>
      <hr />

      <div className="row g-5">
        {userMemes.map(meme => (

          <div key={meme.id} className="card col-12 col-md-6 col-lg-4 bg-dark">
            {/* <div className='text-white'>Meme ID number: {meme.id}</div> */}

            <img src={meme.url} className="card-img-top img-fluid" alt="Meme" />
            <div className="card-body">
              <p className="card-text text-info"> by: <span className="badge text-bg-warning">{meme.user.username || 'Anonymous'}</span><br />on <span className="date">{new Date(meme.createdOn).toLocaleDateString()}</span></p>
            </div>
            <button
              className="btn btn-danger mt-3 btn-sm"
              onClick={() => handleDelete(meme.id)}>Delete Meme
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Profile;