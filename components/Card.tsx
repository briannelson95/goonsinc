import React from 'react'

export default function Card({children, noPadding, overflowScroll}: {children: React.ReactNode, noPadding?: boolean, overflowScroll?: boolean}) {
    return (
        <div className={`bg-white relative rounded-xl shadow-md shadow-gray-300 ${noPadding && 'p-0'} overflow-scroll p-4`}>{children}</div>
    )
}
