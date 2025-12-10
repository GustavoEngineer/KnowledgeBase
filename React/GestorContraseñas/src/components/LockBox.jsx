import React from 'react';
import './LockBox.css';
import ServiceCard from './ServiceCard';
import db from '../db.json';

const LockBox = ({ onLock }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    return (
        <div className="lockbox-container">
            <div className="hud-header">
                <div className="hud-panel gravity-panel">
                    <span className="hud-label">GRAVITY.INT</span>
                    <span className="hud-value danger">0.5G</span>
                    <div className="hud-gauge-circle"></div>
                </div>
                <div className="hud-panel title-panel">
                    <h1>SECURE_DATA_VAULT</h1>
                    <div className="scan-line"></div>
                </div>
                <div className="hud-panel timer-panel">
                    <button className="hud-button" onClick={onLock} style={{ fontSize: '0.9rem', padding: '5px 15px' }}>
                        CLOSE_BOX
                    </button>
                    <span className="hud-label" style={{ marginTop: '5px' }}>SESSION_ACTIVE</span>
                </div>
            </div>

            <div className="split-view-container">
                <div className="cards-scroll-area">
                    <div className="cards-grid">
                        {db.map((item, index) => (
                            <ServiceCard
                                key={index}
                                servicio={item.servicio}
                                isSelected={selectedIndex === index}
                                onClick={() => setSelectedIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="detail-panel">
                    {selectedIndex !== null ? (
                        <div className="detail-content">
                            <h2 className="detail-title">{db[selectedIndex].servicio}</h2>
                            <div className="detail-row">
                                <span className="detail-label">CORREO:</span>
                                <span className="detail-value">{db[selectedIndex].correo}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">CLAVE_CIFRADA:</span>
                                <span className="detail-value highlight">{db[selectedIndex].contrasena_cifrada_falsa}</span>
                            </div>
                            <div className="detail-actions">
                                <button className="hud-button">DECRYPT</button>
                                <button className="hud-button">COPY</button>
                            </div>
                        </div>
                    ) : (
                        <div className="detail-placeholder">
                            <span>SELECT A TARGET TO SCAN</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="hud-footer">
                <span>SYSTEM: ONLINE</span>
                <span>SEC_LEVEL: MAX</span>
            </div>
        </div>
    );
};

export default LockBox;
