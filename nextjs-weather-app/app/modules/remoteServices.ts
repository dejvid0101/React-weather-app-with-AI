export function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Void function to send a message to the chatbot
  export const sendMessageToChatbot = async (message: string): Promise<void> => {
    try {
      await fetch(
        'https://chat.botpress.cloud/a3055457-eacf-4a5d-9ac0-a8d4505f1550/messages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-key':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MzExNzE0NTF9.3pggYoXtQ29zCBIN7mBgyYp3kVnyC21wxKBvjPEzgOM',
          },
          body: JSON.stringify({
            payload: {
              type: 'text',
              text: message,
            },
            conversationId: 'conv_01JDYX3R9BDWT3GZX23865KVX8',
          }),
        }
      );
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      throw error; // Propagate the error for handling in the component
    }
  };
  
  // Function to fetch chatbot messages and return the response as JSON
  export const getChatbotMessages = async (): Promise<any> => {
    try {
  
      const response = await fetch(
        'https://chat.botpress.cloud/a3055457-eacf-4a5d-9ac0-a8d4505f1550/conversations/conv_01JDYX3R9BDWT3GZX23865KVX8/messages',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-user-key':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MzExNzE0NTF9.3pggYoXtQ29zCBIN7mBgyYp3kVnyC21wxKBvjPEzgOM',
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch API response');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      throw error; // Propagate the error for handling in the component
    }
  };
  
export async function getCities() {
    try {
      const res = await fetch(
        'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json',
        { cache: 'no-store' }
      );
  
      if (!res.ok) {
        throw new Error(`Failed to fetch cities: ${res.statusText}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  }

  export async function getCityInfo(cityName: string, latitude: string, longitude: string) {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
        { cache: 'no-store' }
      );
  
      if (!res.ok) {
        throw new Error(`Failed to fetch weather data: ${res.statusText}`);
      }
  
      const data = await res.json();
      data.cityName = cityName;
      return data;
    } catch (error) {
      console.error('Error fetching city info:', error);
      throw error; // Propagate the error
    }
  }

  export async function getWeatherInfo(cityName: any) {
    const weatherApiKey = 'b354bae2692245ab994190139241103'; // API key
    const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${cityName}&days=3`;
  
    try {
      // Fetch the weather data for the given city
      const responseWeather = await fetch(weatherApiUrl, { cache: 'no-store' });
  
      // Check if the request was successful
      if (!responseWeather.ok) {
        throw new Error('Error fetching weather data');
      }
  
      // Parse the response as JSON and return
      return await responseWeather.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null; // Return null or handle the error as needed
    }
  }
  