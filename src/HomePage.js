import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faTelegram,faYoutube,
    faTiktok, faJs, faReact, faNodeJs, faPython, faHtml5, faJava, faPhp } from '@fortawesome/free-brands-svg-icons';
import { faBars, faMobileAlt, faCode, faServer, faPaintBrush, faEnvelope, faFileDownload, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';
import Notification from './Notification';
import ChatBoard from './ChatBoard';
import { AnimatedText } from './AnimatedText';
import AOS from "aos";
import "aos/dist/aos.css";

const projects = [
    {
        title: "Healthcare Management System with Chatbot",
        description: "A comprehensive system for managing hospital operations with integrated chatbot functionality.",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        image: "/logo.png",
        link: "https://testhospitalmanagment.netlify.app",
        tags: ["Full Stack", "Healthcare"]
    },
    {
        title: "Anonymous Message Board",
        description: "A secure platform for posting and viewing messages anonymously with category and spam filtering.",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        image: "/logoanonymus.png",
        link: "https://anonymousboard.netlify.app/",
        tags: ["Full Stack", "Security"]
    },
    {
        title: "Nutritional Value Management",
        description: "Mobile app for analyzing nutritional values of Wolaita traditional foods.",
        technologies: ["Java", "Android SDK", "Firebase and SQlite"],
        image: "/Nutritional Value Management of Wolaita Traditional Food.png",
        link: "https://github.com/ABREHAMonly/wolaitan-traditional-food-NV-mobile-app",
        tags: ["Mobile", "Health"]
    },
    {
        title: "Healthcare Chatbot",
        description: "AI-powered chatbot for healthcare inquiries using NLP techniques.Multi-lingual.",
        technologies: ["Python", "React.Js", "Flask", "NLTK", "TensorFlow"],
        image: "/chatbot.png",
        link: "https://github.com/ABREHAMonly/Chatbot-in-healthcare-web-based",
        tags: ["AI", "Healthcare"]
    },
    {
        title: "Lost And Found",
        description: "Mobile application for reporting and finding lost items in the community.",
        technologies: ["React Native", "Firebase", "Google Maps API"],
        image: "/LostAndFoundlogo.png",
        link: "#",
        tags: ["Mobile", "Community"]
    },
    {
        title: "Coming Soon",
        description: "New project under development - stay tuned for updates!",
        technologies: ["React", "Node.js"],
        image: "/commingsoon.png",
        link: "#",
        tags: ["Upcoming"]
    },
];

const skills = [
    { name: "JavaScript", icon: faJs, percentage: 85, category: "Frontend" },
    { name: "React", icon: faReact, percentage: 90, category: "Frontend" },
    { name: "React Native", icon: faMobileAlt, percentage: 85, category: "Mobile" },
    { name: "Node.js", icon: faNodeJs, percentage: 80, category: "Backend" },
    { name: "Python", icon: faPython, percentage: 75, category: "Backend" },
    { name: "HTML & CSS", icon: faHtml5, percentage: 95, category: "Frontend" },
    { name: "Java", icon: faJava, percentage: 70, category: "Mobile" },
    { name: "PHP", icon: faPhp, percentage: 70, category: "Backend" }
];

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });
    const [activeSkill, setActiveSkill] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        AOS.init({ 
            duration: 800,
            once: true,
            easing: 'ease-out-quart'
        });
        
        // Generate random particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const size = Math.random() * 15 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = Math.random() * 0.6 + 0.2;
        });

        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            setNotification({ message: 'All fields are required!', type: 'error', visible: true });
            return;
        }

        if (!validateEmail(formData.email)) {
            setNotification({ message: 'Please enter a valid email address!', type: 'error', visible: true });
            return;
        }

        try {
            await emailjs.send(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    to_name: "Abreham",
                    from_email: formData.email,
                    to_email: "abrehamonly@gmail.com",
                    message: formData.message
                },
                process.env.REACT_APP_PUBLIC_KEY
            );

            setNotification({ 
                message: 'Your message has been sent successfully!', 
                type: 'success', 
                visible: true 
            });
            
            setFormData({
                name: '',
                email: '',
                message: ''
            });
            
        } catch (error) {
            console.error('Error:', error);
            setNotification({ 
                message: 'Failed to send message. Please try again later.', 
                type: 'error', 
                visible: true 
            });
        }
    };

    const skillCategories = ["All", ...new Set(skills.map(skill => skill.category))];

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loading-content">
                    <div className="loading-spinner">
                        <div className="spinner-core"></div>
                        <div className="spinner-outer"></div>
                    </div>
                    <h2 className="loading-text">Loading Portfolio</h2>
                    <div className="progress-track">
                        <div className="progress-bar"></div>
                    </div>
                    <p className="loading-subtext">Abreham Yetwale · Full Stack Developer</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {/* Background Elements */}
            <div className="gradient-background"></div>
            <div className="particles">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="particle"></div>
                ))}
            </div>

            {/* Header */}
            <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <nav className={`header-links ${isMenuOpen ? 'open' : ''}`}>
                    <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                    <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
                    <a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
                    <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                    <div className="mobile-social">
                        <a href="https://github.com/ABREHAMonly" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="https://linkedin.com/in/abreham-yetwale" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="https://x.com/Abrehamonly" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://t.me/ABREHAMonly" aria-label="Telegram"><FontAwesomeIcon icon={faTelegram} /></a>
                        <a href="https://youtube.com/@abtuber-k7k?si=uD9va_BCRO8qB8fM" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href="https://www.tiktok.com/@abrehamonly?_t=ZM-8vOdqF30EoJ&_r=1" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} /></a>

                    </div>
                </nav>
                <div className="logo">
                    <img src="/1logoab.png" alt="Abreham's Logo" />
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Hero Section */}
                <section className="hero-section" id="home">
                    <div className="hero-content">
                        <div className="profile-container" data-aos="fade-up">
                            <div className="profile-photo">
                                <img src="/MyProfile.png" alt="Abreham Yetwale" />
                                <div className="photo-border"></div>
                            </div>
                            <div className="profile-info">
                                <h1>Abreham Yetwale</h1>
                                <p className="title">Full-stack Developer</p>
                                <div className="social-links">
                                    <a href="https://github.com/ABREHAMonly" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
                                    <a href="https://linkedin.com/in/abreham-yetwale" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
                                    <a href="https://x.com/Abrehamonly" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                                    <a href="https://t.me/ABREHAMonly" aria-label="Telegram"><FontAwesomeIcon icon={faTelegram} /></a>
                                    <a href="https://youtube.com/@abtuber-k7k?si=uD9va_BCRO8qB8fM" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a>
                                    <a href="https://www.tiktok.com/@abrehamonly?_t=ZM-8vOdqF30EoJ&_r=1" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} /></a>
                                </div>
                            </div>
                        </div>
                        <div className="animated-text-section" data-aos="fade-up" data-aos-delay="300">
                            <AnimatedText />
                        </div>
                    </div>
                    <a href="#about" className="scroll-down" aria-label="Scroll down">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                </section>

                {/* About Section */}
                <section id="about" className="section" data-aos="fade-up">
                    <div className="section-header">
                        <h2>About Me</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="glass-card about-content">
                        <div className="about-text">
                            <p>
                                I'm a passionate full-stack developer with expertise in building modern web and mobile applications. 
                                With a strong foundation in computer science and hands-on experience in various technologies, 
                                I create efficient, scalable, and user-friendly solutions.
                            </p>
                            <p>
                                My journey in software development began with a curiosity for problem-solving and has evolved 
                                into a career where I combine technical skills with creative thinking to deliver impactful applications.
                            </p>
                            <div className="about-actions">
                                <a href="/Abreham_yetwale_CV.pdf" className="button" download>
                                    <FontAwesomeIcon icon={faFileDownload} /> Download CV
                                </a>
                                <a href="#contact" className="button outline">
                                    <FontAwesomeIcon icon={faEnvelope} /> Contact Me
                                </a>
                            </div>
                        </div>
                        <div className="about-stats">
                            <div className="stat-item">
                                <h3>--+</h3>
                                <p>Projects Completed</p>
                            </div>
                            <div className="stat-item">
                                <h3>--+</h3>
                                <p>Years Experience</p>
                            </div>
                            <div className="stat-item">
                                <h3>--%</h3>
                                <p>Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="section">
                    <div className="section-header">
                        <h2>Featured Projects</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <div className="project-card glass-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                    <div className="project-tags">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="project-info">
                                    <h3>{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <div className="technologies">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="tech">{tech}</span>
                                        ))}
                                    </div>
                                    <a href={project.link} className="button" target="_blank" rel="noopener noreferrer">
                                        View Project
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="section">
                    <div className="section-header">
                        <h2>Technical Skills</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="skills-filter">
                        {skillCategories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="skills-container">
                        {skills
                            .filter(skill => activeFilter === "All" || skill.category === activeFilter)
                            .map((skill, index) => (
                                <div 
                                    className={`skill-item glass-card ${activeSkill === index ? 'active' : ''}`}
                                    key={index}
                                    onMouseEnter={() => setActiveSkill(index)}
                                    onMouseLeave={() => setActiveSkill(null)}
                                    onClick={() => setActiveSkill(index)}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >
                                    <div className="skill-icon">
                                        <FontAwesomeIcon icon={skill.icon} />
                                    </div>
                                    <div className="skill-info">
                                        <h4>{skill.name}</h4>
                                        <div className="skill-progress">
                                            <div 
                                                className="progress-bar" 
                                                style={{ width: `${activeSkill === index ? skill.percentage : 0}%` }}
                                            ></div>
                                            <span>{activeSkill === index ? `${skill.percentage}%` : '0%'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section">
                    <div className="section-header">
                        <h2>Get In Touch</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="contact-container glass-card" data-aos="fade-up">
                        <div className="contact-info">
                            <h3>Let's Work Together</h3>
                            <p>
                                I'm currently available for freelance work and full-time opportunities. 
                                If you have a project that needs creative solutions, let's discuss how I can help.
                            </p>
                            <div className="contact-methods">
                                <a href="mailto:Abrehamonly@gmail.com" className="contact-link">
                                    <FontAwesomeIcon icon={faEnvelope} /> Abrehamonly@gmail.com
                                </a>
                            </div>
                        </div>
                        <form onSubmit={sendEmail} className="contact-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="button">
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src="/1logoab.png" alt="Abreham's Logo" />
                        <p>Abreham Yetwale</p>
                    </div>
                    <div className="footer-links">
                        <a href="#about">About</a>
                        <a href="#projects">Projects</a>
                        <a href="#skills">Skills</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="social-icons">
                        <a href="https://github.com/ABREHAMonly" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="https://linkedin.com/in/abreham-yetwale" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="https://x.com/Abrehamonly" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://t.me/ABREHAMonly" aria-label="Telegram"><FontAwesomeIcon icon={faTelegram} /></a>
                        <a href="https://youtube.com/@abtuber-k7k?si=uD9va_BCRO8qB8fM" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href="https://www.tiktok.com/@abrehamonly?_t=ZM-8vOdqF30EoJ&_r=1" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} /></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Abreham Yetwale. All rights reserved.</p>
                </div>
            </footer>

            {/* Notification */}
            {notification.visible && (
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={() => setNotification({ ...notification, visible: false })} 
                />
            )}
            
            {/* Chat Board */}
            <ChatBoard />
        </div>
    );
};

export default HomePage;