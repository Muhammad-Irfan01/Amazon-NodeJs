import React from 'react'
import CheckoutRight from './CheckoutRight'

const Checkout = () => {
  return (
    <section className='flex flex-col lg:flex-row justify-around items-center my-12 space-y-6 lg:space-y-0'>
        <div className=' bg-white shadow-xl px-6 py-10 rounded-lg'>
            <div className='border-b space-y-6'>
                <h1 className='text-4xl '>Shopping Cart</h1>
                <div className='flex justify-between'>
                    <h2 className='text-[#009DE9]'>Select all items</h2>
                    <p>Price</p>
                </div>
            </div>

           <div className='flex flex-col md:flex-row border-b py-4'>
                <div>
                    <img src={'/amulbutter.jpg'} alt="Image" className='w-[250px] px-4'/>
                </div>

                <div className='flex flex-col space-y-6'>

                    <div className='flex justify-between '>
                        <div className='space-y-4'>
                            <h1 className='text-2xl font-semibold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea aspernatur ipsa libero corporis nihil, </h1>
                            <p className='text-[#C06C3A]'>Usually dispatched in 8 days</p>
                            <p className='text-gray-400'>Eligible for FREE Shipping</p>
                        </div>
                            <h2 className='text-2xl font-bold'>$200</h2>
                    </div>

                    <div className='flex items-center space-x-6'>
                        <input type="number" className='border w-[50px] rounded-lg shadow-xl border-[#DDDDDD]'/>
                        <button className='text-[#009DE9]'>Delete</button>
                        <hr className='w-[1px] h-[10px] bg-black'/>
                        <button className='text-[#009DE9]'>Save Or Later</button>
                        <hr className='w-[1px] h-[10px] bg-black'/>
                        <button className='text-[#009DE9]'>See More Like This</button>
                    </div>
                </div>
           </div>

           <div>
                <h1 className='text-xl font-semibold text-end py-2'>Subtotal (1 Item) : $75.00 </h1>
           </div>
        </div>

            <div className='w-full lg:w-auto'>
                <CheckoutRight />
            </div>
    </section>
  )
}

export default Checkout
