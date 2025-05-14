import { useState, useContext } from 'react'
import logo from '../../../public/blacklogoamazon.png'
import { Link, useNavigate } from 'react-router-dom'
import { rootContex } from '../Contex/ContexProvider'

const Loginin = () => {
    const navigate = useNavigate();
    const [udata, setUdata] = useState({
        email : "",
        password : ""
    })
        const {value, setValue} = useContext(rootContex);

    const token = localStorage.getItem('authtoken');

    const sendData = async (e) =>{
        e.preventDefault();
        const {email, password} = udata;
        try {
            if(email === "" || password === ""){
                alert('Please provide details')
            }else{
                const res = await fetch('http://localhost:5500/login',{
                    method : "POST",
                    headers : {
                        Authorization : `Bearer ${token}`,
                        "Content-Type":"application/json"
                    },
                    body : JSON.stringify({email, password})
                });
    
                const data = await res.json();
                if(data.accessToken){
                    console.log(data.accessToken);
                }

                
                if(!res.ok){
                    console.log("Invalid details", data.error)
                    alert('Invalid Details');
                }else{
                    localStorage.setItem('authtoken', data.AccessToken);
                    localStorage.setItem('refreshToken', data.RefreshToken);
                    alert('Login successful')
                    setValue(data);
                    setUdata({...udata, email : "", password : ""});
                    navigate('/')
                }
            }
            
        } catch (error) {
            console.log(error + 'login page error');
        }

    }
  return (
    <section>
        <div>
            <div>
                <img src={logo} alt="" className='w-[200px] m-auto'/>
            </div>

            <form method='POST'>
            <div className='sm:w-[500px] m-auto border space-y-6 py-8 px-4 rounded-md'>
                <h2 className='text-2xl'>Sign In</h2>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Email</label>
                    <input type="email" name='email' onChange={(e) => setUdata({...udata, email: e.target.value})} value={udata.email} className='border rounded-lg p-2 '/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="" className='font-semibold'>Password</label>
                    <input type="password" name='password' onChange={(e) => setUdata({...udata, password : e.target.value})} value={udata.password} className='border rounded-lg p-2'/>
                </div>

                <div>
                    <button className='bg-[#F1C76A] rounded-md w-full p-2' onClick={sendData}>Continue</button>
                </div>
                <Link to={'/forgot-password'} className='w-full md:w-1/2 m-auto text-center'>
                    <button>Forget Password ?</button>
                </Link>
            </div>
            </form>

            <div className='flex justify-center py-10'>
                <Link to={'/'}><p>New To Amazon</p></Link>
            </div>

            <div className='flex justify-center'>
                <Link to={'/signin'} className='border px-16 py-2 bg-[#C3C5C7] rounded-lg'><button>Create Your Amazon Account</button></Link>
            </div>
        </div>
    </section>
  )
}

export default Loginin
