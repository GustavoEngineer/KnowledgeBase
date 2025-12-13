import React from 'react';
import './AccountCard.css';

const AccountCard = ({ account, onClose }) => {
    if (!account) return null;

    return (
        <div className="account-card">
            {/* Decorative Corners */}
            <div className="corner corner-tl"></div>
            <div className="corner corner-tr"></div>
            <div className="corner corner-bl"></div>
            <div className="corner corner-br"></div>

            <div className="card-header">
                <div className="card-title">{account.provider.split(' - ')[0]}</div>
                <button className="card-close" onClick={onClose}>×</button>
            </div>

            <div className="card-body">
                <div className="data-group">
                    <label className="data-label">IDENTITY ID</label>
                    <div className="data-value-box">
                        {account.id}
                    </div>
                </div>

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
            </div>
        </div>
    );
};

export default AccountCard;
