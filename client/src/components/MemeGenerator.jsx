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
    <div className='container-fluid bg-dark text-light min-vh-100 p-0'>
      
      <header className="py-3 border-bottom border-secondary text-center">
        <h1 className="h1">Generate Your Meme Here!</h1>
      </header>

      <div className="row g-0">
        <aside className="col-lg-2 col-md-3 vh-100 overflow-auto border-end border-secondary p-3 bg-dark">
          <h6 className="text-uppercase h5 mb-3">Choose a Meme Template</h6>
          <div className = "meme-gallery">
            {memes.map((m) => (
                <img 
                key = {m.id} 
                src={m.url} 
                className={`img-fluid rounded cursor-pointer ${selectedMeme.id === m.id ? 'border border-primary border-4' : 'opacity-75'}`}
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
        </aside>

        <div className="col-lg-8 col-md-7 d-flex flex-column align-items-center justify-content-center p-4">
          <div className="preview-meme bg-dark">
        
            <img id="meme-image" src={meme.selectedUrl || selectedMeme.url} className="mh-100 mw-100" alt="Current Meme" />

          </div>

          <div className='w-100 meme-form'>

            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-secondary text-white border-0"
                placeholder='Top text'
                name='topText'
                value={meme.topText}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-secondary text-white border-0"
                placeholder='Bottom text'
                name='bottomText'
                value={meme.bottomText}
                onChange={handleChange}
              />
            </div>
          <button className="btn btn-primary btn-lg w-100 fw-bold" onClick={handleCreateMeme}>Create Meme</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default MemeGenerator;