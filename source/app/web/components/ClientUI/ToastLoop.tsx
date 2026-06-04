import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Messages = [
    'Someone from Ke*** bought PNC Bank Log',
    'Someone from USA viewed PNC Bank Log',
    'Someone from Ug*** bought  Verifed Account',
    'Someone from Rus*** viewed Canada Bank Log',
    'Someone from Ke*** bought WoodForest Bank Log',
    'Someone from Eth*** bought PNC Bank Log',
    'Someone from Eg*** bought PNC Bank Log',
    'Someone from De*** bought PNC Bank Log',
    'Someone from Ke*** viewed PNC Bank Log',
    'Someone from Gh*** sold PNC Bank Log',
    'Someone from Ke*** bought PNC Bank Log',
    'Someone from dj*** viewed PNC Bank Log',
    'Someone from Ke*** posted CANADA Bank Log',
    'Someone from China bought WoodForest Bank Log',
    'Someone from Ke*** posted PNC Bank Log',
    'Someone from USA bought Paypal Bank Log',
    'Someone from Ke*** viewed PNC Bank Log',
    'Someone from Ke*** bought PNC Bank Log',
    'Someone from Lon*** posted PNC Bank Log',
    'Someone from Ke*** bought CashApp Bank Log',
    'Someone from Ke*** viewed USA Bank Log',
    'Someone from Pol*** bought PNC Bank Log',
    'Someone from Ke*** sold PNC Bank Log',
    'Someone from Zam*** bought Bank Log',
    'Someone from Ke*** viewed USA Bank Log',
    'Someone from Ta*** sold PNC Bank Log',
    'Someone from Ke*** bought a Verifed Account',
    'Someone from Mad*** posted PNC Bank Log',
    'Someone from Ke*** bought PNC Bank Log',
    'Someone from Ke*** bought PNC Bank Log',
    'Someone from USA viewed PNC Bank Log',
    'Someone from Ug*** bought  Verifed Account',
    'Someone from Rus*** viewed Canada Bank Log',
    'Someone from Ke*** bought WoodForest Bank Log',
    'Someone from Eth*** bought PNC Bank Log',
    'Someone from Eg*** bought PNC Bank Log',
    'Someone from De*** bought PNC Bank Log',
    'Someone from Ke*** viewed PNC Bank Log',
    'Someone from Gh*** sold PNC Bank Log',
    'Someone from Ke*** bought PNC Bank Log',
    'Someone from dj*** viewed PNC Bank Log',
    'Someone from Ke*** posted CANADA Bank Log',
    'Someone from China bought WoodForest Bank Log',
    'Someone from Ke*** posted PNC Bank Log',
    'Someone from USA bought Paypal Bank Log',
    'Someone from Ke*** viewed PNC Bank Log',
    'Someone from Ke*** bought PNC Bank Log',
    'Someone from Lon*** posted PNC Bank Log',
    'Someone from Ke*** bought CashApp Bank Log',
    'Someone from Ke*** viewed USA Bank Log',
    'Someone from Pol*** bought PNC Bank Log',
    'Someone from Ke*** sold PNC Bank Log',
    'Someone from Zam*** bought Bank Log',
    'Someone from Ke*** viewed USA Bank Log',
    'Someone from Ta*** sold PNC Bank Log',
    'Someone from Ke*** bought a Verifed Account',
    'Someone from Mad*** posted PNC Bank Log',
    'Someone from Ke*** bought PNC Bank Log',
];

const ToastLoop = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const customMessage = Messages[counter % Messages.length]; // Get message from Messages array based on the current counter
            toast.success(customMessage, {
                duration: 1100, // Display toast for 1 second
            });
            setCounter(prevCounter => prevCounter + 1);
        }, 2000); // Interval of 1 second

        return () => clearInterval(interval);
    }, [counter]); // Run only once when component mounts

    return (
        <div>
            {/* Content of your component */}
        </div>
    );
};

export default ToastLoop;
