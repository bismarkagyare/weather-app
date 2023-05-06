const dateTimeElement = document.querySelector('.date-time');

let timerId = null;

async function updateDateTime(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const apiKey = '64517a1e83aa07c580b750e305e6772f';

  try {
    const response = await fetch(`${apiUrl}&appid=${apiKey}`);
    if (!response.ok) throw new Error(`City ${city} not found`);
    const data = await response.json();
    const utcTime = new Date().getTime() + (data.timezone + new Date().getTimezoneOffset() * 60) * 1000;
    const dateTime = new Date(utcTime);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[dateTime.getDay()];
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
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let seconds = dateTime.getSeconds(); // get the current seconds
    dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    clearInterval(timerId);
    timerId = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
          if (hours === 24) {
            hours = 0;
            day = days[(days.indexOf(day) + 1) % 7];
          }
        }
      }
      dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours < 10 ? '0' : ''}${hours}:${
        minutes < 10 ? '0' : ''
      }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
  } catch (error) {
    alert(error);
  }
}

export { updateDateTime };
