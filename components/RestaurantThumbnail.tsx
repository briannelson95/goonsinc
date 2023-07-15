import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RestaurantThumbnail({href}: {href: string}) {
    return (
        <Link href={href} className='w-full h-64 bg-gray-500 shadow-md shadow-gray-300 rounded-lg overflow-hidden relative cursor-pointer'>
            <div className='bg-black/40 z-10 h-full absolute top-0 left-0 flex justify-center items-center hover:scale-125 transition-all duration-200'>
                <h2 className='text-4xl font-bold text-white text-center'>
                    Restaurant Name
                </h2>
            </div>
            <Image
                src={'https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80'}
                height={1000}
                width={1000}
                alt=''
                className='w-full h-full overflow-hidden object-cover z-0 absolute top-0 left-0'
            />
                   
        </Link>
    )
}
