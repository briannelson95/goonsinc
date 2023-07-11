"use client"

import React, { useState } from 'react'
import Card from './Card'
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Form({questions, onClick, cookie, parent_id}: {questions: Question[], onClick?: any, cookie: string, parent_id: number}) {
    const supabase = useSupabaseClient();
    const [characters, setCharacters]= useState(0)
    const [cost, setCost] = useState();
    const [crisp, setCrisp] = useState();
    const [taste, setTaste] = useState();
    const [transport, setTransport] = useState();

    const [ratings, setRatings]:any = useState({});

    const handleRatingChange = (category: any, rating: any) => {
        setRatings((prevState: any) => ({ ...prevState, [category]: rating }));
    };

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
                    // Handle accordingly (e.g., disable submission)
                } else {
                    // User has not submitted a review for the specific parent_id
                    console.log('Allow submission');
                    supabase.from('ratings')
                        .insert({
                            parent: parent_id,
                            cookie,
                            taste: ratings.taste,
                            cost: ratings.cost,
                            transport: ratings.transport,
                            crisp: ratings.cost,
                        })
                        .then(result => {
                            console.log(result)
                        })
                    // Handle accordingly (e.g., enable submission)
                }
            });

        onClick()
    }
    return (
        <Card>
            <button className='absolute z-30 top-2 right-2' onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <form className='space-y-4 flex flex-col'>
                {questions.length > 0 && 
                    questions.map((question: any, index: any) => {
                        const { category, question: questionText } = question;

                        const options = [];

                        for (let i = 1; i <= 5; i++) {
                            const optionId = `${category}-${i}`;

                            options.push(
                                <div key={optionId}>
                                    <input
                                        type='radio'
                                        name={category}
                                        id={optionId}
                                        value={i}
                                        className='peer hidden'
                                        onChange={() => handleRatingChange(category, i)}
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
                                <legend className='text-2xl font-bold mb-2'>{question.question}:</legend>
                                <div className='grid grid-cols-5 gap-2'>{options}</div>
                            </fieldset>
                        );
                    }
                )}
                <fieldset className='w-full'>
                    <legend className='text-2xl font-bold'>
                        Tell us what you think
                    </legend>
                    <div className='w-full relative'>
                        <textarea 
                            placeholder='Add a short review' 
                            className='p-2 border rounded-xl w-full relative'
                            rows={2}
                            maxLength={180}
                            onChange={e => setCharacters(e.target.value.length)}
                        />
                        <p className='absolute bottom-2 right-3 text-sm text-gray-400'>{characters}/180</p>
                    </div>
                </fieldset>
                <button 
                    className='self-end cursor-pointer px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 rounded-xl'
                    onClick={handleSumbit}
                >
                    Share my review
                </button> 
            </form>
        </Card>
    )
}
