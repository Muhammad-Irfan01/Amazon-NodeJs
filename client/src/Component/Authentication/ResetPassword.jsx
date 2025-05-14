import  { useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from '../../../public/blacklogoamazon.png'

const ResetPassword = () => {
    const {token} = useParams
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5500/reset-password/${token}`,{
                method : 'POST',
                headers : {'content-type' : 'application/json'},
                body : JSON.stringify({password})
            })
            const data = await res.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('error reset password', error)
        }
    }
  return (
     <section>
               <div>
                   <div>
                       <img src={logo} alt="" className='w-[200px] m-auto'/>
                   </div>
       
                   <form method='POST' onSubmit={handleSubmit} className='pb-12' >
                   <div className='sm:w-[500px] m-auto border space-y-6 py-8 px-4 rounded-md'>
                       <h2 className='text-2xl'>Change Password</h2>
       
                       <div className='flex flex-col'>
                           <label htmlFor="" className='font-semibold'>New Password</label>
                           <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded-lg p-2 '/>
                       </div>
       
                       <div>
                           <button type='submit' className='bg-[#F1C76A] rounded-md w-full p-2'>Continue</button>
                       </div>
                   </div>
                   </form>
                   {message && <p>{message}</p>}
               </div>
           </section>
  )
}

export default ResetPassword