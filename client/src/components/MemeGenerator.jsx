//import './App.css'

import memes from '../assets/memes.json'

function MemeGenerator() {

  const onPreviewMeme = (event) => {
    const memeUrl = event.target.value
    const memeImage = document.getElementById('meme-image')
    console.log(memeUrl, memeImage)
    memeImage.src = memeUrl
  }
  
  return (
    <>
      <section id="center">
        <h1>Get a random meme</h1>

        <select id="meme-select" onChange={onPreviewMeme}>
          {memes.map((meme) => (
            <option key={meme.id} value={meme.url}>{meme.name}</option>
          ))}
        </select>

          <div id="meme-preview">
            <img id="meme-image" src="" alt="Meme Preview" />
          </div>
        
      </section>
    </>
  )
}

export default MemeGenerator