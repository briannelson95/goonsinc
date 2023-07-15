import RestaurantThumbnail from '@/components/RestaurantThumbnail'
import Image from 'next/image'
import React from 'react'

export default function RestaurantsList() {
    return (
        <main className='min-h-screen'>
            <div className='grid grid-cols-3 gap-4 h-full'>
                <RestaurantThumbnail href={'/restaurants/example'} />
                <RestaurantThumbnail href={'/restaurants/example'} />
                <RestaurantThumbnail href={'/restaurants/example'} />
                <RestaurantThumbnail href={'/restaurants/example'} />

            </div>
            All Restaurants
        </main>
    )
}
