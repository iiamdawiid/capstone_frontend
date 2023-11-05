import React, { useState, useEffect } from 'react';

export const FlashMessage = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return isVisible ? (
        <div className={`flash-message ${type}`}>
            {message}
        </div>
    ) : null;
};