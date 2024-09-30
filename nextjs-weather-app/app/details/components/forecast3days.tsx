import React from 'react'
import {weatherDescMap, prepareImg} from '../../modules/weathercodes'


function getDate(days: number) {
  const date = new Date();
//get current date and add days
  date.setDate(date.getDate() + days);
  return date;
}

//data to fetch: https://api.open-meteo.com/v1/forecast?latitude=45.8&longitude=15.9&daily=weathercode&daily=temperature_2m_max&timezone=auto&daily=apparent_temperature_max&daily=precipitation_probability_max

export default function forecast3days({ WeatherProp }: any) {
  return (

    <div className='float-left inline w-11/12 h-96 bg-white border-2 grid grid-rows-3 border-indigo-400 rounded-md'>
      <div className='border-b-2 border-indigo-400 grid grid-rows-6'>
        <div className='font-poppins text-lg'>
          {/* display date */}
          {getDate(2).getDate()}/{getDate(2).getMonth() + 1}
        </div>
        <div className='row-span-5 grid grid-cols-3'>
          <div className='flex justify-center'>
            <img className='h-5/6' src={prepareImg(WeatherProp.daily.weathercode[2])}></img>
          </div>
          <div className='flex justify-center'>
            <p className='h-2/6 mt-6 font-poppins text-xl'>{weatherDescMap.get(WeatherProp.daily.weathercode[2].toString())}</p>

          </div>
          <div className='flex justify-center'>
            <div className='h-2/6 mt-6'>
              <span className='font-poppins text-4xl'>{WeatherProp.daily.temperature_2m_max[2]}°C</span>
              <span className='font-poppins'>/{WeatherProp.daily.temperature_2m_min[2]}°C</span>
            </div>
          </div>
        </div>
      </div>

      <div className='border-b-2 border-indigo-400 grid grid-rows-6'>
        <div className='font-poppins text-lg'>
          {getDate(3).getDate()}/{getDate(3).getMonth() + 1}
        </div>
        <div className='row-span-5 grid grid-cols-3'>
          <div className='flex justify-center'>
            <img className='h-5/6' src={prepareImg(WeatherProp.daily.weathercode[3])}></img>
          </div>
          <div className='flex justify-center'>
            <p className='h-2/6 mt-6 font-poppins text-xl'>{weatherDescMap.get(WeatherProp.daily.weathercode[3].toString())}</p>
          </div>
          <div className='flex justify-center'>
            <div className='h-2/6 mt-6'>
              <span className='font-poppins text-4xl'>{WeatherProp.daily.temperature_2m_max[3]}°C</span>
              <span className='font-poppins'>/{WeatherProp.daily.temperature_2m_min[3]}°C</span>
            </div>
          </div>
        </div>
      </div>

      <div className='border-indigo-400 grid grid-rows-6'>
        <div className='font-poppins text-lg'>
          {getDate(4).getDate()}/{getDate(4).getMonth() + 1}
        </div>
        <div className='row-span-5 grid grid-cols-3'>
          <div className='flex justify-center'>
            <img className='h-5/6' src={prepareImg(WeatherProp.daily.weathercode[4])}></img>
          </div>
          <div className='flex justify-center'>
            <p className='h-2/6 mt-6 font-poppins text-xl'>{weatherDescMap.get(WeatherProp.daily.weathercode[4].toString())}</p>
          </div>
          <div className='flex justify-center'>
            <div className='h-2/6 mt-6'>
              <span className='font-poppins text-4xl'>{WeatherProp.daily.temperature_2m_max[4]}°C</span>
              <span className='font-poppins'>/{WeatherProp.daily.temperature_2m_min[4]}°C</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
