import React from 'react'
import {weatherDescMap, prepareImg} from '../../modules/weathercodes'


export default function currentweather({WeatherProp}:any) {
  return (
    <>
    <div className='grid [grid-template-rows:repeat(12,minmax(0,1fr))] xl:my-16 float-left inline w-11/12 antialiased h-96 bg-white border-2 border-indigo-400 rounded-md'>
      <div className='text-slate-700 justify-center flex items-center'>
        <div className='font-poppins text-lg'>RIGHT NOW</div>
      </div>
    <div className='[grid-row:span_10;] grid grid-cols-2'>
      <div className='grid grid-rows-2'>

        {/* weathertype */}
        <div className='flex items-center justify-center'>
          <img className='w-1/2' src={WeatherProp.current.condition.icon}></img>
  
        </div>
        {/* wind speed and direction */}
        <div className='text-xl font-poppins flex items-center justify-center'>
        {WeatherProp.current.condition.text}
        </div>

      </div>
      {/* temp */}
      <div className='flex items-center justify-center grid grid-rows-4'>
        <div style={{gridRow: 2}} className='font-poppins text-6xl'>{WeatherProp.current.temp_c}°C</div>
        <div style={{gridRow: 3}} className='font-poppins text-slate-500 text-sm'>Temp feel: {WeatherProp.current.feelslike_c}</div>
       
      </div>


    </div>

   
    <div className='font-poppins text-slate-700 flex items-center'>
      <div>{WeatherProp.location.localtime.substring(11)} local time</div>
    </div>
    
  </div>
    </>
  )
}
