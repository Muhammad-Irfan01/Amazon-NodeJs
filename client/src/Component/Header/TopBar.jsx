import React from 'react'
import { IoSearch } from "react-icons/io5";
import { ImCart } from "react-icons/im";
import amazon_PNG25 from '../../../public/amazon_PNG25.png'
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";


const TopBar = () => {
  return (
    <section>
        <nav className='bg-[#121820] flex justify-evenly items-center p-1'>
            <div>
                <img src={amazon_PNG25} alt="" className='h-12 w-auto'/>
            </div>

            <div className='w-1/2 flex items-center'>
                <input type="text" className='w-full p-2 rounded-s-sm'/>
                <div className='bg-[#FFBD63] p-2 rounded-e-sm'>
                    <IoSearch className='text-2xl text-black mx-1'/>
                </div>
            </div>

            <div className='flex items-center text-white space-x-16'>
                <Link to={''}><button>SignIn</button></Link>
               
                    <ImCart className='text-white text-2xl'/>
                
                <IoPersonCircleOutline className='text-white text-4xl'/>
            </div>
        </nav>
    </section>
  )
}

export default TopBar
