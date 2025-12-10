import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ servicio, isSelected, onClick }) => {
    return (
        <div
            className={`service-card ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="service-header">
                <h3 className="service-name">{servicio}</h3>
            </div>
        </div>
    );
};

export default ServiceCard;
