async function getDailyTemperatures(city) {
  const apiKey = '64517a1e83aa07c580b750e305e6772f';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const dailyData = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    dailyData.forEach((day, index) => {
      const temperature = Math.round(day.main.temp);
      const pop = day.pop;
      const weekday = weekdays[index];
      const temperatureElement = document.querySelector(`.${weekday} h3`);
      const chanceOfRain = document.querySelector('.chance-of-rain h3');
      temperatureElement.textContent = `${temperature}°C`;
      chanceOfRain.textContent = `${pop}%`;
    });
  } catch (error) {
    console.error(error);
  }
}

export { getDailyTemperatures };
