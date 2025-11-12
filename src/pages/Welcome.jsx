import React from 'react';
import { GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom';


function Welcome() {
  return (
    <div className='bg-violet-700 h-[100vh] min-w-max flex item-center justify-center ' >
        <div className=' flex flex-col items-center justify-center gap-6'>
      <h1 className='text-5xl font-bold text-white '>Smarts Notes </h1>
      <Link to="editor/text">
      <button className='p-2 text-white text-2xl border-white border-2 rounded-xl flex  gap-3'>Get Started <GoArrowRight  className=' text-3xl md-'/></button>
      </Link>
      </div>
      <div>
      
      </div>
    </div>
  )
}

export default Welcome
