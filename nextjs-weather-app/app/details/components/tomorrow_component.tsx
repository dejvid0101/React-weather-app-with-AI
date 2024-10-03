import React from 'react'
import {weatherDescMap, prepareImg} from '../../modules/weathercodes'

export default function tomorrow({WeatherProp}:any) {
  return (
    <>
    <div className='grid [grid-template-rows:repeat(12,minmax(0,1fr))] float-left inline w-11/12 antialiased h-96 bg-white border-2 border-indigo-400 rounded-md'>
      <div className='text-slate-700 flex justify-center items-center'>
        <div className='font-poppins text-lg'>TOMORROW</div>
      </div>
    <div className='[grid-row:span_10;] grid grid-cols-2'>
      <div className='grid grid-rows-4'>

        {/* weathertype */}
        <div className='flex items-center justify-center [grid-row:span_2;]'>
        <img className='w-1/2' src={WeatherProp.forecast.forecastday[1].day.condition.icon}></img>
  
        </div>

          <div className='text-xl font-poppins flex items-center justify-center'>
        {WeatherProp.forecast.forecastday[1].day.condition.text}
        </div>
        <div className='text-xl text-slate-500 font-poppins flex items-center text-sm xl:text-base justify-center'>
        Chance of rain: {WeatherProp.forecast.forecastday[1].day.daily_chance_of_rain}%
        </div>
        {/* wind speed and direction */}
        

      </div>
      {/* temp */}
      <div className='flex items-center justify-center grid grid-rows-4'>
        <div className='grid grid-rows-4 [grid-row:span_2;]'>
        <div className='font-poppins text-slate-500'>Day</div>
          <div className='[grid-row:span_2;] font-poppins text-3xl xl:text-6xl'>{WeatherProp.forecast.forecastday[1].day.maxtemp_c}°C</div>
        </div>
      
        
        <div className='grid grid-rows-4 [grid-row:span_2;]'>
        <div className='font-poppins text-slate-500'>Night</div>
          <div className='[grid-row:span_2;] font-poppins text-3xl xl:text-6xl'>{WeatherProp.forecast.forecastday[1].day.mintemp_c}°C</div>
        </div>
      </div>


    </div>

    </div>
    </>
  )
}
