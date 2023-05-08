const dateTimeElement = document.querySelector('.date-time');
let timerId = null;

async function updateDateTime(city) {
  try {
    const { timezone } = await fetchWeatherData(city);
    const dateTime = getCurrentDateTime(timezone);
    displayDateTime(dateTime);
    startTimer(dateTime);
  } catch (error) {
    alert(error);
  }
}

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const apiKey = '64517a1e83aa07c580b750e305e6772f';

  const response = await fetch(`${apiUrl}&appid=${apiKey}`);
  if (!response.ok) throw new Error(`City ${city} not found`);
  return response.json();
}

function getCurrentDateTime(timezone) {
  const utcTime = new Date().getTime() + (timezone + new Date().getTimezoneOffset() * 60) * 1000;
  return new Date(utcTime);
}

function displayDateTime(dateTime) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = days[dateTime.getDay()];
  const date = dateTime.getDate();
  const month = months[dateTime.getMonth()];
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

function startTimer(dateTime) {
  clearInterval(timerId);
  timerId = setInterval(() => {
    dateTime.setSeconds(dateTime.getSeconds() + 1);
    displayDateTime(dateTime);
  }, 1000);
}

export { updateDateTime };
