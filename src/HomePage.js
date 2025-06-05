import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faTelegram, faYoutube, faTiktok, faJs, faReact, faNodeJs, faPython, faHtml5, faJava, faPhp } from '@fortawesome/free-brands-svg-icons';
import { faBars, faMobileAlt, faEnvelope, faFileDownload, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';
import Notification from './Notification';
import ChatBoard from './ChatBoard';
import { AnimatedText } from './AnimatedText';
import AOS from "aos";
import "aos/dist/aos.css";

// Project data with enhanced descriptions for SEO
const projects = [
    {
        title: "Healthcare Management System with Chatbot",
        description: "A comprehensive hospital management system with integrated AI chatbot functionality built with React, Node.js, and MongoDB. This system streamlines patient records, appointments, and hospital administration.",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        image: "/hospitalmanagementsystem.png",
        link: "https://medicare-theta-smoky.vercel.app/",
        tags: ["Full Stack", "Healthcare"],
        keywords: ["hospital management", "healthcare software", "medical chatbot"],
        date: "2025-02"
    },
    {
        title: "Anonymous Message Board",
        description: "Secure platform for anonymous messaging with category filtering and spam protection. Built with MERN stack (MongoDB, Express, React, Node.js) for secure communication.",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        image: "/logoanonymusm.png",
        link: "https://anonymus-message-board.vercel.app/",
        tags: ["Full Stack", "Security"],
        keywords: ["anonymous messaging", "secure board", "privacy app"],
        date: "2025-04"
    },
    {
        title: "Nutritional Value Management",
        description: "Android mobile app analyzing nutritional values of Wolaita traditional foods. Developed with Java, Android SDK, and Firebase for nutrition tracking and food analysis.",
        technologies: ["Java", "Android SDK", "Firebase and SQlite"],
        image: "/Nutritional Value Management of Wolaita Traditional Food.png",
        link: "https://github.com/ABREHAMonly/wolaitan-traditional-food-NV-mobile-app",
        tags: ["Mobile", "Health"],
        keywords: ["nutrition app", "food analysis", "health mobile app"],
        date: "2025-03"
    },
    {
        title: "Healthcare Chatbot",
        description: "AI-powered multilingual healthcare chatbot using NLP and machine learning. Built with Python, React, Flask, NLTK and TensorFlow for medical inquiries and symptom checking.",
        technologies: ["Python", "React.Js", "Flask", "NLTK", "TensorFlow"],
        image: "/chatbot.png",
        link: "https://github.com/ABREHAMonly/Chatbot-in-healthcare-web-based",
        tags: ["AI", "Healthcare"],
        keywords: ["health chatbot", "medical AI", "symptom checker"],
        date: "2025-04"
    },
    {
        title: "Lost And Found System",
        description: "Community lost and found mobile application with React Native, Firebase and Google Maps API integration for item recovery and community engagement.",
        technologies: ["React Native", "Firebase", "Google Maps API"],
        image: "/LostAndFoundlogo.png",
        link: "#",
        tags: ["Mobile", "Community"],
        keywords: ["lost and found app", "community app", "item recovery"],
        date: "2025-05"
    },
    {
        title: "New Project Coming Soon",
        description: "Exciting new full-stack development project currently in progress. Check back soon for updates on this React and Node.js application.",
        technologies: ["React", "Node.js"],
        image: "/commingsoon.png",
        link: "#",
        tags: ["Upcoming"],
        keywords: ["new project", "coming soon", "portfolio work"],
        date: "2025-06"
    },
];

// Skills data with qualitative levels (1-5) instead of percentages
const skills = [
    { name: "JavaScript", icon: faJs, level: 4, category: "Frontend", expertise: "Advanced" },
    { name: "React", icon: faReact, level: 4, category: "Frontend", expertise: "Expert" },
    { name: "React Native", icon: faMobileAlt, level: 3, category: "Mobile", expertise: "Advanced" },
    { name: "Node.js", icon: faNodeJs, level: 4, category: "Backend", expertise: "Advanced" },
    { name: "Python", icon: faPython, level: 3, category: "Backend", expertise: "Intermediate" },
    { name: "HTML & CSS", icon: faHtml5, level: 4, category: "Frontend", expertise: "Expert" },
    { name: "Java", icon: faJava, level: 3, category: "Mobile", expertise: "Intermediate" },
    { name: "PHP", icon: faPhp, level: 3, category: "Backend", expertise: "Intermediate" }
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
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Initialize AOS and particles
    useEffect(() => {
        AOS.init({ 
            duration: 800,
            once: true,
            easing: 'ease-out-quart'
        });
        
        // Set dark mode based on user preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);

        // Generate random particles
        const generateParticles = () => {
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
        };

        generateParticles();

        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    // Toggle dark mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => {
            document.body.style.overflow = !prev ? 'hidden' : 'auto';
            return !prev;
        });
    }, []);

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: '',
            email: '',
            message: ''
        };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await emailjs.send(
                process.env.REACT_APP_SERVICE_ID || 'default_service_id',
                process.env.REACT_APP_TEMPLATE_ID || 'default_template_id',
                {
                    from_name: formData.name,
                    to_name: "Abreham",
                    from_email: formData.email,
                    to_email: "abrehamonly@gmail.com",
                    message: formData.message
                },
                process.env.REACT_APP_PUBLIC_KEY || 'default_public_key'
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
            console.error('EmailJS Error:', error);
            setNotification({ 
                message: 'Failed to send message. Please try again later.', 
                type: 'error', 
                visible: true 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const skillCategories = ["All", ...new Set(skills.map(skill => skill.category))];

    // Generate JSON-LD structured data
    const generateStructuredData = () => {
        return {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Abreham Yetwale",
            "jobTitle": "Full-stack Developer",
            "url": "https://abrehamyetwale.netlify.app",
            "sameAs": [
                "https://github.com/ABREHAMonly",
                "https://linkedin.com/in/abreham-yetwale",
                "https://x.com/Abrehamonly",
                "https://t.me/ABREHAMonly",
                "https://youtube.com/@abtuber-k7k",
                "https://www.tiktok.com/@abrehamonly"
            ],
            "image": "https://abrehamyetwale.netlify.app/abreham-yetwale-profile.jpg",
            "description": "Portfolio of Abreham Yetwale, full-stack developer specializing in React, Node.js, and mobile applications.",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Addis Ababa",
                "addressRegion": "Addis Ababa",
                "addressCountry": "Ethiopia"
            },
            "hasOccupation": {
                "@type": "Occupation",
                "name": "Software Developer",
                "skills": skills.map(skill => skill.name)
            }
        };
    };

    if (isLoading) {
        return (
            <div className="loading-screen">
                <Helmet>
                    <title>Abreham Yetwale | Full-stack Developer Portfolio</title>
                    <meta name="description" content="Loading portfolio of Abreham Yetwale, full-stack developer specializing in React, Node.js, and mobile applications." />
                </Helmet>
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
        <div className={`container ${darkMode ? 'dark-mode' : ''}`} itemScope itemType="https://schema.org/Person">
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Abreham Yetwale | Full-stack Developer Portfolio</title>
                <meta name="title" content="Abreham Yetwale | Full-stack Developer Portfolio" />
                <meta name="description" content="Portfolio of Abreham Yetwale, full-stack developer specializing in React, Node.js, React Native, and Python. View my projects and contact me for opportunities." />
                <meta name="keywords" content="full-stack developer, React developer, Node.js developer, portfolio, web developer, mobile developer, Abreham Yetwale" />
                <meta name="author" content="Abreham Yetwale" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://abrehamyetwale.netlify.app" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://abrehamyetwale.netlify.app" />
                <meta property="og:title" content="Abreham Yetwale | Full-stack Developer Portfolio" />
                <meta property="og:description" content="Portfolio of Abreham Yetwale, full-stack developer specializing in React, Node.js, and mobile applications." />
                <meta property="og:image" content="https://abrehamyetwale.netlify.app/abreham-yetwale-profile.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://abrehamyetwale.netlify.app" />
                <meta property="twitter:title" content="Abreham Yetwale | Full-stack Developer Portfolio" />
                <meta property="twitter:description" content="Portfolio of Abreham Yetwale, full-stack developer specializing in React, Node.js, and mobile applications." />
                <meta property="twitter:image" content="https://abrehamyetwale.netlify.app/abreham-yetwale-profile.jpg" />
                <meta property="twitter:creator" content="@Abrehamonly" />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(generateStructuredData())}
                </script>
            </Helmet>

            {/* Background Elements */}
            <div className="gradient-background"></div>
            <div className="particles">
                {[...Array(window.innerWidth < 768 ? 15 : 30)].map((_, i) => (
                    <div key={i} className="particle"></div>
                ))}
            </div>

            {/* Header */}
            <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
                <div className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <nav className={`header-links ${isMenuOpen ? 'open' : ''}`}>
                    <a href="#about" onClick={toggleMenu} aria-label="About section">About</a>
                    <a href="#projects" onClick={toggleMenu} aria-label="Projects section">Projects</a>
                    <a href="#skills" onClick={toggleMenu} aria-label="Skills section">Skills</a>
                    <a href="#contact" onClick={toggleMenu} aria-label="Contact section">Contact</a>
                    <div className="mobile-social">
                        <a href="https://github.com/ABREHAMonly" aria-label="GitHub profile"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="https://linkedin.com/in/abreham-yetwale" aria-label="LinkedIn profile"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="https://x.com/Abrehamonly" aria-label="Twitter profile"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://t.me/ABREHAMonly" aria-label="Telegram profile"><FontAwesomeIcon icon={faTelegram} /></a>
                        <a href="https://youtube.com/@abtuber-k7k?si=uD9va_BCRO8qB8fM" aria-label="YouTube channel" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href="https://www.tiktok.com/@abrehamonly" aria-label="TikTok profile" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} /></a>
                    </div>
                </nav>
                <div className="logo">
                    <img src="/1logoab.png" alt="Abreham Yetwale Logo - Full-stack Developer" loading="lazy" />
                </div>
                <button 
                    className="theme-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                >
                    {darkMode ? '☀️' : '🌙'}
                </button>
            </header>

            {/* Skip to Content Link */}
            <a href="#main-content" className="skip-link">Skip to content</a>

            {/* Main Content */}
            <main className="main-content" id="main-content">
                {/* Hero Section */}
                <section className="hero-section" id="home" itemScope itemType="https://schema.org/ProfilePage">
                    <div className="hero-content">
                        <div className="profile-container" data-aos="fade-up">
                            <div className="profile-photo">
                                <img 
                                    src="/abreham-yetwale-profile.jpg" 
                                    alt="Abreham Yetwale - Full-stack Developer" 
                                    itemProp="image"
                                    loading="eager"
                                    width="200"
                                    height="200"
                                />
                                <div className="photo-border"></div>
                            </div>
                            <div className="profile-info">
                                <h1 itemProp="name">Abreham Yetwale</h1>
                                <p className="title" itemProp="jobTitle">Full-stack Developer</p>
                                <div className="social-links">
                                    <a href="https://github.com/ABREHAMonly" aria-label="GitHub profile" itemProp="sameAs"><FontAwesomeIcon icon={faGithub} /></a>
                                    <a href="https://linkedin.com/in/abreham-yetwale" aria-label="LinkedIn profile" itemProp="sameAs"><FontAwesomeIcon icon={faLinkedin} /></a>
                                    <a href="https://x.com/Abrehamonly" aria-label="Twitter profile" itemProp="sameAs"><FontAwesomeIcon icon={faTwitter} /></a>
                                    <a href="https://t.me/ABREHAMonly" aria-label="Telegram profile" itemProp="sameAs"><FontAwesomeIcon icon={faTelegram} /></a>
                                    <a href="https://youtube.com/@abtuber-k7k?si=uD9va_BCRO8qB8fM" aria-label="YouTube channel" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><FontAwesomeIcon icon={faYoutube} /></a>
                                    <a href="https://www.tiktok.com/@abrehamonly?_t=ZM-8vOdqF30EoJ&_r=1" aria-label="TikTok profile" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><FontAwesomeIcon icon={faTiktok} /></a>
                                </div>
                            </div>
                        </div>
                        <div className="animated-text-section" data-aos="fade-up" data-aos-delay="300">
                            <AnimatedText />
                        </div>
                    </div>
                    <a href="#about" className="scroll-down" aria-label="Scroll down to about section">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                </section>

                {/* About Section */}
                <section id="about" className="section" data-aos="fade-up" itemScope itemType="https://schema.org/AboutPage">
                    <div className="section-header">
                        <h2>About Me</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="glass-card about-content">
                        <div className="about-text" itemProp="description">
                            <p>
                                I'm a passionate full-stack developer with expertise in building modern web and mobile applications. 
                                With a strong foundation in computer science and hands-on experience in Java, Python, JavaScript, React, Node.js, PHP and HTML&CSS, 
                                I create efficient, scalable, and user-friendly solutions.
                            </p>
                            <p>
                                My journey in software development began with a curiosity for problem-solving and has evolved 
                                into a career where I combine technical skills with creative thinking to deliver impactful applications.
                                I specialize in creating responsive web applications, mobile apps, and AI-powered solutions.
                            </p>
                            <div className="about-actions">
                                <a href="/Abreham_yetwale_CV.pdf" className="button" download aria-label="Download CV">
                                    <FontAwesomeIcon icon={faFileDownload} /> Download CV
                                </a>
                                <a href="#contact" className="button outline" aria-label="Contact me">
                                    <FontAwesomeIcon icon={faEnvelope} /> Contact Me
                                </a>
                            </div>
                        </div>
                        <div className="about-stats">
                            <div className="stat-item">
                                <h3>--</h3>
                                <p>Projects Completed</p>
                            </div>
                            <div className="stat-item">
                                <h3>--</h3>
                                <p>Years Experience</p>
                            </div>
                            <div className="stat-item">
                                <h3>--</h3>
                                <p>Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="section" itemScope itemType="https://schema.org/ItemList">
                    <div className="section-header">
                        <h2>Featured Projects</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <div 
                                className="project-card glass-card" 
                                key={index} 
                                data-aos="fade-up" 
                                data-aos-delay={index * 100}
                                itemScope
                                itemType="https://schema.org/CreativeWork"
                            >
                                <meta itemProp="dateCreated" content={project.date} />
                                <div className="project-image">
                                    <img 
                                        src={project.image} 
                                        alt={`${project.title} - ${project.description.substring(0, 60)}...`} 
                                        loading="lazy"
                                        itemProp="image"
                                        width="400"
                                        height="300"
                                    />
                                    <div className="project-tags">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="project-info">
                                    <h3 itemProp="name">{project.title}</h3>
                                    <p className="project-description" itemProp="description">{project.description}</p>
                                    <div className="technologies" itemProp="keywords">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="tech">{tech}</span>
                                        ))}
                                    </div>
                                    <a 
                                        href={project.link} 
                                        className="button" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} project`}
                                        itemProp="url"
                                    >
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
                                aria-label={`Filter skills by ${category}`}
                                aria-pressed={activeFilter === category}
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
                                    itemScope
                                    itemType="https://schema.org/Intangible"
                                >
                                    <div className="skill-icon">
                                        <FontAwesomeIcon icon={skill.icon} />
                                    </div>
                                    <div className="skill-info">
                                        <h4 itemProp="name">{skill.name}</h4>
                                        <meta itemProp="skillLevel" content={skill.expertise} />
                                        <div className="skill-level">
                                            <div className="level-indicator">
                                                {[...Array(5)].map((_, i) => (
                                                    <div 
                                                        key={i} 
                                                        className={`level-dot ${i < skill.level ? 'filled' : ''}`}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <span className="sr-only">
                                                {skill.name} skill level: {skill.level} out of 5
                                            </span>
                                        </div>
                                        <p className="skill-expertise">{skill.expertise}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section" itemScope itemType="https://schema.org/ContactPage">
                    <div className="section-header">
                        <h2>Get In Touch</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="contact-container glass-card" data-aos="fade-up">
                        <div className="contact-info">
                            <h3>Let's Work Together</h3>
                            <p itemProp="description">
                                I'm currently available for freelance work and full-time opportunities. 
                                If you have a project that needs creative solutions, let's discuss how I can help.
                            </p>
                            <div className="contact-methods">
                                <a href="mailto:Abrehamonly@gmail.com" className="contact-link" itemProp="email">
                                    <FontAwesomeIcon icon={faEnvelope} /> Abrehamonly@gmail.com
                                </a>
                            </div>
                        </div>
                        <form onSubmit={sendEmail} className="contact-form" itemScope itemType="https://schema.org/ContactForm">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    itemProp="name"
                                    aria-label="Your name"
                                    aria-invalid={!!formErrors.name}
                                    aria-describedby={formErrors.name ? "name-error" : undefined}
                                />
                                {formErrors.name && <span id="name-error" className="error-message">{formErrors.name}</span>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    itemProp="email"
                                    aria-label="Your email"
                                    aria-invalid={!!formErrors.email}
                                    aria-describedby={formErrors.email ? "email-error" : undefined}
                                />
                                {formErrors.email && <span id="email-error" className="error-message">{formErrors.email}</span>}
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    itemProp="message"
                                    aria-label="Your message"
                                    aria-invalid={!!formErrors.message}
                                    aria-describedby={formErrors.message ? "message-error" : undefined}
                                ></textarea>
                                {formErrors.message && <span id="message-error" className="error-message">{formErrors.message}</span>}
                            </div>
                            {/* Honeypot field for spam prevention */}
                            <input type="text" name="honeypot" className="honeypot" tabIndex="-1" autoComplete="off" />
                            <button 
                                type="submit" 
                                className="button" 
                                aria-label="Send message"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer" itemScope itemType="https://schema.org/WPFooter">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src="/1logoab.png" alt="Abreham Yetwale Logo" loading="lazy" width="50" height="50" />
                        <p itemProp="name">Abreham Yetwale</p>
                    </div>
                    <div className="footer-links">
                        <a href="#about" aria-label="About section">About</a>
                        <a href="#projects" aria-label="Projects section">Projects</a>
                        <a href="#skills" aria-label="Skills section">Skills</a>
                        <a href="#contact" aria-label="Contact section">Contact</a>
                    </div>
                    <div className="social-icons">
                        <a href="https://github.com/ABREHAMonly" aria-label="GitHub profile" itemProp="sameAs"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="https://linkedin.com/in/abreham-yetwale" aria-label="LinkedIn profile" itemProp="sameAs"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="https://x.com/Abrehamonly" aria-label="Twitter profile" itemProp="sameAs"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://t.me/ABREHAMonly" aria-label="Telegram profile" itemProp="sameAs"><FontAwesomeIcon icon={faTelegram} /></a>
                        <a href="https://youtube.com/@abtuber-k7k?si=uD9va_BCRO8qB8fM" aria-label="YouTube channel" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href="https://www.tiktok.com/@abrehamonly?_t=ZM-8vOdqF30EoJ&_r=1" aria-label="TikTok profile" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><FontAwesomeIcon icon={faTiktok} /></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} <span itemProp="name">Abreham Yetwale</span>. All rights reserved.</p>
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