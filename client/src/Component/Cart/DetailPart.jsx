import React from 'react'

const DetailPart = () => {
  return (
    <section className='lg:w-4/5 mx-auto flex flex-col lg:flex-row lg:justify-between px-4 lg:px-0'>
        <div className=' py-16 space-y-12'>
            <div>
                <img src={'/amulbutter.jpg'} alt="Image" className='m-auto'/>
            </div>

            <div className='sm:space-x-10 text-center'>
                <button className='bg-[#BC9907] px-8 2xl:px-16 py-2 rounded-full shadow-md'>Add to Cart</button>
                <button className='bg-[#BE7A0F] px-8 2xl:px-16 py-2 rounded-full shadow-md'>Buy Now</button>
            </div>
        </div>

        <div className='lg:w-[700px] border rounded-lg'>
            <div className='border-b space-y-4 py-2 px-2'>
                <h1 className='text-2xl font-semibold'>Amul Butter</h1>
                <h3 className='text-lg font-semibold'>Good For Health Specially for Young Age</h3>
            </div>

            <div className='text-gray-400 space-y-4 py-4 px-2'>
                <p>M.R.P : <span className='line-through'>$200</span></p>
                <p>Deal Of the Day : <span className='text-red-400'>$80</span></p>
                <p>You save : <span className='text-red-400'>$120 (60%)</span></p>
                <p className='text-black text-lg'> <span className='text-red-400'>Discount : </span>Grab Now</p>
                <p className='text-black text-lg'> <span className='text-blue-500'>FREE DELIVERY : </span>NOV 8 - 21</p>
                <p className='text-black text-lg'> <span className='text-gray-500'>Fastest Delivery : </span>Tomorrow 11AM</p>
                <p className='text-black text-lg'> <span className='text-gray-500'>About The Iteam : </span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero magni ducimus modi! Sed fugiat consequuntur nulla expedita, a voluptates voluptate ipsa eveniet fuga ut, quae et vero ullam illo autem.</p>
            </div>
        </div>
    </section>
  )
}

export default DetailPart
