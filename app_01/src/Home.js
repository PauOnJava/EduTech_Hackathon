
import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import TComponent from "./tess";
import messages from "./messages.json";
import axios from "axios";
import './App.css';
const PEXELS_API_KEY = 'wefIWGWTWNpN9eSabB4s0dKbGQYYxyFdDLp5ATlHEAfPT6d9S1svyBPP';
function Home() {
    const [currentMessage, setCurrentMessage] = useState("");
    const saluturi = messages.saluturi;
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {

        setCurrentMessage(saluturi[Math.floor(Math.random() * saluturi.length)]);
        const intervalId = setInterval(() => {
            const newMessage = saluturi[Math.floor(Math.random() * saluturi.length)];
            setCurrentMessage(newMessage);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [saluturi]); // mesaj de salut
    useEffect(() => {
        const fetchBackgroundImage = async () => {
            try {
                const response = await axios.get('https://api.pexels.com/v1/search', {
                    headers: {
                        Authorization: `Bearer ${PEXELS_API_KEY}`,
                    },
                    params: {

                        per_page: 1,
                        page: Math.floor(Math.random() * 100),
                    },
                });

                if (response.data && response.data.photos.length > 0) {
                    const randomPhoto = response.data.photos[0].src.original;
                    setBackgroundImage(randomPhoto);
                } else {
                    setError("No image found.");
                }
            } catch (err) {
                console.error('API Error:', err.response || err);
                setError("Couldn't fetch image from Pexels.");
            }
        };

        fetchBackgroundImage();
    }, []);
    return(
        <div
            className="App"
            style={{
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'url(https://jimpattersonphotography.com/wordpress/wp-content/gallery/sierra-nevada/Sierra-Nevada-Mountain-Landscape-Sailor-Lake-Sunrise.jpg)', // Fallback la o imagine default
            }}
        >
            <header className="App-header">
                <div className="d-flex justify-content-center align-items-center vh-100 ">
                    <motion.div
                        initial={{opacity: 0, y: -100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 2.5, ease: "easeOut"}}
                        className="alert text-center  p-4"
                        style={{fontSize: "2rem", fontWeight: "bold", maxWidth: "600px"}}
                    >
                        <h1>{currentMessage}</h1>
                        <button
                            className="btn btn-outline-secondary text-white mt-3"

                        >
                            Start Using!
                        </button>
                    </motion.div>

                </div>
            </header>
            <div style={{padding: '20px', color: 'white'}}>
                <TComponent/>
            </div>
        </div>);
}

export default Home;
