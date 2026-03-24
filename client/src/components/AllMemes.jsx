import { useEffect, useState} from 'react';
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
    <div>
      <div class="welcome">
      <p>Why wait for the perfect meme to find you? Turn those inside jokes into internet gold in seconds. Powered by the classics, fueled by your chao</p>
      <p><strong><Link to="/Signup">Register</Link> to access our full library of developer-grade templates.</strong></p>
      </div>
      {memes.map(meme => (
        <div key={meme.id}>
          <img src={meme.url} alt="Meme" />
          <p><strong>By:</strong> {meme.user.username || 'Anonymous'}</p>
          <p>"{meme.text0} {meme.text1}"</p>
        </div>
      ))}
    </div>
  );
}

export default AllMemes;