import '../../styles/globals.css';
import React from 'react';
import Citypanelsmall from '../components/citypanelsmall';
import { prepareProp, weatherDescMapHome } from '../modules/weathercodes';
import { getCityInfo } from '../modules/remoteServices';
const UUID = require('uuid-int');

const gen = UUID(0);

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
