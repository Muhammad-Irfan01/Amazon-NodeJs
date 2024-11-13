import React from 'react'

const Footer = () => {
    const footerData =[
        {
            h1 : 'Get To Know Us',
            p : 'About Us',
            p2 : 'Careers',
            p3 : 'Press releases',
            p4 : 'Amazon Cares'
        },
        {
            h1 : 'Connect with Us',
            p : 'Facebook',
            p2 : 'Instagram',
            p3 : 'Twitter',
        },
        {
            h1 : 'Make Money With Us',
            p : 'Facebook',
            p2 : 'Instagram',
            p3 : 'Twitter',
        },
        {
            h1 : 'Make Money With Us',
            p : 'Facebook',
            p2 : 'Instagram',
            p3 : 'Twitter',
        },
    ]
  return (
    <section>
        <div className='bg-[#1F2B3B] text-white flex flex-col md:flex-row justify-evenly py-8 px-2 md:space-y-0 space-y-8'>
            {footerData.map((item,index) =>(
                <div key={index} className='space-y-2'>
                    <h1 className='text-xl font-semibold'>{item.h1}</h1>
                    <p>{item.p}</p>
                    <p>{item.p2}</p>
                    <p>{item.p3}</p>
                    <p>{item.p4}</p>
                    
                </div>
            ))}
        </div>

            <div className='bg-[#0C1219] flex justify-center py-6'>
                <div>
                <img src={'/amazon_PNG25.png'} alt="" className='w-[200px] m-auto'/>
                <p className='text-white text-xs md:text-base px-2'>Condition Of Use & Sale &nbsp;&nbsp;   Privacy Notice &nbsp;&nbsp;  Interest-Based Ads &nbsp;&nbsp;   @1996-2024, Amazon.com, Inc</p>
                </div>
            </div>
    </section>
  )
}

export default Footer
