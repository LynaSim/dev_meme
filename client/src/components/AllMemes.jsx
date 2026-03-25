import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


function AllMemes() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    api.get('/api/memes')
      .then(res => setMemes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container my-5 px-5 text-white">
    <div className="row g-5">
    {memes.map(meme => (

          <div key={meme.id} className="card col-12 col-md-6 col-lg-4 bg-dark">
            <img src={meme.url} className="card-img-top img-fluid" alt="Meme"/>
              <div className="card-body">
                <p className="card-text text-info"> by: <span className="badge text-bg-warning">{meme.user.username || 'Anonymous'}</span><br/>on <span className="date">{new Date(meme.createdOn).toLocaleDateString()}</span></p>
              </div>
          </div>

          // <div key={meme.id}>
          //   <img src={meme.url} alt="Meme" className="img-fluid" />
          //   <p><strong>By:</strong> {meme.user.username || 'Anonymous'}</p>
          //   <p>"{meme.text0} {meme.text1}"</p>
          // </div>

      ))}
    </div>
    </div>
  );
}

export default AllMemes;