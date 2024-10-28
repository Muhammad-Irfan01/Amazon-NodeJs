import React from 'react'
import logo from '../../../public/blacklogoamazon.png'
import { Link } from 'react-router-dom'

const Loginin = () => {
  return (
    <section>
        <div>
            <div>
                <img src={logo} alt="" className='w-[200px] m-auto'/>
            </div>

            <div className='sm:w-[500px] m-auto border space-y-6 py-8 px-4 rounded-md'>
                <h2 className='text-2xl'>Sign In</h2>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Email</label>
                    <input type="text" name='email' className='border rounded-lg p-2 '/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Password</label>
                    <input type="text" name='passowrd' className='border rounded-lg p-2'/>
                </div>

                <div>
                    <button className='bg-[#F1C76A] rounded-md w-full p-2'>Continue</button>
                </div>
            </div>

            <div className='flex justify-center py-10'>
                <Link to={'/'}><p>New To Amazon</p></Link>
            </div>

            <div className='flex justify-center'>
                <Link to={'/'} className='border px-16 py-2 bg-[#C3C5C7] rounded-lg'><button>Create Your Amazon Account</button></Link>
            </div>
        </div>
    </section>
  )
}

export default Loginin
