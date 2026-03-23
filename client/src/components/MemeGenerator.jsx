import '../style.css';
import { useState } from 'react';
import axios from 'axios';
import api from '../api';
import memes from '../assets/memes.json';
// const apiUrl = import.meta.env.VITE_API_URL || "";

function MemeGenerator() {

  const [selectedMeme, setSelectedMeme] = useState(memes[0]);

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    selectedUrl: memes[0]?.url || "",
    templateId: memes[0]?.id || ""
  });


  const [finalMeme, setFinalMeme] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  const onPreviewMeme = (selectedUrl) => {
    setMeme({
      ...meme,
      selectedUrl: selectedUrl
    });
  };

  const handleCreateMeme = async () => {
    // Grab token
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
      // Changed this because we are using axios and not fetch()
      // try { const response = await fetch("http://localhost:3001/api/memes", {

      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     template_id: meme.templateId,
      //     text0: meme.topText,
      //     text1: meme.bottomText
      //   })
      // });

    try {  
      // Changed this because we are using axios and not fetch()
      // Note re:deployment - if universal url required: const response = await fetch(`${apiUrl}/api/memes`

      const response = await api.post("/api/memes", {
        template_id: meme.templateId,
        text0: meme.topText,
        text1: meme.bottomText
      });

      // const result = await response.json();
      const result = response.data;
      console.log("Success!", result);

      if (result.success) {
        setMeme(prevMeme => ({
          ...prevMeme,
          selectedUrl: result.data.url
        }));
      } else {
        alert("Error: " + result.error_message);
      }
    } catch (err) {
      console.error("Frontend Fetch Error:", err);
    }
  };


  return (
    <section id="center">
      <h1>Meme Generator</h1>

      <div className = "dev-meme-layout">
      <div className = "meme-gallery">
        {memes.map((m) => (
            <img 
            key = {m.id} 
            src={m.url} 
            className={selectedMeme.id === m.id ? 'active-thumb' : 'thumb'}
            onClick={() => { setSelectedMeme(m);
              setMeme(prev => ({ 
            ...prev, 
            templateId: m.id,
            selectedUrl: m.url
            }));
            }}
            alt={m.name} />
        ))}
      </div>

      {/* <select id="meme-select" onChange={onPreviewMeme} value={meme.selectedUrl}>
        {memes.map((m) => (
          //<option key={m.id} value={m.url}>{m.name}</option>
          <img src={m.id} alt="Meme Preview" />
        ))}

      </select> */}
      <div className = "meme-main-content">
      <div id="meme-preview">
        <img id="meme-image" src={meme.selectedUrl || selectedMeme.url} alt="Current Meme" />
      </div>

      <div className='meme-form'>
        <input
          type="text"
          placeholder='Top text'
          name='topText'
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder='Bottom text'
          name='bottomText'
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={handleCreateMeme}>Create Meme</button>
      </div>
      </div>
      </div>
    </section>
  );
}

export default MemeGenerator;