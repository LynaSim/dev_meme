import { useEffect, useState } from 'react';
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
      {memes.map(meme => (
        <div key={meme.id}>
          <img src={meme.url} alt="Meme" />
          <p><strong>By:</strong> {meme.User?.username || 'Anonymous'}</p>
          <p>"{meme.text0} {meme.text1}"</p>
        </div>
      ))}
    </div>
  );
}

export default AllMemes;