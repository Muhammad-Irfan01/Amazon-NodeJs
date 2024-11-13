import React from 'react'

const CheckoutRight = () => {
  return (
    <section>
        <div className='bg-white shadow-xl lg:h-[300px] flex items-center justify-center px-4'>
            <div>
                <div className='py-4 space-y-2 px-4'>
                    <p className='text-[#009DE9]'>Your Order is Eligible For FREE Delivery</p>
                    <p>Select this option at checkout. Details</p>
                </div>

                <div className='py-4 px-4 space-y-2'>
                    <h1 className='text-2xl'>Subtotal (1 Items) : <span className='font-semibold'>$75.00</span> </h1>
                    <button className='bg-[#FACB09] w-full py-2 rounded-lg'>Proceed to Buy</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CheckoutRight
