import React, { useState } from 'react';
import SecurityDoor from './components/SecurityDoor';
import CenterPasswords from './components/CenterPasswords';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleUnlock = (key) => {
        console.log("Simulación de desbloqueo con llave:", key);
        setIsAuthenticated(true);
    };

    if (isAuthenticated) {
        return <CenterPasswords onLogout={() => setIsAuthenticated(false)} />;
    }

    return (
        <SecurityDoor onUnlock={handleUnlock} />
    );
};

export default App;
