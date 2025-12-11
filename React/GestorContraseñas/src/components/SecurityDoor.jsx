import React, { useState } from 'react';
import './SecurityDoor.css';
import securityConfig from '../config_seguridad.json';

const SecurityDoor = ({ onUnlock }) => {
    const [viewMode, setViewMode] = useState('MENU'); // MENU, LOGIN, REGISTER, SUCCESS
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const generateHash = (key) => {
        const combined = key + securityConfig.salt;
        return combined + combined;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const inputHash = generateHash(password);

        if (inputHash === securityConfig.master_hash) {
            console.log("UI: Login success", password);
            setIsError(false);
            setViewMode('SUCCESS');
            // Delay for animation before notifying parent
            setTimeout(() => onUnlock(password), 2000);
        } else {
            console.log("UI: Login failed setup");
            setIsError(true);
            setMessage("Error: ACCESS DENIED");
        }
    };

    const renderMenu = () => (
        <div className="menu-options">
            <button className="hud-button large" onClick={() => { setViewMode('LOGIN'); setMessage(''); setIsError(false); }}>
                ENTRAR A LA CAJA
            </button>
            <button
                className="hud-button large"
                onClick={() => { /* Disabled */ }}
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
                title="FEATURE_DISABLED"
            >
                CREAR NUEVA CAJA
            </button>
        </div>
    );

    const renderForm = (mode) => (
        <form onSubmit={handleLogin} className="security-form">
            <h3 className="sub-title">{mode === 'REGISTER' ? 'SET_MASTER_KEY' : 'AUTHENTICATE'}</h3>
            <input
                type="password"
                className="security-door-input"
                placeholder="INPUT_KEY..."
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (isError) setIsError(false);
                    if (message) setMessage('');
                }}
                autoFocus
            />
            <div className="form-actions">
                <button type="button" className="hud-button" onClick={() => { setViewMode('MENU'); setPassword(''); setMessage(''); setIsError(false); }}>
                    BACK
                </button>
                <button type="submit" className="hud-button primary">
                    UNLOCK
                </button>
            </div>
            {message && <div className={`message ${isError ? 'error' : 'success'}`}>{message}</div>}
        </form>
    );

    const renderSuccess = () => (
        <div className="security-door-success-message">
            ACCESO PERMITIDO
        </div>
    );

    return (
        <div className={`security-door-container ${isError ? 'error-mode' : ''}`}>
            {viewMode !== 'SUCCESS' && <h2 className="security-door-title">SECURITY_GATEWAY</h2>}

            {viewMode === 'MENU' && renderMenu()}
            {viewMode === 'LOGIN' && renderForm(viewMode)}
            {viewMode === 'SUCCESS' && renderSuccess()}
        </div>
    );
};

export default SecurityDoor;
