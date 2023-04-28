const cityName = document.querySelector('.city-name');
const degree = document.querySelector('.degree');
const weatherImage = document.querySelector('.weather-icon');

// air conditions
const feelsLike = document.querySelector('.real-feel h3');
const chanceOfRain = document.querySelector('.chance-of-rain h3');
const windSpeed = document.querySelector('.wind h3');
const humidity = document.querySelector('.humidity h3');

function updateCityName(name) {
  cityName.textContent = name;
}

function updateDegree(temp) {
  degree.textContent = `${Math.round(temp)} °C`;
}

function updateWeatherImage(imageFileName) {
  weatherImage.src = `images/${imageFileName}`;
}

function updateFeelsLike(temp) {
  feelsLike.textContent = `${Math.round(temp)} °C`;
}

function updateChanceOfRain(chance) {
  chanceOfRain.textContent = `${chance}%`;
}

function updateWindSpeed(speed) {
  windSpeed.textContent = `${speed} km/h`;
}

function updateHumidity(hum) {
  humidity.textContent = `${hum} %`;
}

export {
  updateCityName,
  updateDegree,
  updateWeatherImage,
  updateFeelsLike,
  updateChanceOfRain,
  updateWindSpeed,
  updateHumidity,
};
