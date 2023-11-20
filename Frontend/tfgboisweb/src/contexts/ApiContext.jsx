// APIContext.js
import React, { createContext, useState } from 'react';

export const APIContext = createContext(null);

export const APIProvider = ({ children }) => {
    const [apiData, setApiData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <APIContext.Provider value={{ apiData, setApiData, isLoading, setIsLoading }}>
            {children}
        </APIContext.Provider>
    );
};
