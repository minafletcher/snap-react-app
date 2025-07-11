import { useState } from 'react';
import CurlyArrow from '../../content/Images/curly_arrow.png'

export default function Landing({fadeOut}) {

  return (
    <div
      className={`transition-opacity duration-2000 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className='absolute z-0 flex w-full justify-center top-0 pt-30 pl-100'>
        <img className="w-10 h-full" src={CurlyArrow}></img>
      <h1 className="text-lg">Click me to clear the canvas!</h1>
      </div>

      <div className='absolute z-0 flex w-full h-full justify-center items-center'>
      <h1 className="text-3xl">Click anywhere to create!</h1>
      </div>
    </div>
    
  );
}