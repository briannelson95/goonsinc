import Link from 'next/link'
import React from 'react'

export default function Navbar({navigation}: {navigation: any}) {
    return (
        <nav className='bg-white shadow-md shadow-gray-300'>
            <ul className='flex p-3 justify-around items-center'>
                {navigation.length > 0 && (
                    navigation.map((item: any, index: number) => (
                        <li key={index}>
                            <Link href={`../${item.slug.current}`} className='w-full h-full'>
                                {item.title}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </nav>
    )
}
