import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


function Welcome() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    api.get('/api/memes')
      .then(res => setMemes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container my-5 text-white">
      <div className="row welcome bg-dark p-3 rounded-3 border border-info mb-5 text-center">
      <p className="text-white fs-3 fw-bolder">Why wait for the perfect meme to find you? Turn those inside jokes into internet gold in seconds. Powered by the classics, fueled by your chaos.</p>
      <p className="text-white fs-3 fw-bolder"><Link to="/Signup" className="nav-link text-light rounded-3 mx-3">Register Now</Link> to access our full library of developer-grade templates.</p>
      </div>

    <div className="row g-5">
    {memes.map(meme => (

          <div key={meme.id} className="card col-12 col-md-6 col-lg-4 bg-dark">
            <img src={meme.url} className="card-img-top img-fluid" alt="Meme"/>
              <div className="card-body">
                <p className="card-text text-info"> by: <span className="badge text-bg-warning">{meme.user.username || 'Anonymous'}</span><br/>on <span className="date">{new Date(meme.createdOn).toLocaleDateString()}</span></p>
              </div>
          </div>
      ))}
    </div>
         {/* <div className="container my-5 px-5 text-white">
    <div className="row g-5">
    {memes.map(meme => (

          <div key={meme.id} className="card col-12 col-md-6 col-lg-4 bg-dark">
            <img src={meme.url} className="card-img-top img-fluid" alt="Meme"/>
              <div class="card-body">
                <p class="card-text text-white"> Created by: {meme.user.username || 'Anonymous'} on {new Date(meme.createdOn).toLocaleDateString()}</p>
              </div>
          </div>
      ))}
    </div>
    </div> */}
    </div>
  );
}

export default Welcome;