"use client"
import React, { useState } from 'react'
import Button from './Button'
import Form from './Form';
import Image from 'next/image';
import PercentageBar from './PercentageBar';

const testQuestsions: Question[] = [
    {
        question: 'Rate the taste of the goons',
        category: 'taste',
        scores: [5,5,4,4,2,5,5]
    },
    {
        question: 'Rate the filling',
        category: 'filling',
        scores: [5,4,4,3,3,5,1]
    },
    {
        question: 'Rate the transportability',
        category: 'transportability',
        scores: [5,5,3,5,2,5,1]
    },
    {
        question: 'Rate the cost',
        category: 'cost',
        scores: [5,5,4,3,2,5,2]
    },
    {
        question: 'Last question',
        category: 'another',
        scores: [5,5,4,5,2,5,2]
    }
]


export default function RestauranInfo() {
    const [openReview, setOpenReview] = useState(false);

    const handleOpenReview = () => {
        setOpenReview(!openReview)
    }

    return (
        <>
            <section className='grid grid-cols-2 gap-4'>
                <div className='space-y-4'>
                    <h1 className='text-4xl font-bold'>Kowloon</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <p className='text-lg font-medium'>Overall Rating:</p>
                            <div className='flex gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-yellow-500 text-yellow-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-yellow-500 text-yellow-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-yellow-500 text-yellow-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-yellow-500 text-yellow-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-yellow-500 text-yellow-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex justify-end items-end'>
                            <Button text='Add a rating' onClick={handleOpenReview} />
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error sequi illum nisi soluta perferendis earum, veniam exercitationem culpa unde? Enim facilis, voluptatem iusto cumque quae maxime hic. Non, beatae.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequuntur, tenetur, corporis eveniet obcaecati molestias quisquam expedita sequi voluptatum, ex delectus quo dignissimos est totam nulla commodi repellat soluta fugiat.</p>
                    </div>
                </div>
                <div className='w-full aspect-w-1 aspect-h-1'>
                    <div className='h-96 bg-gray-500 rounded-xl overflow-hidden'>
                        <Image
                            src={'https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80'}
                            height={1000}
                            width={1000}
                            priority
                            alt=''
                            className='object-cover object-center h-full w-full'
                        />
                    </div>
                </div>
                <div className='space-y-4'>
                    {testQuestsions.map((item: any, index: number) => {
                        const sum = item.scores.reduce((acc: number, score: number) => acc + score, 0);
                        const avg = (sum / item.scores.length);
                        const avgPercent = (avg / 5 * 100)

                        return (
                            <div key={index} className=''>
                                <h3 className='text-lg font-medium capitalize'>
                                    {item.category}
                                </h3>
                                <PercentageBar completed={avg} percent={avgPercent} />
                            </div>
                        )
                    })}
                </div>
            </section>
            {openReview && (
                <section className='absolute top-0 left-0 w-screen h-screen z-20 bg-gray-600/50 flex justify-center items-center overflow-hidden'>
                    <section className='mx-auto w-full max-w-2xl h-screen overflow-scroll'>
                        <Form 
                            questions={testQuestsions}
                            onClick={handleOpenReview}
                        />
                    </section>
                </section>
            )}
        </>
    )
}
