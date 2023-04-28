const cityName = document.querySelector('.city-name');
const degree = document.querySelector('.degree');

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const apiKey = '64517a1e83aa07c580b750e305e6772f';

  try {
    const response = await fetch(`${apiUrl}&appid=${apiKey}`);
    if (!response.ok) throw new Error(`City ${city} not found`);
    const data = await response.json();
    // console.log(data);

    cityName.textContent = data.name;
    degree.textContent = `${Math.round(data.main.temp)} °C`;
  } catch (error) {
    alert(error);
  }
}

export default checkWeather;
