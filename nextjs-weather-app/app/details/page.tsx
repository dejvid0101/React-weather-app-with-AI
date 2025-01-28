import React from 'react'
import { getWeatherInfo } from '../modules/remoteServices';
import Currentweather from './components/currentweather'
import Forecast3days from './components/forecast3days'
import TodayComponent from './components/today_component';
import TomorrowComponent from './components/tomorrow_component';

//page server component receives url params through props
export default async function page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined };}) {

  // add error handling for when url paramaters aren't supplied or incorrect
const weatherObject=await getWeatherInfo(searchParams?.name);

//weather details for location
    return (
      <>
      <div className='modalPlaceholder invisible p-2 absolute w-96 h-[40rem] xl:w-[36rem] xl:h-[40rem] bg-indigo-50 border-indigo-900 border-solid border-8 rounded-xl right-2/4 top-2/4 -translate-y-2/4 translate-x-2/4'></div>
    <div className="content container grid mx-4 xl:mx-32 w-auto h-auto gap-y-4 xl:gap-4 xl:grid-cols-2 max-w-screen-md xl:max-w-none">
<div className="text-indigo-800 h-32 text-4xl antialiased text-5xl font-poppins grid items-center xl:col-span-2">{searchParams?.name}, {searchParams?.region}</div>
<Currentweather WeatherProp={weatherObject}></Currentweather>
<TodayComponent WeatherProp={weatherObject}></TodayComponent>
<TomorrowComponent WeatherProp={weatherObject}></TomorrowComponent>
<Forecast3days WeatherProp={weatherObject}></Forecast3days>
    </div>
    </>
  )
}


