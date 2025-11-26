import React, { useEffect } from 'react';
import '../styles/Notification.css';

interface NotificationProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
    message,
    type = 'info',
    onClose,
    duration = 3000
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={`notification-container ${type}`}>
            <div className="notification-content">
                {message}
            </div>
            <button className="notification-close" onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default Notification;
