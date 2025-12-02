'use client';

import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [storeInfo, setStoreInfo] = useState({
        name: "Espresso Stories",
        hours: "Seg-Sex: 8h-18h",
        contact: "(11) 1234-5678",
        description: "Um café aconchegante onde histórias são compartilhadas com um bom espresso.",
        image: "/img/defaultImage.png", 
    });

    return (
        <StoreContext.Provider value={{ storeInfo, setStoreInfo }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
