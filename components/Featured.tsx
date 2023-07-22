"use client"

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react'

export default function Featured() {
    const [featured, setFeatured] = useState();
    const supabase = useSupabaseClient();

    useEffect(() => {
        supabase.from('ratings')
            .select(`
                id,
                filling,
                parent ( id, title )
            `)
            .then(result => console.log(result))
    }, [])

    return (
        <div>Featured</div>
    )
}
