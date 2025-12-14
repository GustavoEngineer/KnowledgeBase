import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './DashboardPage.css';
import accountsData from '../utils/Manager/accounts.json';
import AccountCard from '../components/common/AccountCard.jsx';
import CredentialDetail from '../components/common/CredentialDetail.jsx';

const DashboardPage = () => {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedCredential, setSelectedCredential] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleAccountClick = (provider) => {
        const account = accountsData.find(acc => acc.provider.toLowerCase().includes(provider.toLowerCase()));

        // Always reset credential selection when switching or toggling accounts
        setSelectedCredential(null);

        if (selectedAccount && selectedAccount.id === account?.id) {
            setSelectedAccount(null); // Toggle off if same
        } else {
            setSelectedAccount(account || null);
        }
    };

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            navigate('/');
        }, 2000); // Wait for animation
    };

    const getProviderName = (account) => {
        if (!account) return '';
        if (account.provider.toLowerCase().includes('google')) return 'Google';
        if (account.provider.toLowerCase().includes('microsoft')) return 'Microsoft';
        return account.provider.split(' - ')[0];
    };

    const relatedAccounts = selectedAccount
        ? accountsData.filter(acc => acc.provider.toLowerCase().includes(getProviderName(selectedAccount).toLowerCase()))
        : [];

    return (
        <div className="dashboard-container">
            {isLoggingOut && (
                <div className="shutdown-overlay">
                    <div className="shutdown-message">ENCAPSULAMIENTO DEL SISTEMA</div>
                </div>
            )}

            <header className="dashboard-header">
                {/* Google Icon */}
                <svg
                    className={`icon-btn ${selectedAccount?.provider.includes('Google') ? 'active' : ''}`}
                    onClick={() => handleAccountClick('Google')}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 7.973-3.067 1.96-1.96 2.533-4.773 2.533-7.08 0-.613-.053-1.227-.147-1.853h-10.36Z" fill="currentColor" />
                </svg>

                {/* Microsoft Icon */}
                <svg
                    className={`icon-btn ${selectedAccount?.provider.includes('Microsoft') ? 'active' : ''}`}
                    onClick={() => handleAccountClick('Microsoft')}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M11.4 24H0V12.6h11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0h11.4v11.4Zm12.6 0H12.6V0H24v11.4Z" fill="currentColor" />
                </svg>

                {/* Logout Button */}
                <svg
                    className="icon-btn logout-btn"
                    onClick={handleLogout}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
            </header>

            {selectedAccount && (
                <>
                    {/* Unified Account Card showing Info + Credentials List */}
                    <AccountCard
                        account={selectedAccount}
                        credentials={relatedAccounts}
                        onSelectCredential={setSelectedCredential}
                        onClose={() => setSelectedAccount(null)}
                        isShifted={!!selectedCredential}
                        onSwitchAccount={handleAccountClick}
                    />

                    {selectedCredential && (
                        <CredentialDetail
                            credential={selectedCredential}
                            onClose={() => setSelectedCredential(null)}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default DashboardPage;
