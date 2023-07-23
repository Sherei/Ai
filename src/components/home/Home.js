import React, { useState, useEffect } from 'react';

import './home.css';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='container-fluid'>
        <div className='row row1' style={{ height: "500px" }}>
          <div className='col-lg-6 col-sm-12 py-5 d-flex justify-content-center align-items-center flex-column text-col'>
            <h1 className='text-center my-5'>Welcome to the <span className='dark_color'>Dark Mode</span> Site</h1>
            <button className='btn view_btn'>View All</button>
          </div>
          <div className='col-lg-6 col-sm-12 d-flex justify-content-end img-col'>
            {images.map((image, index) => (
              <img
                key={index}
                className={`slide-image ${index === currentIndex ? 'active' : ''}`}
                src={image}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
