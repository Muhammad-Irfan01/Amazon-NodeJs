import {useState, useEffect} from 'react'

const CheckoutRight = ({item}) => {
    console.log(item);
    
    const [price, setPrice] = useState(0);

    useEffect(() =>{
        subTotal();
    }, [item])

    const subTotal = () =>{
        let price = 0;
        // item.map((item) =>(
            {item && (
            price += item
        )}
        // ))
        setPrice(price);
    }

  return (
    <section>
        {item && Array.isArray(item) && item.map((element, index) =>(
        <div key={index} className='bg-white shadow-xl lg:h-[300px] flex items-center justify-center px-4'>
            <div>
                <div className='py-4 space-y-2 px-4'>
                    <p className='text-[#009DE9]'>Your Order is Eligible For FREE Delivery</p>
                    <p>Select this option at checkout. Details</p>
                </div>

                <div className='py-4 px-4 space-y-2'>
                    <h1 className='text-2xl'>Subtotal ({element.length} Items) : <span className='font-semibold'>${item.flat().reduce((total, sum) => total + parseFloat(sum.price || 0), 0).toFixed(2)}</span> </h1>
                    <button className='bg-[#FACB09] w-full py-2 rounded-lg'>Proceed to Buy</button>
                </div>
            </div>
        </div>
        ))}
    </section>
  )
}

export default CheckoutRight
