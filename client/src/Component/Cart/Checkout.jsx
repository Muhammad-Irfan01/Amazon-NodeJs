import React, { useEffect, useState, useContext } from 'react'
import CheckoutRight from './CheckoutRight'
import { rootContex } from '../Contex/ContexProvider';

const Checkout = () => {

    const [cartData, setCartData] = useState([]);
        console.log(cartData);
    const {value, setValue} = useContext(rootContex);

  const [price, setPrice] = useState(0);

    useEffect(() =>{
        subTotal();
    }, [cartData])

    const subTotal = () =>{
        const total = cartData.reduce((sum, item) => sum + (item.price || 0), 0);
        setPrice(total);
    }

    const dataBuy = async() =>{
        const token = localStorage.getItem('authtoken');
        const res = await fetch('http://localhost:5500/checkout',{
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`,
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials : "include"
        })
         const data = await res.json();
        //  console.log(data);
         
         if(!res.ok){
            console.log("error");
        }else{
            setCartData([data.carts]);
        }
    }

    useEffect(() =>{
        dataBuy();
    },[]);

   const removeData = async() => {
        try {
            const res = await fetch('http://localhost:5500/remove/id',{
                method : "DELETE",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application-json"
                },
                credentials : "include"
            })
            const delData = await res.json();
            console.log(delData);
            if(delData.status === 400 || !delData){
                console.log("Error");
            }else{
                console.log('User Deleted');
                setCartData(delData);
                dataBuy();
            }
            
        } catch (error) {
            console.log("error");
        }
    }

  return (
    <div>
    
    <section className='flex flex-col lg:flex-row justify-around my-12 space-y-6 lg:space-y-0'>
        <div className=' bg-white shadow-xl px-6 py-10 rounded-lg'>
            <div className='border-b space-y-6'>
                <h1 className='text-4xl '>Shopping Cart</h1>
                <div className='flex justify-between'>
                    <h2 className='text-[#009DE9]'>Select all items</h2>
                    <p>Price</p>
                </div>
            </div>

            {cartData && Array.isArray(cartData) && cartData.flat().map((item, index) =>(
                <div key={index} className='flex flex-col md:flex-row border-b py-4'>
                        <div>
                            <img src={item.image} alt="Image" className='w-[150px] px-4'/>
                        </div>

                        <div className='flex flex-col space-y-6'>

                            <div className='flex justify-between'>
                                <div className='space-y-4'>
                                    <h1 className='text-2xl font-semibold'>{item.mainHeading} </h1>
                                    <p className='text-[#C06C3A]'>Usually dispatched in 8 days</p>
                                    <p className='text-gray-400'>Eligible for FREE Shipping</p>
                                </div>
                                    <h2 className='text-2xl font-semibold'>{item.price}</h2>
                            </div>

                            <div className='flex items-center space-x-6'>
                                <input type="number" className='border w-[50px] rounded-lg shadow-xl border-[#DDDDDD]'/>
                                <button className='text-[#009DE9]' onClick={() => removeData(item.id)}>Delete</button>
                                <hr className='w-[1px] h-[10px] bg-black'/>
                                <button className='text-[#009DE9]'>Save Or Later</button>
                                <hr className='w-[1px] h-[10px] bg-black'/>
                                <button className='text-[#009DE9]'>See More Like This</button>
                            </div>
                        </div>
                </div>
                 ))}
                 {cartData && Array.isArray(cartData) && cartData.map((elem) =>(
                    <div key={elem}>
                        <h1 className='text-xl font-bold text-end py-2'>
                            Subtotal ({elem.length} Items) : 
                            ${cartData.flat().reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2)} 
                        </h1>
                    </div>

                 ))}
        </div>

            <div className='w-full lg:w-auto'>
                <CheckoutRight item={cartData}/>
            </div>
        </section>
           
    </div>
  )
}

export default Checkout
