import {
  updateCityName,
  updateDegree,
  updateWeatherImage,
  updateFeelsLike,
  updateWindSpeed,
  updateHumidity,
} from './dom';

import { updateDateTime } from './date-time';

const weatherImageMap = {
  Clear: 'sunny-w.svg',
  Clouds: 'cloudy.svg',
  Rain: 'rainy.svg',
  Mist: 'mist.svg',
  Drizzle: 'drizzle.png',
  Snow: 'snow.svg',
  Haze: 'haze.svg',
};

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const apiKey = '64517a1e83aa07c580b750e305e6772f';

  try {
    const response = await fetch(`${apiUrl}&appid=${apiKey}`);
    if (!response.ok) throw new Error(`City ${city} not found`);
    const data = await response.json();
    // console.log(data);

    updateCityName(data.name);
    updateDegree(data.main.temp);
    updateFeelsLike(data.main.feels_like);
    updateWindSpeed(data.wind.speed);
    updateHumidity(data.main.humidity);

    updateDateTime(city);

    const weatherCondition = data.weather[0].main;
    const weatherImageFileName = weatherImageMap[weatherCondition];
    updateWeatherImage(weatherImageFileName);
  } catch (error) {
    alert(error);
  }
}

export default checkWeather;
