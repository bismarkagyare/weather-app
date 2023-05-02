const dateTimeElement = document.querySelector('.date-time');

function getCurrentDateTime() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[now.getDay()];
  const date = now.getDate();
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
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}: ${seconds}`;
  setInterval(() => {
    const seconds = getSeconds();
    dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
  }, 1000);
}

let intervalId;

function getSeconds() {
  const now = new Date();
  const seconds = now.getSeconds();
  return `${seconds < 10 ? '0' : ''}${seconds}`;
}

async function updateDateTime(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const apiKey = '64517a1e83aa07c580b750e305e6772f';

  try {
    const response = await fetch(`${apiUrl}&appid=${apiKey}`);
    if (!response.ok) throw new Error(`City ${city} not found`);
    const data = await response.json();
    const utcTime = new Date().getTime() + (data.timezone + new Date().getTimezoneOffset() * 60) * 1000;
    const dateTime = new Date(utcTime);
    // const timezone = data.timezone;
    // const now = new Date().getTime() + timezone * 1000;
    // const dateTime = new Date(now);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[dateTime.getDay()];
    const date = dateTime.getDate();
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
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = getSeconds(dateTime); // get the current seconds
    dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      const seconds = getSeconds(dateTime);
      dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}:${
        seconds < 10 ? '0' : ''
      }${seconds}`;
    }, 1000);
  } catch (error) {
    alert(error);
  }
}

export { getCurrentDateTime, updateDateTime };
