"use client"

import React, { useState } from 'react'
import Card from './Card'

export default function Form({questions, onClick}: {questions: Question[], onClick?: any}) {
    const [characters, setCharacters]= useState(0)

    const handleSumbit = (e: any) => {
        e.preventDefault()

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
                        const questionCategory = question.category;
                        const options = [];

                        for (let i = 1; i <= 5; i++) {
                            const optionId = `${questionCategory}-${i}`;
                            options.push(
                                <div key={optionId}>
                                    <input
                                        type='radio'
                                        name={questionCategory}
                                        id={optionId}
                                        value={i}
                                        className='peer hidden'
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
