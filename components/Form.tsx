"use client"

import React, { useState } from 'react'
import Card from './Card'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';

export default function Form({questions, onClick, cookie, parent_id}: {questions: Question[], onClick?: any, cookie: string | null, parent_id: number}) {
    const supabase = useSupabaseClient();

    const [characters, setCharacters]= useState(0)
    const [ratings, setRatings]:any = useState({});
    const [review, setReview] = useState();
    const [openDesc, setOpenDesc] = useState(false)

    const handleRatingChange = (title: any, rating: any) => {
        setRatings((prevState: any) => ({ ...prevState, [title]: rating }));
    };

    const handleReview = (e: any) => {
        setCharacters(e.target.value.length)
        setReview(e.target.value)
    }

    // const handleSeeDesc = () => {
    //     setOpenDesc(!openDesc)
    // }

    const handleSumbit = (e: any) => {
        e.preventDefault()
        supabase.from('ratings')
            .select()
            .eq('cookie', cookie)
            .eq('parent', parent_id)
            .then(result => {
                if (result.data?.length) {
                    // User has already submitted a review for the specific parent_id
                    console.log('User has already submitted a review for this parent_id');
                    toast.error("You've already reviewed this restaurant")
                    // Handle accordingly (e.g., disable submission)
                } else {
                    // User has not submitted a review for the specific parent_id
                    console.log('Allow submission');
                    supabase.from('ratings')
                        .insert({
                            parent: parent_id,
                            cookie,
                            filling: ratings.filling,
                            wrap: ratings.wrap,
                            ratio: ratings.ratio,
                            crisp: ratings.crisp,
                            accoutrement: ratings.accoutrement,
                            review
                        })
                        .then(result => {
                            console.log(result)
                            toast.success('Review Submitted!')
                        })
                    // Handle accordingly (e.g., enable submission)
                }
            });

        onClick()
    }
    return (
        <div className='m-2 md:m=0'>
            <Card>
                <button className='absolute z-30 top-2 right-2' onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <form className='pt-2 space-y-4 flex flex-col'>
                    {questions.length > 0 && 
                        questions.map((question: any, index: any) => {
                            const { title, question: questionText } = question;

                            const options = [];

                            for (let i = 1; i <= 5; i++) {
                                const optionId = `${title}-${i}`;

                                options.push(
                                    <div key={optionId}>
                                        <input
                                            type='radio'
                                            name={title}
                                            id={optionId}
                                            value={i}
                                            className='peer hidden'
                                            onChange={() => handleRatingChange(title, i)}
                                        />
                                        <label
                                            htmlFor={optionId}
                                            className='block cursor-pointer select-none rounded-xl p-2 text-center bg-yellow-300/50 hover:bg-yellow-300/80 peer-checked:bg-yellow-500 peer-checked:font-medium'
                                        >
                                            {i}
                                        </label>
                                    </div>
                                );
                            }

                            return (
                                <fieldset key={index} className='pb-2 border-b'>
                                    <legend className='text-xl font-bold mb-2 w-full relative'>
                                        {question.question}:
                                        {/* {question.description && (
                                            <button className='absolute top-1 right-1' onClick={handleSeeDesc}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg>
                                            </button>
                                        )} */}
                                    </legend>
                                    {/* <div className={`-mt-2 mb-2 text-sm text-gray-500 ${openDesc ? 'block': 'hidden'}`}>
                                        {question.description}
                                    </div> */}
                                    <div className='grid grid-cols-5 gap-2'>{options}</div>
                                </fieldset>
                            );
                        }
                    )}
                    <fieldset className='w-full'>
                        <legend className='text-xl font-bold'>
                            Tell us what you think
                        </legend>
                        <div className='w-full relative'>
                            <textarea 
                                placeholder='Add a short review' 
                                className='p-2 border rounded-xl w-full relative'
                                rows={2}
                                maxLength={180}
                                onChange={handleReview}
                            />
                            <p className='absolute bottom-2 right-3 text-sm text-gray-400'>{characters}/180</p>
                        </div>
                    </fieldset>
                    <button 
                        className='self-end cursor-pointer px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 rounded-xl'
                        onClick={handleSumbit}
                        disabled={!cookie}
                    >
                        Share my review
                    </button> 
                </form>
            </Card>
        </div>
    )
}
