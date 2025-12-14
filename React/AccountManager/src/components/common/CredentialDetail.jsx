import React, { useState, useEffect, useRef } from 'react';
import './AccountCard.css';
import { decryptCaesar } from '../../utils/Manager/decryption';
import DecryptionPrompt from './DecryptionPrompt';

const CredentialDetail = ({ credential, onClose }) => {
    const [copiedField, setCopiedField] = useState(null);
    const [displayedPassword, setDisplayedPassword] = useState('');
    const [showDecryptPrompt, setShowDecryptPrompt] = useState(false);
    const animationRef = useRef(null);

    useEffect(() => {
        if (credential) {
            setDisplayedPassword(credential.passwordCifrada || 'N/A');
        }
        return () => {
            if (animationRef.current) clearInterval(animationRef.current);
        };
    }, [credential]);

    if (!credential) return null;

    const handleCopy = (text, fieldName) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleDecryptClick = () => {
        setShowDecryptPrompt(true);
    };

    const handleDecryptConfirm = (shift) => {
        const decrypted = decryptCaesar(credential.passwordCifrada, shift);
        const encrypted = credential.passwordCifrada || '';
        let currentIndex = 0;

        setShowDecryptPrompt(false);

        // Clear any existing animation
        if (animationRef.current) clearInterval(animationRef.current);

        animationRef.current = setInterval(() => {
            if (currentIndex > encrypted.length) {
                clearInterval(animationRef.current);
                setDisplayedPassword(decrypted);
                return;
            }

            const currentText = decrypted.substring(0, currentIndex) + encrypted.substring(currentIndex);
            setDisplayedPassword(currentText);
            currentIndex++;
        }, 50); // Speed: 50ms per character
    };

    const CopyIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
    );

    const CheckIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );

    return (
        <>
            <div className="account-card detail-view-right">
                {/* Decorative Corners */}
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>

                <div className="card-header">
                    <div className="card-title">{credential.provider}</div>
                    <button className="card-close" onClick={onClose}>×</button>
                </div>

                <div className="card-body">
                    <div className="data-group">
                        <label className="data-label">ACCOUNT / EMAIL</label>
                        <div className="copy-row">
                            <div className="data-value-box">
                                {credential.email}
                            </div>
                            <button
                                className="copy-btn"
                                onClick={() => handleCopy(credential.email, 'email')}
                                title="Copy Email"
                            >
                                {copiedField === 'email' ? <CheckIcon /> : <CopyIcon />}
                            </button>
                        </div>
                    </div>

                    <div className="data-group">
                        <label className="data-label">ENCRYPTED PASSWORD</label>
                        <div className="copy-row">
                            <div className="data-value-box" style={{ fontFamily: 'monospace', color: '#06b6d4' }}>
                                {displayedPassword}
                            </div>
                            <button
                                className="copy-btn"
                                onClick={() => handleCopy(displayedPassword, 'password')}
                                title="Copy Password"
                            >
                                {copiedField === 'password' ? <CheckIcon /> : <CopyIcon />}
                            </button>
                        </div>
                    </div>

                    <div className="status-grid">
                        <div
                            className="status-box decrypt-box"
                            onClick={handleDecryptClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <label className="data-label" style={{ cursor: 'pointer' }}>ACTION</label>
                            <div style={{ textAlign: 'center', fontFamily: 'var(--font-display, sans-serif)', color: '#06b6d4', letterSpacing: '1px' }}>
                                DECRYPT
                            </div>
                        </div>
                        <div className="status-box">
                            <label className="data-label">STATUS</label>
                            <div style={{ textAlign: 'center', fontFamily: 'monospace', color: credential.status === 'active' ? '#4ade80' : '#f87171' }}>
                                {credential.status.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Decryption Prompt Modal */}
            {showDecryptPrompt && (
                <DecryptionPrompt
                    onDecrypt={handleDecryptConfirm}
                    onCancel={() => setShowDecryptPrompt(false)}
                />
            )}
        </>
    );
};

export default CredentialDetail;
