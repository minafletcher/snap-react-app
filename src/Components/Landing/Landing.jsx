import { useState } from 'react';
import CurlyArrow from '../../content/Images/curly_arrow.png'

export default function Landing({fadeOut}) {

  return (
    <div
      className={`transition-opacity duration-2000 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className='absolute z-0 flex flex-col md:flex-row w-full justify-center items-center top-25 md:top-30 md:pl-75'>
        <img className="w-10 h-full" src={CurlyArrow}></img>
      <p className="text-lg">Click me to clear the canvas!</p>
      </div>

      <div className='absolute top-[50%] z-0 flex w-full text-center justify-center px-5'>
      <h2 className="text-3xl">Click anywhere to create!</h2>
      </div>
    </div>
    
  );
}