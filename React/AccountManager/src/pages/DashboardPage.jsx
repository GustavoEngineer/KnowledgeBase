import React from 'react';

import './DashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                {/* Google Icon */}
                <svg className="icon-btn" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 7.973-3.067 1.96-1.96 2.533-4.773 2.533-7.08 0-.613-.053-1.227-.147-1.853h-10.36Z" fill="currentColor" />
                </svg>

                {/* Microsoft Icon */}
                <svg className="icon-btn" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4 24H0V12.6h11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0h11.4v11.4Zm12.6 0H12.6V0H24v11.4Z" fill="currentColor" />
                </svg>
            </header>
        </div>
    );
};

export default DashboardPage;
