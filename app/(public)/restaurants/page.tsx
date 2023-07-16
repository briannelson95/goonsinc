import RestaurantThumbnail from '@/components/RestaurantThumbnail'
import { listRestaurants } from '@/lib/queries'
import { client } from '@/lib/sanity.client'
import Image from 'next/image'
import React from 'react'

export default async function RestaurantsList() {
    const data = await client.fetch(listRestaurants)

    return (
        <main className='min-h-screen'>
            <div className='grid grid-cols-3 gap-4 h-full'>
                {data.length > 0 && (
                    data.map((item: any) => (
                        <RestaurantThumbnail
                            key={item._id}
                            restaurant={item}
                        />
                    ))
                )}
                {/* <RestaurantThumbnail href={'/restaurants/example'} />
                <RestaurantThumbnail href={'/restaurants/example'} />
                <RestaurantThumbnail href={'/restaurants/example'} />
                <RestaurantThumbnail href={'/restaurants/example'} /> */}

            </div>
            All Restaurants
        </main>
    )
}
