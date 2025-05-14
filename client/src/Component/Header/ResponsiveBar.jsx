import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { ResponsiveMenuItems } from './MenuBarItems';
import { NavLink } from 'react-router-dom';


const ResponsiveBar = () => {
  return (
    <section>
        <div className='w-[250px]'>
            <div className='bg-[#121820] py-[7px]'>
                <IoPersonCircleOutline className='text-white text-4xl'/>
            </div>

            <div className='bg-white flex flex-col gap-4 px-12 py-4'>
                {ResponsiveMenuItems.map((item, index) => (
                    <div key={index} className=''>
                        <NavLink to='/'>
                            <p>{item.name}</p>
                        </NavLink>
                        
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default ResponsiveBar