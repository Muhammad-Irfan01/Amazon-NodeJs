import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { fslider } from './HomeData';
import 'swiper/css/autoplay';
import garnier from '../../../public/garnier.jpg'
import { useState, useEffect } from 'react';
import { getProducts } from '../Redux/Action/Action';
import {useSelector, useDispatch} from "react-redux"


const FSlider = ({h2, sliderWidth, rightSection}) => {

    const { DataArr } = useSelector(state => state.FirstReducerData);
    console.log(DataArr);

    const dispatch = useDispatch();

    useEffect (() =>{
            dispatch(getProducts());
    },[dispatch])

        
    const getSlidesPerView = () => {
        const width = window.innerWidth;
        if(width >= 1440) return 20;
        if (width >= 1080) return 40;  
        if (width >= 676) return 60;   
        return 80;                  
    };
    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

    useEffect(() => {
        
        const handleResize = () => {
            setSlidesPerView(getSlidesPerView());
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
  return (
    <section>
        <div className='flex py-4 px-2 space-x-4'>
            <div className={`${sliderWidth} flex flex-col border-2 py-6 rounded-lg space-y-4`}>
                <div className='flex justify-between px-4 border-b py-2'>
                    <h2 className='text-xl'>{h2}</h2>
                    <button className='border bg-[#1F63D5] px-2 py-2 rounded-md text-white'>View All</button>
                </div>
                <Carousel showThumbs={false} showStatus={false} showIndicators={false} infiniteLoop useKeyboardArrows autoPlay 
                    centerMode={true}
                    centerSlidePercentage={slidesPerView} 
                    interval={1000}
                    className='overflow-hidden'
                >
                    {fslider.map((item, index) => (
                        <div key={index} className='w-[200px]'>
                            <img src={item.image} alt={'Image'} className='h-[250px]'/>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                        </div>
                    ))}
                </Carousel>
            </div>

            {rightSection && (
                <div className='w-full hidden sm:block my-auto'>
                    <div className='flex items-center justify-center border rounded-lg py-6'>
                    <div>
                        <p className='text-xl '>Festive Latest Launches</p>
                        <img src={garnier} alt="Image" className='w-full'/>
                    </div>
                    </div>
                </div>
            )}

        </div>
    </section>
  )
}

export default FSlider
