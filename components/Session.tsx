"use client"

import { supabaseClient } from '@/lib/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import React from 'react'

export default function Session({ children, }: { children: React.ReactNode, }) {
    // const sessionCookie = cookie;

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={null}
        >
            {children}
        </SessionContextProvider>
    )
}
