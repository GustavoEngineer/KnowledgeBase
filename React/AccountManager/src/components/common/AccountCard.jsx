import React from 'react';
import './AccountCard.css';

const AccountCard = ({ accounts, provider, onClose }) => {
    return (
        <div className="account-card-overlay">
            <div className="account-card large-card">
                <div className="card-content">
                    <div className="card-header">
                        <div className="card-title">{provider} Accounts</div>
                        <button className="card-close" onClick={onClose}>×</button>
                    </div>

                    <div className="card-details-list">
                        {accounts && accounts.length > 0 ? (
                            accounts.map((account) => (
                                <div key={account.id} className="account-item">
                                    <div className="detail-row">
                                        <span className="detail-label">Email Handle</span>
                                        <span className="detail-value">{account.email}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Status</span>
                                        <span className="detail-value">{account.status}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-accounts-msg">
                                No accounts found for this provider.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountCard;
