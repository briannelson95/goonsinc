"use client"
import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import Image from 'next/image'
import urlFor from '@/lib/urlFor'
import Link from 'next/link'
import { supabase } from '@/lib/supabase.client';
import Button from './Button'
import { useRouter } from 'next/navigation'

export default function Featured({restaurant}: {restaurant: any}) {  
    const [parent, setParent]:any = useState();
    const [averageScore, setAverageScore]:any = useState();
    const [categoryData, setCategoryData]:any = useState([]);

    const router = useRouter()

    useEffect(() => {
        supabase.from('restaurants')
            .select()
            .eq('sanity_id', restaurant._id)
            .then(result => {
                if (!result.error) {
                    setParent(result.data[0].id)
                }
            })

        
    }, [restaurant._id, supabase]);

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

    function fetchRating() {
        supabase.from('ratings')
            .select()
            .eq('parent', parent)
            .then(result => {
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
    return (
        <Card>
            <div className='grid grid-cols-8 gap-4'>
                <div className='col-span-5 space-y-2 relative'>
                    <h2 className='text-2xl font-medium'>
                        Our #1 Rated Rangoons
                    </h2>
                    <Link href={`/restaurants/${restaurant.slug.current}`} className='hover:text-orange-600 transition-all duration-200'>
                        <h1 className='text-3xl font-bold'>
                            {restaurant.title}
                        </h1>
                    </Link>
                    <div className='flex gap-1'>
                        {Array.from({ length: Math.floor(averageScore) }, (_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 fill-yellow-500 text-yellow-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        ))}
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid illo recusandae, voluptate minima delectus quia, molestiae maiores dignissimos odit in labore veniam vero at sit? Minus incidunt sunt error rerum.</p>
                    </div>
                    <div className='absolute bottom-1 left-1'>
                        <Button 
                            text={'See Detailed Score'} 
                            onClick={() => router.push(`/restaurants/${restaurant.slug.current}`)}       
                        />             
                    </div>
                </div>
                <div className='col-span-3 rounded-xl overflow-hidden'>
                    <Link href={`/restaurants/${restaurant.slug.current}`}>
                        {restaurant.featuredImage ? (
                            <Image
                                src={urlFor(restaurant.featuredImage.image).url()}
                                height={1000}
                                width={1000}
                                alt=''
                                className='object-cover object-center h-full w-full aspect-square'
                            />
                        ) : (
                            <div className='bg-orange-500 w-full h-full aspect-square overflow-hidden rounded-xl' />
                        )}
                    </Link>
                </div>
            </div>
        </Card>
    )
}
