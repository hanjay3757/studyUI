import React, { createContext, useContext, useState } from 'react'

const CounterContext = createContext(null);

export const CounterProvider = ({ children }) => {
    const [countState, setCountState] = useState(0);
    return (
        <CounterContext.Provider value={{ countState, setCountState }} >
            {children}
        </CounterContext.Provider>
    )
}

export const useCounter = () => useContext(CounterContext);