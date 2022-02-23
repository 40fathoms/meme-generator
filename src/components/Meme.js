import React from 'react'

const Meme = () => {

    const [meme, setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(()=>{
        
        // fetch('https://api.imgflip.com/get_memes')
        //     .then(res => res.json())
        //     .then(data => setAllMemes(data.data.memes))

        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)  
        }
        getMemes()
    }, [])

    function getNewMeme() {
        const memesArray = allMemes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        setMeme(previousState => {
            return {...previousState, randomImage:memesArray[randomNumber].url}
        })
    }

    function handleChange(e){
        const {name, value} = e.target

        setMeme(previousState => ({
            ...previousState,
            [name]: value
        }))
    }

    return (
        <main>

            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="meme-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    name="bottomText" 
                    value={meme.bottomText}
                    onChange={handleChange}
                />

                <button
                    className="form-button"
                    onClick={getNewMeme}
                >
                    Get a new meme image 🖼
                </button>
            </div>

            <div className="meme">
                <img src={meme.randomImage} className="meme-image" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>

        </main>
    )
}

export default Meme