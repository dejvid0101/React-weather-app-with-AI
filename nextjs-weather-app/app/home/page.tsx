import '../../styles/globals.css';
import React from 'react';
import Citypanelsmall from '../components/citypanelsmall';
const UUID = require('uuid-int');

const gen = UUID(0);

const weatherDescMap = new Map<string, string>([
  ["0", "Vedro"], //day.svg
  ["1", "Pretežno vedro"], //cloudy-day-1.svg
  ["2", "Poluoblačno"], //cloudy-day-2.svg
  ["3", "Oblačno"], //cloudy.svg
  ["48", "Magla"], //cloudy.svg
  ["45", "Magla"], //cloudy.svg
  ["61", "Slaba kiša"], //rainy-1.svg
  ["51", "Slaba kiša"], //rainy-1.svg
  ["53", "Slaba kiša"], //rainy-1.svg
  ["55", "Slaba kiša"], //rainy-1.svg
  ["63", "Kiša"], //rainy-1.svg
  ["65", "Jaka kiša"], //rainy-1.svg
  ["66", "Poledica"], //rainy-1.svg
  ["67", "Poledica"], //rainy-1.svg
  ["80", "Pljuskovi"], //rainy-1.svg
  ["81", "Pljuskovi"], //rainy-1.svg
  ["82", "Pljuskovi"], //rainy-1.svg
  ["71", "Snijeg"], //snowy-1.svg
  ["73", "Snijeg"], //snowy-1.svg
  ["75", "Snijeg"] //snowy-1.svg
]);

async function getCityInfo(cityName:string, latitude: string, longitude: string) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    { cache: 'no-store' }
  );

  // Add error handling
  if (!res.ok) {
    throw new Error(`Failed to fetch weather data: ${res.statusText}`);
  }

  const data = await res.json();
  data.cityName=cityName
  return data;
}

async function prepareProp(cityName:string, latitude: string, longitude: string) {
  const fetchedObj = await getCityInfo(cityName, latitude, longitude);
  var weathercode = new Number(fetchedObj.current_weather.weathercode);
  fetchedObj.weatherdesc = weatherDescMap.get(weathercode.toString());
  switch (fetchedObj.current_weather.weathercode) {
    case 0: {
      fetchedObj.imgSrc = '/day.svg';
      break;
    }
    case 1: {
      fetchedObj.imgSrc = '/cloudy-day-1.svg';
      break;
    }
    case 2: {
      fetchedObj.imgSrc = '/cloudy-day-2.svg';
      break;
    }
    case 3 || 48: {
      fetchedObj.imgSrc = '/cloudy.svg';
      break;
    }
    case 61 || 63 || 65 || 51 || 53 || 55 || 56 || 57: {
      fetchedObj.imgSrc = '/rainy-1.svg';
      break;
    }
    case 71 || 73 || 75 || 77 || 85 || 86: {
      fetchedObj.imgSrc = '/snowy-1.svg';
      break;
    }
    case 95 || 96 || 99: {
      fetchedObj.imgSrc = '/thunder.svg';
      break;
    }
    default: {
      fetchedObj.imgSrc = '/rainy-1.svg';
      break;
    }
  }

  return fetchedObj;
}

// Define latitudes and longitudes for 6 major cities
const cities = [
  { name: 'New York', lat: "40.7128", lon: "-74.0060" },
  { name: 'London', lat: "51.5074", lon: "-0.1278" },
  { name: 'Paris', lat: "48.8566", lon: "2.3522" },
  { name: 'Tokyo', lat: "35.6762", lon: "139.6503" },
  { name: 'Sydney', lat: "-33.8688", lon: "151.2093" },
  { name: 'Cape Town', lat: "-33.9249", lon: "18.4241" }
];

export default async function page() {
  // Fetch weather information for all cities
  const cityInfoPromises = cities.map((city) =>
    prepareProp(city.name, city.lat, city.lon)
  );
  const cityInfos = await Promise.all(cityInfoPromises);

  return (
    <>
      <div className="modalPlaceholder invisible p-2 absolute w-96 h-[40rem] lg:w-[36rem] lg:h-[40rem] bg-indigo-50 border-indigo-900 border-solid border-8 rounded-xl right-2/4 top-2/4 -translate-y-2/4 translate-x-2/4"></div>
      <div className="py-3 content grid grid-cols-2 gap-4 justify-items-center items-center w-full h-auto">
        {cityInfos.map((info, index) => (
          <div
            key={gen.uuid()}
            className={`${
              index % 2 === 0 ? "justify-self-end" : "justify-self-start"
            }`}
          >
            <Citypanelsmall WeatherInfo={info}/>
          </div>
        ))}
      </div>
    </>
  );
  
  
  
  
}
