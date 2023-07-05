import React from 'react'

export default function Card({children, noPadding}: {children: React.ReactNode, noPadding?: boolean}) {
    return (
        <div className={`bg-white relative rounded-xl shadow-md shadow-gray-600 ${noPadding && 'p-0'} p-4`}>{children}</div>
    )
}
