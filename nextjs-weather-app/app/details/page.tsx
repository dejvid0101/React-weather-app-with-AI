import React from 'react'
import Currentweather from './components/currentweather'
import Forecast3days from './components/forecast3days'
import TodayComponent from './components/today_component';
import TomorrowComponent from './components/tomorrow_component';

//ADD ERROR HANDLING FOR WHEN URL PARAMETER IS NOT SUPPLIED

async function getWeatherInfo(cityName: any) {
  // Construct the URL for the WeatherAPI with the city name and API key
  const weatherApiKey = 'b354bae2692245ab994190139241103'; // API key
  const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${cityName}&days=3`;

  try {
      // Fetch the weather data for the given city
      const responseWeather = await fetch(weatherApiUrl, { cache: 'no-store' });

      // Check if the request was successful
      if (!responseWeather.ok) {
          throw new Error('Error fetching weather data');
      }

      // Parse the response as JSON
      const dataWeather = await responseWeather.json();

      // Return the fetched weather data
      return dataWeather;

  } catch (error) {
      // Handle any errors that occur during the fetch
      console.error('Error fetching weather data:', error);
      return null; // Or handle the error as needed
  }
}

//page server component receives url params through props
export default async function page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined };}) {

  // add error handling for when url paramaters aren't supplied or incorrect
const weatherObject=await getWeatherInfo(searchParams?.name);

//weather details for location
    return (
      <>
      <div className='modalPlaceholder invisible p-2 absolute w-96 h-[40rem] lg:w-[36rem] lg:h-[40rem] bg-indigo-50 border-indigo-900 border-solid border-8 rounded-xl right-2/4 top-2/4 -translate-y-2/4 translate-x-2/4'></div>
    <div className="content container grid mx-4 lg:mx-32 w-auto h-auto gap-y-4 lg:gap-4 lg:grid-cols-2">
<div className="text-indigo-800 h-32 text-4xl antialiased text-5xl font-poppins grid items-center lg:col-span-2">{searchParams?.name}, {searchParams?.region}</div>
<Currentweather WeatherProp={weatherObject}></Currentweather>
<TodayComponent WeatherProp={weatherObject}></TodayComponent>
<TomorrowComponent WeatherProp={weatherObject}></TomorrowComponent>
<Forecast3days WeatherProp={weatherObject}></Forecast3days>
    </div>
    </>
  )
}


