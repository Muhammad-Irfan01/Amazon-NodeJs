import { useState } from 'react'
import logo from '../../../public/blacklogoamazon.png'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    // console.log(email)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5500/forgot-password',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({email})
            });
            const data = await res.json();
            setMessage(data.message)
        } catch (error) {
            setMessage('error send reset email', error)
        }
    }
  return (
    <section>
           <div>
               <div>
                   <img src={logo} alt="" className='w-[200px] m-auto'/>
               </div>
   
               <form method='POST' className='pb-12' >
               <div className='sm:w-[500px] m-auto border space-y-6 py-8 px-4 rounded-md'>
                   <h2 className='text-2xl'>Change Password</h2>
   
                   <div className='flex flex-col'>
                       <label htmlFor="" className='font-semibold'>Enter Your Email</label>
                       <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded-lg p-2 '/>
                   </div>
   
                   <div>
                       <button onClick={handleSubmit} className='bg-[#F1C76A] rounded-md w-full p-2'>Continue</button>
                   </div>
                        {message && <p>{message}</p>}
                    <Link to={'/loginin'} className='flex justify-center'>Back To Login</Link>
               </div>
               </form>
           </div>
       </section>
  )
}

export default ForgotPassword