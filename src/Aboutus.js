import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the back arrow icon

const AboutUs = () => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const navigate = useNavigate(); // Initialize navigate for navigation

    const photos = [
        '/photo1.jpg',
        '/photo2.jpg',
        '/photo3.jpg',
        '/photo4.jpg',
        '/photo5.jpg',
        '/photo6.jpg',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % (photos.length)); // Loop through photos
        }, 5000); // Change photo every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const handlePrevious = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1)); // Adjust for the viewer
    };

    const handleNext = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1)); // Adjust for the viewer
    };

    const handleGoBack = () => {
        navigate('/'); // Navigate back to the homepage
    };

    return (
        <div className='about-page'>
            <style jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .about-page {
                    background-color: #f4f4f4;
                    color: #333;
                    line-height: 1.6;
                    padding: 20px;
                    position: relative; /* For positioning the back icon */
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .back-icon {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    cursor: pointer;
                    font-size: 24px; /* Adjust size as needed */
                    color: rgb(255, 255, 255); /* Icon color */
                    background-color: #0f9499; /* Background color */
                    padding: 10px; /* Add padding for a larger clickable area */
                    border-radius: 50%; /* Make the background circular */
                    transition: transform 0.2s, background-color 0.3s; /* Transition for hover effects */
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Add shadow for depth */
                }

                .back-icon:hover {
                    transform: scale(1.1);
                    background-color: #066b6e; /* Darken background on hover */
                }
                .about-title {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .about-title h1 {
                    font-size: 48px;
                    font-weight: bold;
                    color: #0f9499;
                }

                .about-section {
                    margin-bottom: 40px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap; 
                }

                .about-section.left {
                    flex: 1;
                    padding-right: 20px;
                }

                .about-section.right {
                    flex: 1;
                    text-align: center;
                }

                .about-section h2 {
                    font-size: 32px;
                    font-weight: bold;
                    color: #066b6e;
                    margin-bottom: 20px;
                }

                .about-section p {
                    font-size: 18px;
                    margin-bottom: 20px;
                }

                .animated-image {
                    width: 200px;
                    height: auto;
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .team {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }

                .team-member {
                    width: 30%;
                    margin-bottom: 30px;
                    text-align: center;
                }

                .team-member img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    margin-bottom: 15px;
                }

                .team-member h3 {
                    font-size: 24px;
                    color: #0f9499;
                }

                .team-member p {
                    font-size: 16px;
                    color: #666;
                }

                .photo-viewer {
                    position: relative;
                    max-width: 300px; /* Smaller size */
                    margin: auto;
                    overflow: hidden;
                    border: 2px solid #ddd;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                }

                .photos {
                    display: flex;
                    width: 100%;
                    transition: transform 0.3s ease-in-out;
                }

                .photo-viewer img {
                    width: 100%;
                    height: auto;
                    display: block;
                    flex: 1 1 30%; /* Adjusted for smaller images */
                    margin: 0 1%;
                }

                .selector {
                    background-color: rgba(0, 0, 0, 0.5);
                    color: white;
                    padding: 10px;
                    cursor: pointer;
                    border: none;
                    border-radius: 50%;
                    z-index: 1;
                }

                .selector.left {
                    position: absolute;
                    left: 10px;
                }

                .selector.right {
                    position: absolute;
                    right: 10px;
                }

                .selector:hover {
                    background-color: rgba(0, 0, 0, 0.8);
                }

                .footer {
                    background-color: #333;
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                    margin-top: 40px;
                }

                .footer p {
                    margin: 0;
                    font-size: 16px;
                }

                @media (max-width: 768px) {
                    .about-title h1 {
                        font-size: 32px;
                    }

                    .about-section {
                        flex-direction: column;
                        text-align: center;
                    }

                    .about-section.left {
                        padding-right: 0;
                    }

                    .about-section.right {
                        margin-top: 20px;
                    }

                    .team-member {
                        width: 45%;
                    }
                }

                @media (max-width: 480px) {
                    .about-title h1 {
                        font-size: 24px;
                    }

                    .about-section h2 {
                        font-size: 24px;
                    }

                    .about-section p {
                        font-size: 16px;
                    }

                    .team-member {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="container">
                <FontAwesomeIcon 
                    icon={faArrowLeft} 
                    className="back-icon" 
                    onClick={handleGoBack} 
                />

                <header className="about-title">
                    <h1>Hospital Management System with Chatbot</h1>
                </header>

                <section className="about-section">
                    <div className="left">
                        <h2>Our Mission</h2>
                        <p>At our Hospital Management System, our mission is to revolutionize the management of healthcare facilities by providing an innovative and efficient platform for managing patients, staff, and appointments. We aim to improve the overall quality of care and enhance the patient experience.</p>
                    </div>
                    <div className="right">
                        <img src="/mission.png" alt="Our mission" className="animated-image" />
                    </div>
                </section>

                <section className="about-section">
                    <div className="left">
                        <h2>Our Values</h2>
                        <p>Our core values are centered around compassion, integrity, and excellence. We are committed to fostering a culture of continuous improvement and innovation, ensuring that our solutions meet the highest standards of quality and reliability.</p>
                    </div>
                    <div className="right">
                        <img src="/values.png" alt="Our values" className="animated-image" />
                    </div>
                </section>

                <section className="about-section">
                    <div className="left">
                        <h2>Our Services</h2>
                        <p>We offer a comprehensive suite of services designed to streamline hospital operations and improve patient outcomes. Our platform includes features such as appointment scheduling, patient record management, staff coordination, and real-time analytics.</p>
                    </div>
                    <div className="right">
                        <img src="/services.png" alt="Our services" className="animated-image" />
                    </div>
                </section>

                <section className="about-section">
                    <h2>Gallery</h2>
                    <div className="photo-viewer">
                        <button className="selector left" onClick={handlePrevious}>‹</button>
                        <div className="photos">
                            <img src={photos[currentPhotoIndex]} alt={`Gallery photo ${currentPhotoIndex + 1}`} />
                        </div>
                        <button className="selector right" onClick={handleNext}>›</button>
                    </div>
                </section>

                <section className="about-section team">
                    <h2>Meet Our Team</h2>
                    <div className="team">
                        <div className="team-member">
                            <img src="abreham.jpg" alt="Abreham yetwale" />
                            <h3>Abreham yetwale</h3>
                            <p>General Doctor & Co-founder</p>
                        </div>
                        <div className="team-member">
                            <img src="teddy.jpg" alt="Tewodross Misganaw" />
                            <h3>Tewodross Misganaw</h3>
                            <p>Chief Medical Officer</p>
                        </div>
                        <div className="team-member">
                            <img src="eyob.jpg" alt="Eyob Zeleke" />
                            <h3>Eyob Zeleke</h3>
                            <p>Head of Technology</p>
                        </div>
                    </div>
                </section>

            </div>

            <footer className="footer">
                <p>© 2025 Healthcare Management System with Chatbot. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUs;