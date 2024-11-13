import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/blacklogoamazon.png'


const Signin = () => {
  return (
    <section>
        <div className=''>
            <div className='h-[100px] flex items-start justify-center'>
                <img src={logo} alt="" className='w-[200px] m-auto'/>
            </div>

            <div className='sm:w-[500px] m-auto border space-y-6 py-6 px-4 rounded-md'>
                <h2 className='text-2xl'>Sign In</h2>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Username</label>
                    <input type="text" name='username' className='border rounded-lg p-2'/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Email</label>
                    <input type="text" name='email' className='border rounded-lg p-2 '/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Password</label>
                    <input type="text" name='passowrd' className='border rounded-lg p-2'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Confirm Password</label>
                    <input type="text" name='cpassowrd' className='border rounded-lg p-2'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Mobile</label>
                    <input type="number" name='number' className='border rounded-lg p-2'/>
                </div>
                
                <div>
                    <button className='bg-[#F1C76A] rounded-md w-full p-2'>Continue</button>
                </div>

                <hr className='w-[300px] h-[1px] bg-gray-200 m-auto'/>

                <div className='flex justify-center'>
                    <Link to={'/loginin'} className=' px-16 py-2'><button>Already Have an Account.?</button></Link>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Signin
