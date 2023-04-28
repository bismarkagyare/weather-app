const weatherImageMap = {
  Clear: 'sunny-w.svg',
  Clouds: 'clouds.png',
  Rain: 'rain.png',
  Mist: 'mist.png',
  Drizzle: 'drizzle.png',
  Snow: 'snow.png',
  Haze: 'haze.png',
};

const cityName = document.querySelector('.city-name');
const degree = document.querySelector('.degree');
const weatherImage = document.querySelector('.weather-icon');

// air conditions
const feelsLike = document.querySelector('.real-feel h3');
const chanceOfRain = document.querySelector('.chance-of-rain h3');
const windSpeed = document.querySelector('.wind h3');
const humidity = document.querySelector('.humidity h3');

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const apiKey = '64517a1e83aa07c580b750e305e6772f';

  try {
    const response = await fetch(`${apiUrl}&appid=${apiKey}`);
    if (!response.ok) throw new Error(`City ${city} not found`);
    const data = await response.json();
    console.log(data);

    cityName.textContent = data.name;
    degree.textContent = `${Math.round(data.main.temp)} °C`;

    // air conditions
    feelsLike.textContent = `${Math.round(data.main.feels_like)} °C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity} %`;

    const weatherCondition = data.weather[0].main;
    const weatherImageFileName = weatherImageMap[weatherCondition];
    weatherImage.src = `images/${weatherImageFileName}`;
  } catch (error) {
    alert(error);
  }
}

export default checkWeather;
