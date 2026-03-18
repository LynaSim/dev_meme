import '../style.css';
import { useState } from 'react';
import axios from 'axios';
import memes from '../assets/memes.json';

function MemeGenerator() {
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

  const onPreviewMeme = (event) => {
    const memeUrl = event.target.value;
    const selectedMeme = memes.find(m => m.url === memeUrl);
    setMeme(prevMeme => ({
      ...prevMeme,
      selectedUrl: memeUrl,
      templateId: selectedMeme?.id || ""
    }));
  };

  const handleCreateMeme = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template_id: meme.templateId,
          text0: meme.topText,
          text1: meme.bottomText
        })
      });
      const result = await response.json();

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

      <select id="meme-select" onChange={onPreviewMeme} value={meme.selectedUrl}>
        {memes.map((m) => (
          <option key={m.id} value={m.url}>{m.name}</option>
        ))}
      </select>

      <div id="meme-preview">
        <img id="meme-image" src={meme.selectedUrl} alt="Meme Preview" />
      </div>

      <div className='form'>
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
    </section>
  );
}

export default MemeGenerator;