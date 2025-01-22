import React from 'react'
import '../../styles/globals.css'

function citypanelsmall({WeatherInfo}:any) {


  return (
    <div id="citypanelsmall" className=" grid grid-cols-2 grid-rows-2 bg-gradient-to-r from-slate-50 to-slate-200 h-56 w-96 rounded-lg" >
      <div className="font-sans font-semibold text-4xl justify-center flex items-center" id="panelsmname">
        <p>{WeatherInfo.cityName}</p>
        </div>
      <div className='mt-5 flex justify-center items-center' id="panelsmweather">
        <img className='w-full' src={WeatherInfo.imgSrc}></img>
      </div>
      <div className='font-sans font-semibold text-4xl flex justify-center items-center' id="panelsmtemp">{WeatherInfo.current_weather.temperature}°C</div>
      <div className='font-sans text-2xl flex justify-center items-center' id="panelsmdesc">{WeatherInfo.weatherdesc}</div>
    </div>
  )
}

export default citypanelsmall;
