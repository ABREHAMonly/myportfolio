import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// Styled components
const TypingContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: left;
`;

const AnimatedHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${fadeIn} 0.8s ease-out;
  font-family: 'Space Grotesk', sans-serif;
`;

const TypingTextWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const TypingContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  display: inline;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1.2rem;
  background: #8b5cf6;
  margin-left: 4px;
  vertical-align: middle;
  animation: ${blink} 1s infinite;
`;

const TypingText = ({ 
  texts, 
  speed = 50, 
  deleteSpeed = 30, 
  pauseBeforeDelete = 1500,
  pauseBetweenTexts = 500 
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        if (!isDeleting && index < texts[textIndex].length) {
            const typingTimeout = setTimeout(() => {
                setDisplayedText(prev => prev + texts[textIndex][index]);
                setIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(typingTimeout);
        } 
        
        if (!isDeleting && index === texts[textIndex].length) {
            setIsPaused(true);
            setTimeout(() => {
                setIsDeleting(true);
                setIsPaused(false);
            }, pauseBeforeDelete);
            return;
        }
        
        if (isDeleting && index > 0) {
            const deletingTimeout = setTimeout(() => {
                setDisplayedText(prev => prev.slice(0, -1));
                setIndex(prev => prev - 1);
            }, deleteSpeed);
            return () => clearTimeout(deletingTimeout);
        }
        
        if (isDeleting && index === 0) {
            setIsPaused(true);
            setTimeout(() => {
                setIsDeleting(false);
                setTextIndex(prev => (prev + 1) % texts.length);
                setIsPaused(false);
            }, pauseBetweenTexts);
        }
    }, [index, isDeleting, isPaused, texts, textIndex, speed, deleteSpeed, pauseBeforeDelete, pauseBetweenTexts]);

    return (
        <TypingTextWrapper>
            <TypingContent>
                {displayedText}
                <Cursor />
            </TypingContent>
        </TypingTextWrapper>
    );
};

const AnimatedText = () => {
    const texts = [
        "Innovative Solutions",
        "Creative Development",
        "Quality Code",
        "User Experience",
        "Technical Excellence"
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [texts.length]);

    const introTexts = [
        "Hello! I'm Abreham Yetwale.",
        "Full-stack developer with a Bachelor's in Computer Science.",
        "Graduated from Wolaita Sodo University.",
        "Passionate about creating impactful digital experiences.",
        "Let's build something amazing together!"
    ];

    return (
        <TypingContainer>
            <AnimatedHeading>
                {texts[currentIndex]}
            </AnimatedHeading>
            <TypingText 
                texts={introTexts} 
                speed={40} 
                deleteSpeed={30} 
                pauseBeforeDelete={2000}
                pauseBetweenTexts={800}
            />
        </TypingContainer>
    );
};

export { TypingText, AnimatedText };