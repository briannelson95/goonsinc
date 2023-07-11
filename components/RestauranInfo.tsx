"use client"
import React, { use, useEffect, useState } from 'react'
import Button from './Button'
import Form from './Form';
import Image from 'next/image';
import PercentageBar from './PercentageBar';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const testQuestsions: Question[] = [
    {
        category: 'cost',
        question: 'Rate the cost'
    },
    {
        category: 'crisp',
        question: 'Rate the crispiness'
    },
    {
        category: 'taste',
        question: 'Rate the taste'
    },
    {
        category: 'transport',
        question: 'Rate the transport'
    }
]


export default function RestauranInfo({cookie}: {cookie: string}) {
    const supabase = useSupabaseClient();
    const [openReview, setOpenReview] = useState(false);
    const [categoryData, setCategoryData]:any = useState([]);
    const [averageScore, setAverageScore]:any = useState();

    useEffect(() => {
        if (openReview) {
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('html')[0].style.overflow = 'unset';
        }
    }, [openReview])

    useEffect(() => {
        supabase.from('ratings')
            .select()
            .then(result => {
                const data = result.data;

                const transformData = () => {
                    const transformedArr:any = [];
                    const categories = ['taste', 'cost', 'crisp', 'transport'];

                    categories.forEach(category => {
                        const scores = data?.map(item => item[category]);
                        const categoryObj = {
                            category: category,
                            scores: scores
                        };
                        transformedArr.push(categoryObj);
                    });

                    setCategoryData(transformedArr);
                };

                transformData();
                
            })
    }, []);

    useEffect(() => {
       const calculateAverageScore = () => {
            const scoresArray = categoryData.flatMap((item: { scores: number; }) => item.scores);
            const totalScores = scoresArray.reduce((sum: number, score: number) => sum + score, 0);
            const average = totalScores / scoresArray.length;
            setAverageScore(average);
        };
      
        calculateAverageScore();
    }, [categoryData]);


    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleOpenReview = () => {
        scrollToTop();
        setOpenReview(!openReview);
    }

    // supabase.from('ratings')
    //     .select()
    //     .eq('cookie', cookie)
    //     .then(result => {
    //         console.log(result)
    //         if(!result.error) {
    //             const data = result.data[0]

    //             setCost(data.cost)
    //             setCrisp(data.crisp)
    //         }
    //     })

    console.log(categoryData)

    return (
        <>
            <section className='grid grid-cols-2 gap-4'>
                <div className='space-y-4'>
                    <h1 className='text-4xl font-bold'>Kowloon</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <p className='text-lg font-medium'>Overall Rating:</p>
                            <div className='flex gap-1'>
                                {Array.from({ length: Math.floor(averageScore) }, (_, index) => (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-yellow-500 text-yellow-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                ))}
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
                    {categoryData.length && (
                        <h3 className='text-2xl font-semibold'>
                            {categoryData[0].scores.length} Total Reviews
                        </h3>
                    )}
                    {categoryData.map((item: any, index: number) => {
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
                            cookie={cookie}
                            parent_id={1}
                            onClick={handleOpenReview}
                        />
                    </section>
                </section>
            )}
        </>
    )
}
