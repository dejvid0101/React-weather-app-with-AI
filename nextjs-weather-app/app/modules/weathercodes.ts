import { getCityInfo } from "./remoteServices";

const weatherDescMap = new Map<string, string>([
    ["0", "Clear skies"],//day.svg
    ["1", "Mainly clear"],//cloudy-day-1.svg
    ["2", "Partly cloudy"],//cloudy-day-2.svg
    ["3", "Overcast"],//cloudy.svg
    ["48", "Fog"],//cloudy.svg
    ["45", "Fog"],//cloudy.svg
    ["61", "Slight rain"],//rainy-1.svg
    ["51", "Slight drizzle"],//rainy-1.svg
    ["53", "Drizzle"],//rainy-1.svg
    ["55", "Drizzle"],//rainy-1.svg
    ["63", "Rain"],//rainy-1.svg
    ["65", "Heavy rain"],//rainy-1.svg,
    ["66", "Freezing rain"],//rainy-1.svg
    ["67", "Freezing rain"],//rainy-1.svg
    ["80", "Isolated showers"],//rainy-1.svg
    ["81", "Rain showers"],//rainy-1.svg
    ["82", "Rain shower"],//rainy-1.svg
    ["71", "A little snow"],//snowy-1.svg,
    ["73", "Snowy"],//snowy-1.svg,
    ["75", "Heavy snowfall"],//snowy-1.svg
    ["77", "Snowy"],//snowy-1.svg,
    ["85", "Snow showers"],//snowy-1.svg,
    ["86", "Snow showers"],//snowy-1.svg,
    ["95", "Thunderstorm"],//snowy-1.svg,
    ["96", "Thunderstorm"],//snowy-1.svg,
    ["99", "Thunderstorm"],//snowy-1.svg,
  ]);

export const weatherDescMapHome = new Map<string, string>([
    ["0", "Clear"], // day.svg
    ["1", "Mostly clear"], // cloudy-day-1.svg
    ["2", "Partly cloudy"], // cloudy-day-2.svg
    ["3", "Cloudy"], // cloudy.svg
    ["48", "Fog"], // cloudy.svg
    ["45", "Fog"], // cloudy.svg
    ["61", "Light rain"], // rainy-1.svg
    ["51", "Light rain"], // rainy-1.svg
    ["53", "Light rain"], // rainy-1.svg
    ["55", "Light rain"], // rainy-1.svg
    ["63", "Rain"], // rainy-1.svg
    ["65", "Heavy rain"], // rainy-1.svg
    ["66", "Freezing rain"], // rainy-1.svg
    ["67", "Freezing rain"], // rainy-1.svg
    ["80", "Showers"], // rainy-1.svg
    ["81", "Showers"], // rainy-1.svg
    ["82", "Showers"], // rainy-1.svg
    ["71", "Snow"], // snowy-1.svg
    ["73", "Snow"], // snowy-1.svg
    ["75", "Snow"] // snowy-1.svg
  ]);

function prepareImg(code:number) {
    
    switch(code) { 
      case 0: { 
         return '\day.svg'
         break; 
      } 
      case 1: { 
        return '/cloudy-day-1.svg'
         break; 
      } 
      case 2: { 
        return '/cloudy-day-2.svg'
         break; 
      } 
      case 3:
      case 48:
      case 45: { 
        return '/cloudy.svg'
         break; 
      } 
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 80:
      case 81: { 
        return '/rainy-1.svg'
         break; 
      } 
      case 61: { 
        return '/rainy-4.svg'
         break; 
      } 
      case 63: { 
        return '/rainy-5.svg'
         break; 
      } 
      case 65: { 
        return '/rainy-6.svg'
         break; 
      } 
      case 71:
      case 85:
      case 77: { 
        return '/snowy-5.svg'
         break; 
      }
      case 73:
      case 75:
      case 86: { 
        return '/snowy-6.svg'
         break; 
      }
      case 95:
      case 96:
      case 99: { 
        return '/thunder.svg'
         break; 
      }
      default: { 
        return '/rainy-1.svg'
         break; 
      } 
   } 
  
  }

  export async function prepareProp(cityName: string, latitude: string, longitude: string) {
    const fetchedObj = await getCityInfo(cityName, latitude, longitude);
    const weathercode = new Number(fetchedObj.current_weather.weathercode);
  
    fetchedObj.weatherdesc = weatherDescMap.get(weathercode.toString());
    switch (fetchedObj.current_weather.weathercode) {
      case 0:
        fetchedObj.imgSrc = '/day.svg';
        break;
      case 1:
        fetchedObj.imgSrc = '/cloudy-day-1.svg';
        break;
      case 2:
        fetchedObj.imgSrc = '/cloudy-day-2.svg';
        break;
      case 3:
      case 48:
        fetchedObj.imgSrc = '/cloudy.svg';
        break;
      case 61:
      case 63:
      case 65:
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        fetchedObj.imgSrc = '/rainy-1.svg';
        break;
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        fetchedObj.imgSrc = '/snowy-1.svg';
        break;
      case 95:
      case 96:
      case 99:
        fetchedObj.imgSrc = '/thunder.svg';
        break;
      default:
        fetchedObj.imgSrc = '/rainy-1.svg';
        break;
    }
  
    return fetchedObj;
  }

  export {weatherDescMap, prepareImg};
