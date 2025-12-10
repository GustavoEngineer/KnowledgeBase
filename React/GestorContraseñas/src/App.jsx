import React, { useState } from 'react';
import SecurityDoor from './components/SecurityDoor';
import LockBox from './components/LockBox';

const App = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handleUnlock = () => {
        setIsUnlocked(true);
    };

    const handleLock = () => {
        setIsUnlocked(false);
    };

    return (
        <>
            {!isUnlocked ? (
                <SecurityDoor onUnlock={handleUnlock} />
            ) : (
                <LockBox onLock={handleLock} />
            )}
        </>
    );
};

export default App;
