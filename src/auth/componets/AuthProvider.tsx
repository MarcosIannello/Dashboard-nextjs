'use client'

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: props) => {
    return (
        <SessionProvider >
            {children}
        </SessionProvider>
    )
}


