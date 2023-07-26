import urlFor from '@/lib/urlFor'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RestaurantThumbnail({restaurant}: {restaurant: any}) {
    return (
        <Link href={`/restaurants/${restaurant.slug.current}`} className='w-full h-52 md:h-64 bg-gray-500 shadow-md shadow-gray-300 rounded-lg overflow-hidden relative cursor-pointer'>
            <div className='bg-black/40 z-10 h-full w-full absolute top-0 left-0 flex justify-center items-center hover:scale-125 transition-all duration-200'>
                <h2 className='text-4xl font-bold text-white text-center'>
                    {restaurant.title}
                </h2>
            </div>
            {restaurant.featuredImage ? (
                <Image
                    src={urlFor(restaurant.featuredImage.image).url()}
                    height={1000}
                    width={1000}
                    alt=''
                    className='w-full h-full overflow-hidden object-cover z-0 absolute top-0 left-0'
                />
            ) : (
                <div className='w-full h-full overflow-hidden object-cover z-0 bg-orange-500' />
            )}
            
                   
        </Link>
    )
}
