"use client"
import React, { useEffect, useState } from 'react'
import Button from './Button'
import Form from './Form';
import Image from 'next/image';
import PercentageBar from './PercentageBar';;
import urlFor from '@/lib/urlFor';
import { PortableText } from '@portabletext/react';
import { RichTextComponent } from './RichTextComponent';
import { supabase } from '@/lib/supabase.client';

export default function RestauranInfo({restaurantData, ip}: {restaurantData: any, ip: string | null}) {
    const [openReview, setOpenReview] = useState(false);
    const [categoryData, setCategoryData]:any = useState([]);
    const [averageScore, setAverageScore]:any = useState();
    const [parent, setParent]:any = useState();

    useEffect(() => {
        if (openReview) {
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('html')[0].style.overflow = 'unset';
        }
    }, [openReview])

    useEffect(() => {
        supabase.from('restaurants')
            .select()
            .eq('sanity_id', restaurantData.restaurant._id)
            .then(result => {
                if (!result.error) {
                    setParent(result.data[0].id)
                }
            })

        
    }, [restaurantData.restaurant._id, supabase]);

    fetchRating()

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

    function fetchRating() {
        supabase.from('ratings')
            .select()
            .eq('parent', parent)
            .then(result => {
                // console.log(parent)
                const data = result.data;

                const transformData = () => {
                    const transformedArr:any = [];
                    const categories = ['filling', 'wrap', 'crisp', 'ratio', 'accoutrement'];

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
    }

    const handleOpenReview = () => {
        scrollToTop();
        setOpenReview(!openReview);
        fetchRating();
    }

    return (
        <>
            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='order-2 md:order-1 space-y-4'>
                    <h1 className='text-4xl font-bold'>{restaurantData.restaurant.title}</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <p className='text-lg font-medium'>Overall Rating:</p>
                            <div className='flex gap-1'>
                                {Array.from({ length: Math.floor(averageScore) }, (_, index) => (
                                    <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-yellow-500 text-yellow-500">
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
                        {restaurantData.restaurant.body && (
                            <PortableText value={restaurantData.restaurant.body} components={RichTextComponent} />
                        )}
                    </div>
                </div>
                <div className='order-1 md:order-2 w-full aspect-w-1 aspect-h-1'>
                    <div className='h-32 md:h-96 bg-gray-500 rounded-xl overflow-hidden'>
                        <Image
                            src={urlFor(restaurantData.restaurant.featuredImage.image).url()}
                            height={1000}
                            width={1000}
                            priority
                            alt={restaurantData.restaurant.featuredImage.alt}
                            className='object-cover object-center h-full w-full'
                        />
                    </div>
                </div>
                <div className='order-3 space-y-4'>
                    {categoryData.length && (
                        <h3 className='text-2xl font-semibold'>
                            {categoryData[0].scores ? categoryData[0].scores.length : 0} Total Reviews
                        </h3>
                    )}
                    {categoryData[0]?.scores && categoryData.map((item: any, index: number) => {
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
                            questions={restaurantData.questions}
                            cookie={ip}
                            parent_id={parent}
                            onClick={handleOpenReview}
                        />
                    </section>
                </section>
            )}
        </>
    )
}
