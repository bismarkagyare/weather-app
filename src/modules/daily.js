async function getDailyTemperatures(city) {
  const apiKey = '64517a1e83aa07c580b750e305e6772f';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export { getDailyTemperatures };
