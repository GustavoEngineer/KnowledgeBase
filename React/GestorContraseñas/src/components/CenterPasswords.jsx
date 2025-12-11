import React, { useState, useEffect } from 'react';
import './CenterPasswords.css';
import ServiceCard from './ServiceCard';
import AddCredential from './AddCredential';
import db from '../db.json';

const CenterPasswords = ({ onLogout }) => {
    // Initialize state with db data to allow UI updates
    const [services, setServices] = useState(db);
    const [selectedService, setSelectedService] = useState(null);
    const [isDecrypted, setIsDecrypted] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    // Inputs for Decryption
    const [masterKeyInput, setMasterKeyInput] = useState('');

    const [displayedPassword, setDisplayedPassword] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    // Find the full data object for the selected service from STATE, not direct import
    const selectedData = services.find(item => item.servicio === selectedService);

    // Reset decryption state when service changes
    useEffect(() => {
        setIsDecrypted(false);
        setShowPrompt(false);
        setMasterKeyInput('');
        setDisplayedPassword('');
        setIsAnimating(false);
    }, [selectedService]);

    const handleDecryptRequest = () => {
        setShowPrompt(true);
    };

    const confirmDecryption = (e) => {
        e.preventDefault();
        // Validation HARDCODED as requested "miclave" (or check against logic if needed, but "miclave" is the specific request)
        // We can also check against config if imported, but user said "tenga que poner la contraseña 'miclave'"
        if (masterKeyInput === 'miclave') {
            setShowPrompt(false);
            startDecryptionAnimation(selectedData.contrasena_real);
        } else {
            alert("Contraseña incorrecta"); // Simple alert for now, or use a state message
        }
    };

    const handleAddService = (newEntry) => {
        // Update local state
        const updatedServices = [...services, newEntry];
        setServices(updatedServices);

        // Close modal
        setShowAddModal(false);

        // Console log simulating the file write (Browser cannot write to disk directly)
        console.log("Updated DB JSON:", JSON.stringify(updatedServices, null, 4));
    };

    const startDecryptionAnimation = (finalString) => {
        setIsAnimating(true);
        setIsDecrypted(true);

        let iterations = 0;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        const maxIterations = 20; // How long it runs

        const interval = setInterval(() => {
            setDisplayedPassword(prev => {
                return finalString.split("").map((letter, index) => {
                    if (index < iterations) {
                        return finalString[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("");
            });

            if (iterations >= finalString.length) {
                clearInterval(interval);
                setIsAnimating(false);
                setDisplayedPassword(finalString); // Ensure final state is correct
            }

            iterations += 1 / 2; // Speed control
        }, 50);
    };

    return (
        <div className="center-passwords-container">
            <div className="header-actions">
                <h1 className="center-title">CREDENCIALES</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="logout-button" onClick={() => setShowAddModal(true)} title="Agregar Credencial">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <button className="logout-button" onClick={onLogout} title="Cerrar Sesión">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="main-layout">
                <div className="center-content">
                    <div className="services-list">
                        {services.map((item, index) => (
                            <ServiceCard
                                key={index}
                                servicio={item.servicio}
                                isSelected={selectedService === item.servicio}
                                onClick={() => {
                                    setSelectedService(item.servicio);
                                    setShowAddModal(false); // Close add mode when selecting a service
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column Logic: Show Add Form OR Detail View */}
                {showAddModal ? (
                    <AddCredential
                        onAdd={handleAddService}
                        onClose={() => setShowAddModal(false)}
                    />
                ) : selectedData ? (
                    <div className="detail-view">
                        <h2 className="detail-title">{selectedData.servicio}</h2>
                        <div className="detail-row">
                            <span className="detail-label">CORREO:</span>
                            <span className="detail-value">{selectedData.correo}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">CONTRASEÑA CIFRADA:</span>
                            <span className="detail-value mono dimmed">{selectedData.contrasena_cifrada_falsa}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">CONTRASEÑA REAL:</span>

                            {!isDecrypted ? (
                                <button className="hud-button" onClick={handleDecryptRequest} style={{ marginTop: '10px', width: 'fit-content' }}>
                                    DESCIFRAR
                                </button>
                            ) : (
                                <span className={`detail-value highlight ${isAnimating ? 'glitch-text' : ''}`}>
                                    {displayedPassword}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Optional: Empty state or placeholder if nothing selected */
                    <div className="detail-view placeholder">
                        <h2 className="detail-title" style={{ opacity: 0.5 }}>SELECCIONE UNA CREDENCIAL</h2>
                    </div>
                )}
            </div>

            {/* Modal Overlay for Password Prompt (Still a modal) */}
            {showPrompt && (
                <div className="prompt-overlay">
                    <form className="prompt-box" onSubmit={confirmDecryption}>
                        <h3>INGRESE LLAVE MAESTRA</h3>
                        <input
                            type="password"
                            className="security-door-input"
                            value={masterKeyInput}
                            onChange={(e) => setMasterKeyInput(e.target.value)}
                            autoFocus
                            placeholder="miclave..."
                        />
                        <div className="form-actions">
                            <button type="button" className="hud-button" onClick={() => setShowPrompt(false)}>CANCELAR</button>
                            <button type="submit" className="hud-button primary">CONFIRMAR</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CenterPasswords;
