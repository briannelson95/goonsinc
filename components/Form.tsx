import React from 'react'

export default function Form() {
    return (
        <form className='bg-white rounded-lg p-4'>
            <legend className='text-2xl font-bold'>Question 1</legend>
            <p>How satisfied are you with the taste?</p>
            <ul className="grid w-full gap-6 md:grid-cols-5">
                <li>
                    <input type="radio" id="option1" name="option1" value="1" className="hidden peer" required />
                    <label htmlFor="option1" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">                           
                        <div className="block">
                            <div className="w-full text-lg font-semibold">1</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="option2" name="option2" value="2" className="hidden peer" />
                    <label htmlFor="option2" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">2</div>
                        </div>
                    </label>
                </li>
            </ul>
            {/* <div className='w-full flex justify-between'>
                <div>
                    <input type="radio" id="1" name="1" value="1" className="hidden peer" required />
                    <label htmlFor="1" className="inline-flex items-center justify-between p-5 bg-blue-300/40 rounded-lg cursor-pointer peer-checked:bg-blue-300 hover:bg-blue-300/70">                           
                        <div className="block">
                            <div className="w-full text-lg font-semibold">1</div>
                        </div>
                    </label>
                </div>
                <div>
                    <input type="radio" id="2" name="2" value="2" className="hidden peer" required />
                    <label htmlFor="2" className="inline-flex items-center justify-between p-5 bg-blue-300/40 rounded-lg cursor-pointer peer-checked:bg-blue-300 hover:bg-blue-300/70">                           
                        <div className="block">
                            <div className="w-full text-lg font-semibold">2</div>
                        </div>
                    </label>
                </div>
                <input type="radio" id="3" name="3" value="3" className="hidden peer" required />
                <label htmlFor="3" className="inline-flex items-center justify-between p-5 bg-blue-300/40 rounded-lg cursor-pointer peer-checked:bg-blue-300 hover:bg-blue-300/70">                           
                    <div className="block">
                        <div className="w-full text-lg font-semibold">3</div>
                    </div>
                </label>

                <input type="radio" id="4" name="4" value="4" className="hidden peer" required />
                <label htmlFor="4" className="inline-flex items-center justify-between p-5 bg-blue-300/40 rounded-lg cursor-pointer peer-checked:bg-blue-300 hover:bg-blue-300/70">                           
                    <div className="block">
                        <div className="w-full text-lg font-semibold">4</div>
                    </div>
                </label>

                <input type="radio" id="5" name="5" value="5" className="hidden peer" required />
                <label htmlFor="5" className="inline-flex items-center justify-between p-5 bg-blue-300/40 rounded-lg cursor-pointer peer-checked:bg-blue-300 hover:bg-blue-300/70">                           
                    <div className="block">
                        <div className="w-full text-lg font-semibold">5</div>
                    </div>
                </label>
            </div> */}
        </form>
    )
}
