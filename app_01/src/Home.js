
import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import messages from "./messages.json";
import './App.css';
import axios from 'axios';
const UNSPLASH_ACCESS_KEY = 'Fx0aspaA1ZS8jUWJ126oMMnT7N3YP0X7UfhuVQU2i8M';
function Home() {
    const [currentMessage, setCurrentMessage] = useState("");
    const saluturi = messages.saluturi;
    useEffect(() => {

        setCurrentMessage(saluturi[Math.floor(Math.random() * saluturi.length)]);
        const intervalId = setInterval(() => {
            const newMessage = saluturi[Math.floor(Math.random() * saluturi.length)];
            setCurrentMessage(newMessage);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [saluturi]); // mesaj de salut
    const [currentQuote, setCurrentQuote] = useState("");
    const quotes = messages.quotes;
    useEffect(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        const intervalId2 = setInterval(() => {
            const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setCurrentQuote(newQuote);
        }, 30000);
        return () => clearInterval(intervalId2);
    }, [quotes]); // citate
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBackgroundImage = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: { query: 'landscape' },
                    headers: {
                        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                    },
                });
                setBackgroundImage(response.data.urls.full); // Obține URL-ul imaginii mari
            } catch (err) {
                setError("Couldn't fetch image from Unsplash.");
            }
        };

        fetchBackgroundImage();
    }, []);
    return(
        <div
            className="App "
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
                        <h1 className="fs-1">{currentMessage}</h1>
                        <p className="fs-6 fw-normal">{currentQuote}</p>
                        <a
                            className="btn btn-outline-secondary text-white mt-3"
                            href="/workspace"
                        >
                            Start Using!
                        </a>
                    </motion.div>

                </div>
            </header>
        </div>);
}

export default Home;
