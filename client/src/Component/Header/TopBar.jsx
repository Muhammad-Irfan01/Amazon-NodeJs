import  { useContext, useEffect, useRef, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { ImCart } from "react-icons/im";
import amazon_PNG25 from '../../../public/amazon_PNG25.png'
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import {rootContex} from '../Contex/ContexProvider';
import { RxHamburgerMenu } from "react-icons/rx";
import ResponsiveBar from './ResponsiveBar';
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';



const TopBar = () => {
    const [sideBar, setSideBar] = useState(false);
    const {DataArr} = useSelector(state => state.FirstReducerData);
    
    const handleHamBurger = () =>{
        setSideBar(!sideBar)
    }
    const [open, setOpen] = useState(false);
    const userManage = () =>{
        setOpen(!open)
    }
    const [text, setText] = useState("");
    const searchRef = useRef(null);

    useEffect(() =>{
        function handleClick(event){
            if(searchRef.current && !searchRef.current.contains(event.target)){
                setText("");
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick)
    }, []);

    const navigate = useNavigate();
    const {value, setValue} = useContext(rootContex);
    console.log(value);
    
    useEffect(() =>{
        userValidation()
    }, []);

    const userValidation = async() =>{
        const token = localStorage.getItem('authtoken')
        const res = await fetch('http://localhost:5500/validuser',{
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`,
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            credentials : "include"
        })

        const data = await res.json();
        if(!res.ok){
            console.log(res.status);
        }else{
            console.log('Valid Data');
            setValue(data)
        }
    }
    
    const userLogout = async() =>{
        const token = localStorage.getItem('authtoken');
        const refreshToken = localStorage.getItem('refreshToken');

        const res2 = await fetch('http://localhost:5500/logout',{
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`,
                'refresh-token' : refreshToken,
            },
        })

        if(!res2.ok){
            console.log(res2.status);
        }else{
            localStorage.removeItem('authtoken')
            // localStorage.removeItem('refreshToken')
            // console.log('LogOut');
            setValue(false);
            navigate('/')
        }
    }
        
  return (
    <section>
        <nav className='relative bg-[#121820] flex justify-between items-center px-10 py-2 sm:py-0'>
        <div className='block md:hidden'>
            {sideBar ? (
                <IoMdClose className='text-white text-2xl' onClick={() => setSideBar(false)}/>
            ) : (
                <RxHamburgerMenu className='block md:hidden text-2xl text-white' onClick={handleHamBurger}/>

            )}
            
           </div>
           <Link to={'/'}>
                <div>
                    <img src={amazon_PNG25} alt="" className='h-8 sm:h-12 w-auto'/>
                </div>
                
           </Link>

            <div className='w-3/6' ref={searchRef}>
            <div className='w-[100%] hidden md:block relative'>
            <div className='flex items-center '>
                <input type="text" onChange={(e) => setText( e.target.value)} value={text} placeholder='Search Product' className='w-full p-2 rounded-s-sm'/>
                <div className='bg-[#FFBD63] p-2 rounded-e-sm'>
                    <IoSearch className='text-2xl text-black mx-1'/>
                </div>
            </div>
            </div>
            {text.length > 0 && text && (
                <li className='absolute m-auto bg-slate-300 rounded top-[96%] list-none w-[400px] p-2'>
                    {
                        DataArr.filter(product => product.mainHeading.toLowerCase().includes(text.toLowerCase())).map((e) =>(
                            <div key={e.id} className='hover:bg-slate-200 p-1 rounded'>
                                <NavLink to={`/getproductone/${e.id}`} onClick={()=>setText('')}>{e.mainHeading}</NavLink>
                            </div>
                        ))
                    }   
                </li>
                )}
            </div>

            <div className='flex items-center text-white sm:space-x-16'>
                { value ? (
                    <Link to={'/'} className='hidden lg:block'><button>Signin</button></Link>
                    
                ) : (
                    <Link to={'/loginin'} className='hidden lg:block'><button>Signin</button></Link>
                )}
                
               
               { value ? (
                <Link to={'/checkout'}>
                <div className='relative'>
                     <ImCart className='text-white text-2xl' />
                     <span className='absolute -top-3 right-0 bg-red-500 text-white text-xs rounded-full sm:px-[4px]'>{value.carts?.length || ''}</span>
                </div>
             </Link>
               ) : (
                <Link to={'/loginin'}>
                    <div className='relative'>
                            <ImCart className='text-white text-2xl' />
                            <span className='absolute -top-3 right-0 bg-red-500 text-white text-xs rounded-full px-[4px]'></span>
                    </div>
                </Link>
               )}
                
               <div className='hidden md:block'>
                
               {value && value.uname ? (
                    <div className='relative' ref={searchRef}>
                    <IoPersonCircleOutline className='text-white text-4xl' onClick={userManage}/>
                    <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-[4px]'>{value.uname[0]?.toUpperCase()} </span>
                    {value && open && (
                        <ul className='absolute bg-black text-white px-2 py-2 right-0 w-[150px]'>
                    <Link to={'/changePassword'} onClick={userManage} className='border-b border-white p-1 cursor-pointer'>Change Password</Link>
                        <button className='p-1 cursor-pointer' onClick={() =>{userLogout(), userManage()}} >Logout</button>
                    </ul>
                    )}
                    </div>
                ) : (
                    <div className='relative'>
                    <IoPersonCircleOutline className='text-white text-4xl'/>
                    <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-[4px]'></span>
                    </div>
                )}
               </div>
            </div>
        </nav>
                    {sideBar && 
                        <div className='absolute top-10 left-0 z-50 border-r border-b'>
                            <ResponsiveBar />
                        </div>
                    }                   
    </section>
  )
}

export default TopBar
