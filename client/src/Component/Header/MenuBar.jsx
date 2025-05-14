import React from 'react'
import { MenuItems } from './MenuBarItems'
import { Link } from 'react-router-dom'
import nav from '../../../public/nav.jpg'

const MenuBar = () => {
  return (
    <section className='hidden md:block'>
        <nav className='bg-[#212E3F] flex justify-between'>
            <div className='w-full xl:w-[70%] flex p-2 items-center justify-between'>
                {MenuItems.map((route, index) =>(
                    <div key={index}>
                        <Link to={route.path}><button className='text-white '>{route.name}</button></Link>
                    </div>
                ))}
            </div>

            <div className='hidden xl:block'>
                <img src={nav} alt="" className='w-auto' />
            </div>
        </nav>
    </section>
  )
}

export default MenuBar
