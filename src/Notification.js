import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { faTimes, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateX(120%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(120%); }
`;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  margin: 20px;
  padding: 20px 25px;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  color: white;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: calc(100% - 40px);
  transform: translateX(120%);
  animation: ${props => props.isExiting ? slideOut : slideIn} 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  background: ${props => props.gradient};
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const NotificationTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

const NotificationIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

const NotificationContent = styled.div`
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: white;
  transition: width 1s linear;
  border-radius: 2px;
`;

const Timer = styled.div`
  position: absolute;
  bottom: 8px;
  right: 25px;
  font-size: 12px;
  opacity: 0.8;
`;

const Notification = ({ message, type, onClose }) => {
    const [countdown, setCountdown] = useState(5);
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    useEffect(() => {
        if (countdown === 0) {
            handleClose();
            return;
        }
        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, handleClose]);

    const getNotificationStyles = () => {
        const baseStyles = {
            success: {
                icon: faCheckCircle,
                iconColor: '#d1fae5',
                gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(52, 211, 153, 0.95))'
            },
            error: {
                icon: faExclamationTriangle,
                iconColor: '#fee2e2',
                gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(248, 113, 113, 0.95))'
            }
        };
        return baseStyles[type] || baseStyles.error;
    };

    const styles = getNotificationStyles();

    return (
        <NotificationWrapper
            gradient={styles.gradient}
            isExiting={isExiting}
            role="alert"
            aria-live="assertive"
        >
            <NotificationHeader>
                <NotificationTitle>
                    <NotificationIcon 
                        icon={styles.icon} 
                        style={{ color: styles.iconColor }} 
                        aria-hidden="true"
                    />
                    {type === 'success' ? 'Success' : 'Error'}
                </NotificationTitle>
                <CloseButton 
                    onClick={handleClose}
                    aria-label="Close notification"
                >
                    <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
                </CloseButton>
            </NotificationHeader>
            
            <NotificationContent>{message}</NotificationContent>
            
            <ProgressContainer>
                <ProgressBar width={(countdown / 5) * 100} />
            </ProgressContainer>
            
            <Timer>{countdown}s</Timer>
        </NotificationWrapper>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    onClose: PropTypes.func.isRequired
};

export default Notification;