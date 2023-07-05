import React from 'react'

export default function Navbar() {
    return (
        <nav className='bg-white shadow-md shadow-gray-300'>
            <ul className='flex p-3 justify-around items-center'>
                <li>Logo</li>
                <li>Home</li>
                <li>Restaurants</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}
