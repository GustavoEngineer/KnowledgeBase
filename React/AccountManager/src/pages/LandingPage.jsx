import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import { autenticarUsuario } from '../utils/Verification/VerificationGenerator';
import './LandingPage.css';

const LandingPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState('idle'); // idle, processing, success, error
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue) return;

        setStatus('processing');
        setFeedbackMsg('ANTIGRAVITY CHECK IN PROGRESS...');

        try {
            const result = await autenticarUsuario(inputValue);

            if (result.success) {
                setStatus('success');
                setFeedbackMsg('ACCESS GRANTED :: TOKEN RECEIVED');
                // Aquí podrías guardar result.token
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                setStatus('error');
                setFeedbackMsg(result.error ? result.error.toUpperCase() : 'ACCESS DENIED');
            }
        } catch (error) {
            setStatus('error');
            setFeedbackMsg('SYSTEM FAILURE');
        }
    };

    const handleChange = (e) => {
        if (status === 'error') {
            setStatus('idle');
            setFeedbackMsg('');
        }
        setInputValue(e.target.value);
    }

    // Determine status class
    const statusClass = `hud-container status-${status}`;

    return (
        <div className={statusClass}>
            {/* Decorative corner accents */}
            <div className="corner-accent corner-tl"></div>
            <div className="corner-accent corner-tr"></div>
            <div className="corner-accent corner-bl"></div>
            <div className="corner-accent corner-br"></div>

            {/* Scanline Effect */}
            <div className="scanline"></div>

            <div className="status-indicator">
                {status === 'processing' ? 'ANTIGRAVITY :: ACTIVE' : (status === 'error' ? 'SYSTEM ALERT' : (status === 'success' ? 'SYSTEM UNLOCKED' : 'SYSTEM READY'))}
            </div>

            {status === 'error' ? (
                <div className="attention-block">
                    <svg className="attention-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 22H22L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.1" />
                        <path d="M12 8V16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 18H12.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className="attention-title">ATTENTION</h1>
                    <div className="attention-sub">ACCESS DENIED :: BREACH DETECTED</div>
                </div>
            ) : (
                <h1 className="main-header">ENTER ACCESS KEY</h1>
            )}

            {status === 'error' && (
                <div className="binary-deco">
                    <div>01000001</div>
                    <div>01010100</div>
                    <div>01010100</div>
                    <div>01000101</div>
                    <div>01001110</div>
                    <div>01010100</div>
                </div>
            )}

            <div style={{ width: '100%', padding: '0 1rem' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Input
                        type="password"
                        placeholder="ACCESS CODE"
                        value={inputValue}
                        onChange={handleChange}
                        disabled={status === 'processing'}
                        /* Passing style override for Input internals using CSS variables */
                        style={{
                            borderBottomColor: status === 'idle' ? 'rgba(148, 163, 184, 0.2)' : 'var(--active-color)',
                            color: status === 'idle' ? 'var(--color-accent)' : 'var(--active-color)'
                        }}
                    />
                </form>
            </div>

            <div className="footer-msg">
                {feedbackMsg || 'SECURE CONNECTION :: ESTABLISHED'}
            </div>
        </div>
    );
};

export default LandingPage;
