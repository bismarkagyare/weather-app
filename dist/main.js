/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/api.js":
/*!****************************!*\
  !*** ./src/modules/api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _date_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date-time */ "./src/modules/date-time.js");
/* harmony import */ var _daily__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./daily */ "./src/modules/daily.js");






const weatherImageMap = {
  Clear: 'sunny-w.svg',
  Clouds: 'cloudy.svg',
  Rain: 'rainy.svg',
  Mist: 'mist.svg',
  Drizzle: 'drizzle.png',
  Snow: 'snow.svg',
  Haze: 'haze.svg',
  Thunderstorms: 'thunderstorm.svg',
};

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const apiKey = '64517a1e83aa07c580b750e305e6772f';

  try {
    const response = await fetch(`${apiUrl}&appid=${apiKey}`);
    if (!response.ok) throw new Error(`City ${city} not found`);
    const data = await response.json();

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.updateCityName)(data.name);
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.updateDegree)(data.main.temp);
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.updateFeelsLike)(data.main.feels_like);
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.updateWindSpeed)(data.wind.speed);
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.updateHumidity)(data.main.humidity);

    (0,_date_time__WEBPACK_IMPORTED_MODULE_1__.updateDateTime)(city);
    (0,_daily__WEBPACK_IMPORTED_MODULE_2__.getDailyTemperatures)(city);

    const weatherCondition = data.weather[0].main;
    const weatherImageFileName = weatherImageMap[weatherCondition];
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.updateWeatherImage)(weatherImageFileName);
  } catch (error) {
    alert(error);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkWeather);


/***/ }),

/***/ "./src/modules/daily.js":
/*!******************************!*\
  !*** ./src/modules/daily.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDailyTemperatures": () => (/* binding */ getDailyTemperatures)
/* harmony export */ });
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




/***/ }),

/***/ "./src/modules/date-time.js":
/*!**********************************!*\
  !*** ./src/modules/date-time.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateDateTime": () => (/* binding */ updateDateTime)
/* harmony export */ });
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




/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateChanceOfRain": () => (/* binding */ updateChanceOfRain),
/* harmony export */   "updateCityName": () => (/* binding */ updateCityName),
/* harmony export */   "updateDegree": () => (/* binding */ updateDegree),
/* harmony export */   "updateFeelsLike": () => (/* binding */ updateFeelsLike),
/* harmony export */   "updateHumidity": () => (/* binding */ updateHumidity),
/* harmony export */   "updateWeatherImage": () => (/* binding */ updateWeatherImage),
/* harmony export */   "updateWindSpeed": () => (/* binding */ updateWindSpeed)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/api */ "./src/modules/api.js");
/* harmony import */ var _modules_daily__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/daily */ "./src/modules/daily.js");



document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-container input');
  const searchBtn = document.querySelector('.submit');
  (0,_modules_api__WEBPACK_IMPORTED_MODULE_0__["default"])('Manchester');
  (0,_modules_daily__WEBPACK_IMPORTED_MODULE_1__.getDailyTemperatures)('London');

  const search = () => {
    if (searchInput.value === '') return;
    (0,_modules_api__WEBPACK_IMPORTED_MODULE_0__["default"])(searchInput.value);
    (0,_modules_daily__WEBPACK_IMPORTED_MODULE_1__.getDailyTemperatures)(searchInput.value);
    searchInput.value = '';
  };

  searchBtn.addEventListener('click', search);

  searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      search();
    }
  });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZGFpbHkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9kYXRlLXRpbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICB1cGRhdGVDaXR5TmFtZSxcbiAgdXBkYXRlRGVncmVlLFxuICB1cGRhdGVXZWF0aGVySW1hZ2UsXG4gIHVwZGF0ZUZlZWxzTGlrZSxcbiAgdXBkYXRlV2luZFNwZWVkLFxuICB1cGRhdGVIdW1pZGl0eSxcbn0gZnJvbSAnLi9kb20nO1xuXG5pbXBvcnQgeyB1cGRhdGVEYXRlVGltZSB9IGZyb20gJy4vZGF0ZS10aW1lJztcblxuaW1wb3J0IHsgZ2V0RGFpbHlUZW1wZXJhdHVyZXMgfSBmcm9tICcuL2RhaWx5JztcblxuY29uc3Qgd2VhdGhlckltYWdlTWFwID0ge1xuICBDbGVhcjogJ3N1bm55LXcuc3ZnJyxcbiAgQ2xvdWRzOiAnY2xvdWR5LnN2ZycsXG4gIFJhaW46ICdyYWlueS5zdmcnLFxuICBNaXN0OiAnbWlzdC5zdmcnLFxuICBEcml6emxlOiAnZHJpenpsZS5wbmcnLFxuICBTbm93OiAnc25vdy5zdmcnLFxuICBIYXplOiAnaGF6ZS5zdmcnLFxuICBUaHVuZGVyc3Rvcm1zOiAndGh1bmRlcnN0b3JtLnN2ZycsXG59O1xuXG5hc3luYyBmdW5jdGlvbiBjaGVja1dlYXRoZXIoY2l0eSkge1xuICBjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpY2A7XG4gIGNvbnN0IGFwaUtleSA9ICc2NDUxN2ExZTgzYWEwN2M1ODBiNzUwZTMwNWU2NzcyZic7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2FwaVVybH0mYXBwaWQ9JHthcGlLZXl9YCk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBDaXR5ICR7Y2l0eX0gbm90IGZvdW5kYCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHVwZGF0ZUNpdHlOYW1lKGRhdGEubmFtZSk7XG4gICAgdXBkYXRlRGVncmVlKGRhdGEubWFpbi50ZW1wKTtcbiAgICB1cGRhdGVGZWVsc0xpa2UoZGF0YS5tYWluLmZlZWxzX2xpa2UpO1xuICAgIHVwZGF0ZVdpbmRTcGVlZChkYXRhLndpbmQuc3BlZWQpO1xuICAgIHVwZGF0ZUh1bWlkaXR5KGRhdGEubWFpbi5odW1pZGl0eSk7XG5cbiAgICB1cGRhdGVEYXRlVGltZShjaXR5KTtcbiAgICBnZXREYWlseVRlbXBlcmF0dXJlcyhjaXR5KTtcblxuICAgIGNvbnN0IHdlYXRoZXJDb25kaXRpb24gPSBkYXRhLndlYXRoZXJbMF0ubWFpbjtcbiAgICBjb25zdCB3ZWF0aGVySW1hZ2VGaWxlTmFtZSA9IHdlYXRoZXJJbWFnZU1hcFt3ZWF0aGVyQ29uZGl0aW9uXTtcbiAgICB1cGRhdGVXZWF0aGVySW1hZ2Uod2VhdGhlckltYWdlRmlsZU5hbWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGFsZXJ0KGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjaGVja1dlYXRoZXI7XG4iLCJhc3luYyBmdW5jdGlvbiBnZXREYWlseVRlbXBlcmF0dXJlcyhjaXR5KSB7XG4gIGNvbnN0IGFwaUtleSA9ICc2NDUxN2ExZTgzYWEwN2M1ODBiNzUwZTMwNWU2NzcyZic7XG4gIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZhcHBpZD0ke2FwaUtleX1gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgZGFpbHlEYXRhID0gZGF0YS5saXN0LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5kdF90eHQuaW5jbHVkZXMoJzEyOjAwOjAwJykpO1xuICAgIGNvbnN0IHdlZWtkYXlzID0gWydtb25kYXknLCAndHVlc2RheScsICd3ZWRuZXNkYXknLCAndGh1cnNkYXknLCAnZnJpZGF5JywgJ3NhdHVyZGF5JywgJ3N1bmRheSddO1xuICAgIGRhaWx5RGF0YS5mb3JFYWNoKChkYXksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0ZW1wZXJhdHVyZSA9IE1hdGgucm91bmQoZGF5Lm1haW4udGVtcCk7XG4gICAgICBjb25zdCBwb3AgPSBkYXkucG9wO1xuICAgICAgY29uc3Qgd2Vla2RheSA9IHdlZWtkYXlzW2luZGV4XTtcbiAgICAgIGNvbnN0IHRlbXBlcmF0dXJlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3dlZWtkYXl9IGgzYCk7XG4gICAgICBjb25zdCBjaGFuY2VPZlJhaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhbmNlLW9mLXJhaW4gaDMnKTtcbiAgICAgIHRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RlbXBlcmF0dXJlfcKwQ2A7XG4gICAgICBjaGFuY2VPZlJhaW4udGV4dENvbnRlbnQgPSBgJHtwb3B9JWA7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2V0RGFpbHlUZW1wZXJhdHVyZXMgfTtcbiIsImNvbnN0IGRhdGVUaW1lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRlLXRpbWUnKTtcbmxldCB0aW1lcklkID0gbnVsbDtcblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlRGF0ZVRpbWUoY2l0eSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdGltZXpvbmUgfSA9IGF3YWl0IGZldGNoV2VhdGhlckRhdGEoY2l0eSk7XG4gICAgY29uc3QgZGF0ZVRpbWUgPSBnZXRDdXJyZW50RGF0ZVRpbWUodGltZXpvbmUpO1xuICAgIGRpc3BsYXlEYXRlVGltZShkYXRlVGltZSk7XG4gICAgc3RhcnRUaW1lcihkYXRlVGltZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgYWxlcnQoZXJyb3IpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlckRhdGEoY2l0eSkge1xuICBjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpY2A7XG4gIGNvbnN0IGFwaUtleSA9ICc2NDUxN2ExZTgzYWEwN2M1ODBiNzUwZTMwNWU2NzcyZic7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHthcGlVcmx9JmFwcGlkPSR7YXBpS2V5fWApO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYENpdHkgJHtjaXR5fSBub3QgZm91bmRgKTtcbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudERhdGVUaW1lKHRpbWV6b25lKSB7XG4gIGNvbnN0IHV0Y1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICh0aW1lem9uZSArIG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwKSAqIDEwMDA7XG4gIHJldHVybiBuZXcgRGF0ZSh1dGNUaW1lKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheURhdGVUaW1lKGRhdGVUaW1lKSB7XG4gIGNvbnN0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG4gIGNvbnN0IG1vbnRocyA9IFtcbiAgICAnSmFudWFyeScsXG4gICAgJ0ZlYnJ1YXJ5JyxcbiAgICAnTWFyY2gnLFxuICAgICdBcHJpbCcsXG4gICAgJ01heScsXG4gICAgJ0p1bmUnLFxuICAgICdKdWx5JyxcbiAgICAnQXVndXN0JyxcbiAgICAnU2VwdGVtYmVyJyxcbiAgICAnT2N0b2JlcicsXG4gICAgJ05vdmVtYmVyJyxcbiAgICAnRGVjZW1iZXInLFxuICBdO1xuXG4gIGNvbnN0IGRheSA9IGRheXNbZGF0ZVRpbWUuZ2V0RGF5KCldO1xuICBjb25zdCBkYXRlID0gZGF0ZVRpbWUuZ2V0RGF0ZSgpO1xuICBjb25zdCBtb250aCA9IG1vbnRoc1tkYXRlVGltZS5nZXRNb250aCgpXTtcbiAgY29uc3QgeWVhciA9IGRhdGVUaW1lLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IGhvdXJzID0gZGF0ZVRpbWUuZ2V0SG91cnMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBkYXRlVGltZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBzZWNvbmRzID0gZGF0ZVRpbWUuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcblxuICBkYXRlVGltZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtkYXl9LCAke2RhdGV9ICR7bW9udGh9ICR7eWVhcn0sICR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfWA7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VGltZXIoZGF0ZVRpbWUpIHtcbiAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcbiAgdGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBkYXRlVGltZS5zZXRTZWNvbmRzKGRhdGVUaW1lLmdldFNlY29uZHMoKSArIDEpO1xuICAgIGRpc3BsYXlEYXRlVGltZShkYXRlVGltZSk7XG4gIH0sIDEwMDApO1xufVxuXG5leHBvcnQgeyB1cGRhdGVEYXRlVGltZSB9O1xuIiwiY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2l0eS1uYW1lJyk7XG5jb25zdCBkZWdyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVncmVlJyk7XG5jb25zdCB3ZWF0aGVySW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1pY29uJyk7XG5cbi8vIGFpciBjb25kaXRpb25zXG5jb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVhbC1mZWVsIGgzJyk7XG5jb25zdCBjaGFuY2VPZlJhaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhbmNlLW9mLXJhaW4gaDMnKTtcbmNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kIGgzJyk7XG5jb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eSBoMycpO1xuXG5mdW5jdGlvbiB1cGRhdGVDaXR5TmFtZShuYW1lKSB7XG4gIGNpdHlOYW1lLnRleHRDb250ZW50ID0gbmFtZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRGVncmVlKHRlbXApIHtcbiAgZGVncmVlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh0ZW1wKX0gwrBDYDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlV2VhdGhlckltYWdlKGltYWdlRmlsZU5hbWUpIHtcbiAgd2VhdGhlckltYWdlLnNyYyA9IGBpbWFnZXMvJHtpbWFnZUZpbGVOYW1lfWA7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZlZWxzTGlrZSh0ZW1wKSB7XG4gIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQodGVtcCl9IMKwQ2A7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoYW5jZU9mUmFpbihjaGFuY2UpIHtcbiAgY2hhbmNlT2ZSYWluLnRleHRDb250ZW50ID0gYCR7Y2hhbmNlfSVgO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVXaW5kU3BlZWQoc3BlZWQpIHtcbiAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYCR7c3BlZWR9IGttL2hgO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVIdW1pZGl0eShodW0pIHtcbiAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgJHtodW19ICVgO1xufVxuXG5leHBvcnQge1xuICB1cGRhdGVDaXR5TmFtZSxcbiAgdXBkYXRlRGVncmVlLFxuICB1cGRhdGVXZWF0aGVySW1hZ2UsXG4gIHVwZGF0ZUZlZWxzTGlrZSxcbiAgdXBkYXRlQ2hhbmNlT2ZSYWluLFxuICB1cGRhdGVXaW5kU3BlZWQsXG4gIHVwZGF0ZUh1bWlkaXR5LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNoZWNrV2VhdGhlciBmcm9tICcuL21vZHVsZXMvYXBpJztcbmltcG9ydCB7IGdldERhaWx5VGVtcGVyYXR1cmVzIH0gZnJvbSAnLi9tb2R1bGVzL2RhaWx5JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWNvbnRhaW5lciBpbnB1dCcpO1xuICBjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0Jyk7XG4gIGNoZWNrV2VhdGhlcignTWFuY2hlc3RlcicpO1xuICBnZXREYWlseVRlbXBlcmF0dXJlcygnTG9uZG9uJyk7XG5cbiAgY29uc3Qgc2VhcmNoID0gKCkgPT4ge1xuICAgIGlmIChzZWFyY2hJbnB1dC52YWx1ZSA9PT0gJycpIHJldHVybjtcbiAgICBjaGVja1dlYXRoZXIoc2VhcmNoSW5wdXQudmFsdWUpO1xuICAgIGdldERhaWx5VGVtcGVyYXR1cmVzKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICB9O1xuXG4gIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlYXJjaCk7XG5cbiAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgc2VhcmNoKCk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9