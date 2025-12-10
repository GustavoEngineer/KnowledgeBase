import React, { useState } from 'react';
import './SecurityDoor.css';

const SALT = "12345";
const STORAGE_KEY = "security_config";

const SecurityDoor = ({ onUnlock }) => {
    const [viewMode, setViewMode] = useState('MENU'); // MENU, LOGIN, REGISTER
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Only for consistency if needed, but simple requires just one
    const [message, setMessage] = useState('');

    const generateHash = (key) => {
        const combined = key + SALT;
        return combined + combined;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!password.trim()) {
            setMessage("ERROR: PASSWORD_REQUIRED");
            return;
        }

        const fakeHash = generateHash(password);
        const configData = {
            salt: SALT,
            master_hash: fakeHash,
            configurado: true
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(configData));
        setMessage("SUCCESS: BOX_CREATED");
        setTimeout(() => {
            setViewMode('MENU');
            setPassword('');
            setMessage('');
        }, 1500);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            setMessage("ERROR: NO_BOX_FOUND");
            return;
        }

        try {
            const config = JSON.parse(stored);
            const inputHash = generateHash(password);

            if (inputHash === config.master_hash) {
                onUnlock();
            } else {
                setMessage("ACCESS_DENIED");
            }
        } catch (err) {
            setMessage("SYSTEM_ERROR: CORRUPT_DATA");
        }
    };

    const renderMenu = () => (
        <div className="menu-options">
            <button className="hud-button large" onClick={() => { setViewMode('LOGIN'); setMessage(''); }}>
                ENTRAR A LA CAJA
            </button>
            <button className="hud-button large" onClick={() => { setViewMode('REGISTER'); setMessage(''); }}>
                CREAR NUEVA CAJA
            </button>
        </div>
    );

    const renderForm = (mode) => (
        <form onSubmit={mode === 'REGISTER' ? handleRegister : handleLogin} className="security-form">
            <h3 className="sub-title">{mode === 'REGISTER' ? 'SET_MASTER_KEY' : 'AUTHENTICATE'}</h3>
            <input
                type="password"
                className="security-door-input"
                placeholder="INPUT_KEY..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
            />
            <div className="form-actions">
                <button type="button" className="hud-button" onClick={() => { setViewMode('MENU'); setPassword(''); setMessage(''); }}>
                    BACK
                </button>
                <button type="submit" className="hud-button primary">
                    {mode === 'REGISTER' ? 'INITIALIZE' : 'UNLOCK'}
                </button>
            </div>
            {message && <div className={`message ${message.includes('SUCCESS') ? 'success' : 'error'}`}>{message}</div>}
        </form>
    );

    return (
        <div className="security-door-container">
            <h2 className="security-door-title">SECURITY_GATEWAY</h2>

            {viewMode === 'MENU' && renderMenu()}
            {(viewMode === 'LOGIN' || viewMode === 'REGISTER') && renderForm(viewMode)}
        </div>
    );
};

export default SecurityDoor;
