import React, { useState, useEffect } from 'react';
import { BsFillBrightnessHighFill } from 'react-icons/bs';
import { FaMicrophone } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./ai.css";

const ImageAi = () => {

    const [text, setText] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [loading, setLoading] = useState(false); // State for loading effect
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    let [theme, setTheme] = useState('light-theme');

    let ToggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const darkModeIconColor = theme === 'dark' ? 'red' : 'black';

    let Startlistening = () => {
        SpeechRecognition.startListening()
    }
    const handleTextChange = (e) => {
        setText(e.target.value || transcript || (e.target.value && transcript));
        resetTranscript()
    
    };

    const generateImage = () => {
        if (!text && !transcript) {
            alert('Please enter a prompt to generate an image.');
            return;
        }
        const apiEndpoint = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";

        setLoading(true);

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({ inputs: text || transcript }),
        })
            .then((res) => res.blob())
            .then((blob) => {
                const imageUrl = window.URL.createObjectURL(blob);
                setImageSrc(imageUrl);
                setLoading(false); // Hide loading effect
            })
            .catch((error) => {
                console.error('Error generating image:', error);
                setLoading(false); // Hide loading effect in case of error
            });
    };
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = "generated_image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
        <>
            <div className='container'>
                <div className='row py-3'>
                    <div className='col-lg-12 col-sm-12 d-flex justify-content-between gap-5'>
                        <div>
                            <p className='logo'>ARTIFICIAL</p>
                        </div>
                        <div className='logo'>
                            Home
                        </div>
                        <div>
                            Enable Dark Mode <span className='logo'
                                onClick={() => ToggleTheme()}
                                style={{ color: darkModeIconColor }}><BsFillBrightnessHighFill /></span>
                        </div>
                    </div>
                </div>
                <div className='row ' >
                    <div className='col-lg-12 col-sm-12 '>
                        <div className='d-flex gap-2 justify-content-center flex-wrap '>
                            <div className='search' style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    placeholder='Enter your Prompt'
                                    className="form-control"
                                    value={text || transcript}
                                    onChange={handleTextChange}
                                /> <span className='mic' onClick={(Startlistening)}> <FaMicrophone /></span>
                            </div>
                            <button className='button' onClick={generateImage}>Generate Image</button>
                        </div>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-lg-12 col-sm-12 d-flex flex-column justify-content-center'>
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "50vh" }}>
                                <div className="loading">Generating image...</div>
                            </div>
                        ) : imageSrc ? (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={imageSrc} alt="Generated" className='imgBox border' style={{ display: imageSrc ? 'block' : 'none' }} />
                                <div className='mt-3' style={{ display: imageSrc ? 'block' : 'none' }}>
                                    <button className='button' onClick={(handleDownload)}>Download</button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageAi;
