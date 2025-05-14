import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {rootContex} from '../Contex/ContexProvider';


const DetailPart = () => {

    const {id} = useParams("");

    const navigate = useNavigate();
    const {value, setValue} = useContext(rootContex);
    const [singData, setSingData] = useState([]);
    
    const getSingData = async () =>{
        const data = await fetch(`http://localhost:5500/getproductone/${id}`,{
            "method" : "GET",
            "headers" : {
                "Content-type" : "application/json"
            }
        })

        const res = await data.json();
        console.log(res)
        if(!data.ok){
            console.log("No Data Found");
        }
         else {
            console.log("GetData");
            setSingData([res]);
        }
    }

    useEffect(() =>{
        setTimeout(getSingData, 1000);
    },[id]);

    const addToCart = async(id) => {
        const AccessToken = localStorage.getItem('authtoken');
        const RefreshToken = localStorage.getItem('refreshToken');
        if(!AccessToken){
            alert('you need to login first');
            return;
        }

        const cartRes = await fetch(`http://localhost:5500/addcart/${id}`, {
            method : 'POST',
            headers : {
                Authorization : `Bearer ${AccessToken}`,
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                singData
            }),
            // credentials : "include"
        })
        console.log(cartRes);
        const data1 = await cartRes.json();
        console.log(data1)
        if(!cartRes.ok){
            console.log('invalid user');
            alert('Invalid user');
        }else{
            alert ('data added to cart');
            setValue(data1);
            navigate('/checkout')
        }
    }
  return (
    <div>
    {singData && Array.isArray(singData) && singData.map(element => ( 

            <section key={element} className='lg:w-4/5 mx-auto flex flex-col lg:flex-row lg:justify-between px-4 lg:px-0'>
                <div className=' py-16 space-y-12'>
                    <div>
                        <img src={element.image} alt="Image" className='m-auto'/>
                    </div>
        
                    <div className='flex justify-evenly text-center'>
                        <button className='bg-[#BC9907] px-8 2xl:px-16 py-2 rounded-full shadow-md' onClick={() => addToCart(element.id)}>Add to Cart</button>
                        <button className='bg-[#BE7A0F] px-8 2xl:px-16 py-2 rounded-full shadow-md'>Buy Now</button>
                    </div>
                </div>
        
                <div className='lg:w-[700px] border rounded-lg'>
                    <div className='border-b space-y-4 py-2 px-2'>
                        <h1 className='text-2xl font-semibold'>{element.mainHeading}</h1>
                        <h3 className='text-lg font-semibold'>{element.subHeading}</h3>
                    </div>
        
                    <div className='text-gray-400 space-y-4 py-4 px-2'>
                        <p>M.R.P : <span className='line-through'>${element.MRP}</span></p>
                        <p>Deal Of the Day : <span className='text-red-400'>${element.Deal}</span></p>
                        <p>You save : <span className='text-red-400'>${element.MRP - element.Deal} ({(element.MRP - element.Deal)/element.MRP *100}%)</span></p>
                        <p className='text-black text-lg'> <span className='text-red-400'>Discount : </span>Grab Now</p>
                        <p className='text-black text-lg'> <span className='text-blue-500'>FREE DELIVERY : </span>NOV 8 - 21</p>
                        <p className='text-black text-lg'> <span className='text-gray-500'>Fastest Delivery : </span>Tomorrow 11AM</p>
                        <p className='text-black text-lg'> <span className='text-gray-500'>About The Iteam : </span>{element.description}</p>
                    </div>
                </div>
            </section>
        ) )}
   </div>
  )
}

export default DetailPart
