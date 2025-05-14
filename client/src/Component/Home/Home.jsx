import React, { useEffect } from 'react'
import Hero from './Hero'
import FSlider from './FSlider'
import { getProducts} from "../Redux/Action/action";
import { useSelector, useDispatch } from 'react-redux';


const Home = () => {

  const {DataArr} = useSelector(state => state.FirstReducerData);
  // console.log(DataArr);
  
  const dispatch = useDispatch();
  
  useEffect(() =>{

    dispatch(getProducts());

  },[dispatch]);

  // console.log(DataArr);
  return (
    <div>
        <Hero />

        <FSlider 
       h2={"Deal of the Day"}
       sliderWidth={"w-full md:w-4/5"}
       rightSection={true}
       data = {DataArr}
        />

        <FSlider 
       h2={"Today's Deal"}
       sliderWidth={"w-full"}
       rightSection={false}
       data = {DataArr}
        />

        <div className='flex justify-center'>
          <img src={'/banner.jpg'} alt="" />
        </div>

        <FSlider 
          h2={"Best Selling"}
          sliderWidth={"w-full"}
          rightSection={false}
          data = {DataArr}
        />

        <FSlider 
          h2={"Upto 80% Off"}
          sliderWidth={"w-full"}
          rightSection={false}
          data = {DataArr}
        />
    </div>
  )
}

export default Home