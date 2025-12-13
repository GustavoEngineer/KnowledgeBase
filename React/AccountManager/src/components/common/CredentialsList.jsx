const CredentialsList = ({ accounts, provider, onClose, onSelect }) => {
    if (!accounts || accounts.length === 0) return null;

    const getServiceName = (fullProvider) => {
        if (fullProvider.includes('-')) {
            return fullProvider.split('-')[1].trim().toUpperCase();
        }
        return fullProvider.toUpperCase();
    };

    return (
        <div className="account-card left-aligned">
            {/* Decorative Corners */}
            <div className="corner corner-tl"></div>
            <div className="corner corner-tr"></div>
            <div className="corner corner-bl"></div>
            <div className="corner corner-br"></div>

            <div className="card-header">
                <div className="card-title">{provider} ACCOUNTS</div>
            </div>

            <div className="card-body" style={{ padding: 0, maxHeight: '600px', overflowY: 'auto' }}>
                <div className="credential-list-container">
                    {accounts.map((acc, index) => (
                        <div
                            key={acc.id}
                            className="credential-item"
                            onClick={() => onSelect(acc)}
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
        </div>
    );
};

export default CredentialsList;
