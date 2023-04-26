async function checkWeather() {
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric';
  const apiKey = '64517a1e83aa07c580b750e305e6772f';

  const response = await fetch(`${apiUrl}&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);
}

checkWeather();
