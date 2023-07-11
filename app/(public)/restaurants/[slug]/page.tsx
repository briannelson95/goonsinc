import Form from '@/components/Form'
import RestauranInfo from '@/components/RestauranInfo'
import React from 'react'
import { cookies } from 'next/headers'

export default function SingleRestaurantPage() {
    const cookieStore = cookies()
    // console.log(cookieStore.getAll()[1].value)

    return (
        <main className='w-full'>
            <RestauranInfo cookie={cookieStore.getAll()[1].value} />
        </main>
    )
}
