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
    <section className="container my-5 px-5 text-white">
      <h1>{username}'s Saved Memes</h1>
      <hr />

    <div className="row g-5">
    {userMemes.map(meme => (

          <div key={meme.id} className="card col-12 col-md-6 col-lg-4 bg-dark">
            <img src={meme.url} className="card-img-top img-fluid" alt="Meme"/>
              <div className="card-body">
                <p className="card-text text-info"> by: <span className="badge text-bg-warning">{meme.user.username || 'Anonymous'}</span><br/>on <span className="date">{new Date(meme.createdOn).toLocaleDateString()}</span></p>
              </div>
          </div>
      ))}
    </div>
      {/* <div>
        {userMemes.map((meme) => (
          // Need the id for implementing deletion later
          <div key={meme.id || meme._id}> 
            <img src={meme.url} alt="meme" />
          </div>
        ))}
      </div> */}
    </section>
  );
}

export default Profile;