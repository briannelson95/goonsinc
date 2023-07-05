import React from 'react'

export default function Button({text, onClick}: {text: string, onClick: any}) {
    return (
        <button 
            className='bg-orange-500 hover:bg-orange-700 transition-all duration-200 hover:shadow-md hover:shadow-gray-300 text-white py-2 px-4 rounded-lg'
            onClick={onClick}
        >
            {text}
        </button>
    )
}
