import React from 'react'

export default function PercentageBar(props: any) {
    const {completed, percent} = props;
    return (
        <div className='h-6 w-full bg-gray-600 rounded-full'>
            <div className={`h-full bg-yellow-500 rounded-full text-right`} style={{width: `${percent}%`}}>
                <span className='p-2 text-white font-bold'>{`${completed.toFixed(1)}`}</span>
            </div>
        </div>
    )
}
