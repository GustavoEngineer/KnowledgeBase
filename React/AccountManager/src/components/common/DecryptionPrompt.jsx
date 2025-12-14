import React, { useState, useEffect, useRef } from 'react';
import './AccountCard.css';

const DecryptionPrompt = ({ onDecrypt, onCancel }) => {
    const [shiftCount, setShiftCount] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleConfirm = () => {
        if (!shiftCount || isNaN(shiftCount)) {
            // Optional: add visual error shake or toast
            return;
        }
        onDecrypt(parseInt(shiftCount, 10));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleConfirm();
        if (e.key === 'Escape') onCancel();
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="prompt-card" onClick={(e) => e.stopPropagation()}>
                {/* Decorative Corners */}
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>

                <div className="card-header" style={{ marginBottom: '20px' }}>
                    <div className="card-title">SECURITY CLEARANCE</div>
                    <button className="card-close" onClick={onCancel}>×</button>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '1px' }}>
                        ENTER DECRYPTION SHIFT KEY
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        className="cyberpunk-input"
                        value={shiftCount}
                        onChange={(e) => setShiftCount(e.target.value.replace(/\D/g, ''))} // Only numbers
                        onKeyDown={handleKeyDown}
                        placeholder="0"
                        maxLength={2}
                    />

                    <div className="prompt-actions">
                        <button className="action-btn" onClick={onCancel}>CANCEL</button>
                        <button className="action-btn primary" onClick={handleConfirm}>UNLOCK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecryptionPrompt;
