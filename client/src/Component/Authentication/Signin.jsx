import { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import logo from '../../../public/blacklogoamazon.png'


const Signin = () => {
    const navigate = useNavigate();
    const [udata, setUdata] = useState({
        uname : "",
        email : "",
        password : "",
        cpassword : "",
        mobile : ""
    });
//   console.log(udata);

    const sendData = async(e) =>{
        e.preventDefault();
        const {uname, email, password, cpassword, mobile} = udata;

        if(uname === ""){
            alert('PLease Provide UserName')
        }else
        if(email === ""){
            alert('PLease Provide Email')
        }else
        if(password === ""){
            alert('PLease Provide Password')
        }else
        if(cpassword === ""){
            alert('PLease Provide Confirm Password')
        }else
        if(mobile === ""){
            alert('PLease Provide Mobile')
        }else{

            const res = await fetch('http://localhost:5500/register',{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({uname, email, password, cpassword, mobile})
            });
            
            const data = await res.json();
            if(res.status === 400 || !data){
               alert('No data register');
            }else{
               alert('Data Register successfully');
               setUdata({...udata,
                    uname : "",
                    email : "",
                    password : "",
                    cpassword : "",
                    mobile : ""
            });
                navigate('/loginin')
            }
        }
    }     


  return (
    <section>
        <div className=''>
            <div className='h-[100px] flex items-start justify-center'>
                <img src={logo} alt="" className='w-[200px] m-auto'/>
            </div>

            <div className='sm:w-[500px] m-auto border space-y-6 py-6 px-4 rounded-md'>
                <h2 className='text-2xl'>Sign In</h2>
                <form method='POST'>
                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Username</label>
                    <input type="text" name='uname' onChange={(e) => setUdata({...udata, uname : e.target.value})} value={udata.uname} className='border rounded-lg p-2'/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Email</label>
                    <input type="email" name='email' onChange={(e) => setUdata({...udata, email : e.target.value})} value={udata.email} className='border rounded-lg p-2 '/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Password</label>
                    <input type="password" name='passowrd' onChange={(e) => setUdata({...udata, password : e.target.value})} value={udata.password} className='border rounded-lg p-2'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Confirm Password</label>
                    <input type="password" name='cpassowrd' onChange={(e) => setUdata({...udata, cpassword : e.target.value})} value={udata.cpassword} className='border rounded-lg p-2'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Mobile</label>
                    <input type="number" name='mobile' onChange={(e) => setUdata({...udata, mobile : e.target.value})} value={udata.mobile} className='border rounded-lg p-2'/>
                </div>
                
                <div>
                    <button className='bg-[#F1C76A] rounded-md w-full p-2' onClick={sendData}>Continue</button>
                </div>

                <hr className='w-[300px] h-[1px] bg-gray-200 m-auto'/>

                <div className='flex justify-center'>
                    <Link to={'/loginin'} className=' px-16 py-2'><button>Already Have an Account.?</button></Link>
                </div>
                </form>
            </div>

        </div>
    </section>
  )
}

export default Signin
