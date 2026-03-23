import { useEffect, useState } from 'react';
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

  return (
    <section>
      <h1>{username}'s Saved Memes</h1>
      <hr />

      <div>
        {userMemes.map((meme) => (
          // Need the id for implementing deletion later
          <div key={meme.id || meme._id}> 
            <img src={meme.url} alt="meme" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Profile;