import React from 'react';
import './AccountCard.css';

const AccountCard = ({ account, credentials, onSelectCredential, onClose, isShifted, onSwitchAccount }) => {
    if (!account) return null;

    const isGoogle = account.provider.toLowerCase().includes('google');
    const isMicrosoft = account.provider.toLowerCase().includes('microsoft');

    const getServiceName = (fullProvider) => {
        if (fullProvider.includes('-')) {
            return fullProvider.split('-')[1].trim().toUpperCase();
        }
        return fullProvider.toUpperCase();
    };

    const cardClass = isShifted ? "account-card shifted-left" : "account-card centered-view";

    return (
        <div className={cardClass}>
            {/* Decorative Corners */}
            <div className="corner corner-tl"></div>
            <div className="corner corner-tr"></div>
            <div className="corner corner-bl"></div>
            <div className="corner corner-br"></div>

            <div className="card-header">
                <div className="card-title-group">
                    {/* Google Toggle */}
                    <div
                        className={`provider-toggle ${isGoogle ? 'active' : ''}`}
                        onClick={() => !isGoogle && onSwitchAccount('Google')}
                        title={!isGoogle ? "Switch to Google" : ""}
                    >
                        <div className="provider-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 7.973-3.067 1.96-1.96 2.533-4.773 2.533-7.08 0-.613-.053-1.227-.147-1.853h-10.36Z" />
                            </svg>
                        </div>
                        <div className="provider-text">GOOGLE</div>
                    </div>

                    {/* Microsoft Toggle */}
                    <div
                        className={`provider-toggle ${isMicrosoft ? 'active' : ''}`}
                        onClick={() => !isMicrosoft && onSwitchAccount('Microsoft')}
                        title={!isMicrosoft ? "Switch to Microsoft" : ""}
                    >
                        <div className="provider-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M11.4 24H0V12.6h11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0h11.4v11.4Zm12.6 0H12.6V0H24v11.4Z" />
                            </svg>
                        </div>
                        <div className="provider-text">MICROSOFT</div>
                    </div>
                </div>
                <button className="card-close" onClick={onClose}>×</button>
            </div>

            <div className="card-body">

                <div className="data-group">
                    <label className="data-label">EMAIL HANDLE</label>
                    <div className="data-value-box">
                        {account.email}
                    </div>
                </div>

                <div className="status-grid">
                    <div className="status-box">
                        <label className="data-label">STATUS</label>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: account.status === 'active' ? '100%' : '0%' }}></div>
                        </div>
                    </div>
                    <div className="status-box">
                        <label className="data-label">SYNC</label>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Credentials List Section - Only show if credentials exist */}
                {credentials && credentials.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <div style={{
                            borderBottom: '1px solid rgba(6, 182, 212, 0.3)',
                            marginBottom: '1rem',
                            paddingBottom: '0.5rem',
                            color: '#06b6d4',
                            fontFamily: 'var(--font-display, sans-serif)',
                            fontSize: '1.2rem',
                            letterSpacing: '1px'
                        }}>
                            LINKED CREDENTIALS
                        </div>

                        <div className="credential-list-container">
                            {credentials.map((acc, index) => (
                                <div
                                    key={acc.id}
                                    className="credential-item"
                                    onClick={() => onSelectCredential(acc)}
                                >
                                    <div className="credential-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </div>
                                    <div className="credential-info">
                                        <div className="credential-name">{getServiceName(acc.provider)}</div>
                                    </div>
                                    <div style={{ color: acc.status === 'active' ? '#4ade80' : '#f87171', fontSize: '0.7rem', fontFamily: 'monospace' }}>
                                        {acc.status.toUpperCase()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountCard;
