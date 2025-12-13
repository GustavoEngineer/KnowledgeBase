import React, { useState } from 'react';
import './AccountCard.css';

const CredentialDetail = ({ credential, onClose }) => {
    const [copiedField, setCopiedField] = useState(null);

    if (!credential) return null;

    const handleCopy = (text, fieldName) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
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
        <div className="account-card center-screen">
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
                            {credential.passwordCifrada || 'N/A'}
                        </div>
                        <button
                            className="copy-btn"
                            onClick={() => handleCopy(credential.passwordCifrada, 'password')}
                            title="Copy Password"
                        >
                            {copiedField === 'password' ? <CheckIcon /> : <CopyIcon />}
                        </button>
                    </div>
                </div>

                <div className="status-grid">
                    <div className="status-box">
                        <label className="data-label">ID REF</label>
                        <div style={{ textAlign: 'center', fontFamily: 'monospace', color: '#94a3b8' }}>
                            {credential.id}
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
    );
};

export default CredentialDetail;
