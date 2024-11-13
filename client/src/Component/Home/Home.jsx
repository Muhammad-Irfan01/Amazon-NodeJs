import React from 'react'
import Hero from './Hero'
import FSlider from './FSlider'


const Home = () => {
  return (
    <div>
        <Hero />

        <FSlider 
       h2={"Deal of the Day"}
       sliderWidth={"md:w-4/5"}
       rightSection={true}
        />

        <FSlider 
       h2={"Today's Deal"}
       sliderWidth={"w-full"}
       rightSection={false}
        />

        <div className='flex justify-center'>
          <img src={'/banner.jpg'} alt="" />
        </div>

        <FSlider 
          h2={"Best Selling"}
          sliderWidth={"w-full"}
          rightSection={false}
        />

        <FSlider 
          h2={"Upto 80% Off"}
          sliderWidth={"w-full"}
          rightSection={false}
        />
    </div>
  )
}

export default Home