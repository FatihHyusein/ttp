import React from 'react';

export const AuthContext = React.createContext({
    authToken: undefined,
    setAuthToken: () => {
    },
});
