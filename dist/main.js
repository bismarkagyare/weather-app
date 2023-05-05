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
    dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
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
      dateTimeElement.textContent = `${day}, ${date} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
      }${seconds}`;
    }, 1000);
  } catch (error) {
    alert(error);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG9FQUFvQjtBQUN4QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2RhaWx5LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZGF0ZS10aW1lLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgdXBkYXRlQ2l0eU5hbWUsXG4gIHVwZGF0ZURlZ3JlZSxcbiAgdXBkYXRlV2VhdGhlckltYWdlLFxuICB1cGRhdGVGZWVsc0xpa2UsXG4gIHVwZGF0ZVdpbmRTcGVlZCxcbiAgdXBkYXRlSHVtaWRpdHksXG59IGZyb20gJy4vZG9tJztcblxuaW1wb3J0IHsgdXBkYXRlRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGUtdGltZSc7XG5cbmltcG9ydCB7IGdldERhaWx5VGVtcGVyYXR1cmVzIH0gZnJvbSAnLi9kYWlseSc7XG5cbmNvbnN0IHdlYXRoZXJJbWFnZU1hcCA9IHtcbiAgQ2xlYXI6ICdzdW5ueS13LnN2ZycsXG4gIENsb3VkczogJ2Nsb3VkeS5zdmcnLFxuICBSYWluOiAncmFpbnkuc3ZnJyxcbiAgTWlzdDogJ21pc3Quc3ZnJyxcbiAgRHJpenpsZTogJ2RyaXp6bGUucG5nJyxcbiAgU25vdzogJ3Nub3cuc3ZnJyxcbiAgSGF6ZTogJ2hhemUuc3ZnJyxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrV2VhdGhlcihjaXR5KSB7XG4gIGNvbnN0IGFwaVVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9bWV0cmljYDtcbiAgY29uc3QgYXBpS2V5ID0gJzY0NTE3YTFlODNhYTA3YzU4MGI3NTBlMzA1ZTY3NzJmJztcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7YXBpVXJsfSZhcHBpZD0ke2FwaUtleX1gKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYENpdHkgJHtjaXR5fSBub3QgZm91bmRgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgdXBkYXRlQ2l0eU5hbWUoZGF0YS5uYW1lKTtcbiAgICB1cGRhdGVEZWdyZWUoZGF0YS5tYWluLnRlbXApO1xuICAgIHVwZGF0ZUZlZWxzTGlrZShkYXRhLm1haW4uZmVlbHNfbGlrZSk7XG4gICAgdXBkYXRlV2luZFNwZWVkKGRhdGEud2luZC5zcGVlZCk7XG4gICAgdXBkYXRlSHVtaWRpdHkoZGF0YS5tYWluLmh1bWlkaXR5KTtcblxuICAgIHVwZGF0ZURhdGVUaW1lKGNpdHkpO1xuICAgIGdldERhaWx5VGVtcGVyYXR1cmVzKGNpdHkpO1xuXG4gICAgY29uc3Qgd2VhdGhlckNvbmRpdGlvbiA9IGRhdGEud2VhdGhlclswXS5tYWluO1xuICAgIGNvbnN0IHdlYXRoZXJJbWFnZUZpbGVOYW1lID0gd2VhdGhlckltYWdlTWFwW3dlYXRoZXJDb25kaXRpb25dO1xuICAgIHVwZGF0ZVdlYXRoZXJJbWFnZSh3ZWF0aGVySW1hZ2VGaWxlTmFtZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgYWxlcnQoZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrV2VhdGhlcjtcbiIsImFzeW5jIGZ1bmN0aW9uIGdldERhaWx5VGVtcGVyYXR1cmVzKGNpdHkpIHtcbiAgY29uc3QgYXBpS2V5ID0gJzY0NTE3YTFlODNhYTA3YzU4MGI3NTBlMzA1ZTY3NzJmJztcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eX0mdW5pdHM9bWV0cmljJmFwcGlkPSR7YXBpS2V5fWA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBkYWlseURhdGEgPSBkYXRhLmxpc3QuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmR0X3R4dC5pbmNsdWRlcygnMTI6MDA6MDAnKSk7XG4gICAgY29uc3Qgd2Vla2RheXMgPSBbJ21vbmRheScsICd0dWVzZGF5JywgJ3dlZG5lc2RheScsICd0aHVyc2RheScsICdmcmlkYXknLCAnc2F0dXJkYXknLCAnc3VuZGF5J107XG4gICAgZGFpbHlEYXRhLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gTWF0aC5yb3VuZChkYXkubWFpbi50ZW1wKTtcbiAgICAgIGNvbnN0IHBvcCA9IGRheS5wb3A7XG4gICAgICBjb25zdCB3ZWVrZGF5ID0gd2Vla2RheXNbaW5kZXhdO1xuICAgICAgY29uc3QgdGVtcGVyYXR1cmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7d2Vla2RheX0gaDNgKTtcbiAgICAgIGNvbnN0IGNoYW5jZU9mUmFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFuY2Utb2YtcmFpbiBoMycpO1xuICAgICAgdGVtcGVyYXR1cmVFbGVtZW50LnRleHRDb250ZW50ID0gYCR7dGVtcGVyYXR1cmV9wrBDYDtcbiAgICAgIGNoYW5jZU9mUmFpbi50ZXh0Q29udGVudCA9IGAke3BvcH0lYDtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgeyBnZXREYWlseVRlbXBlcmF0dXJlcyB9O1xuIiwiY29uc3QgZGF0ZVRpbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUtdGltZScpO1xuXG5sZXQgdGltZXJJZCA9IG51bGw7XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZURhdGVUaW1lKGNpdHkpIHtcbiAgY29uc3QgYXBpVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz1tZXRyaWNgO1xuICBjb25zdCBhcGlLZXkgPSAnNjQ1MTdhMWU4M2FhMDdjNTgwYjc1MGUzMDVlNjc3MmYnO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHthcGlVcmx9JmFwcGlkPSR7YXBpS2V5fWApO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgQ2l0eSAke2NpdHl9IG5vdCBmb3VuZGApO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgdXRjVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKGRhdGEudGltZXpvbmUgKyBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MCkgKiAxMDAwO1xuICAgIGNvbnN0IGRhdGVUaW1lID0gbmV3IERhdGUodXRjVGltZSk7XG4gICAgY29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcbiAgICBsZXQgZGF5ID0gZGF5c1tkYXRlVGltZS5nZXREYXkoKV07XG4gICAgY29uc3QgZGF0ZSA9IGRhdGVUaW1lLmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aHMgPSBbXG4gICAgICAnSmFudWFyeScsXG4gICAgICAnRmVicnVhcnknLFxuICAgICAgJ01hcmNoJyxcbiAgICAgICdBcHJpbCcsXG4gICAgICAnTWF5JyxcbiAgICAgICdKdW5lJyxcbiAgICAgICdKdWx5JyxcbiAgICAgICdBdWd1c3QnLFxuICAgICAgJ1NlcHRlbWJlcicsXG4gICAgICAnT2N0b2JlcicsXG4gICAgICAnTm92ZW1iZXInLFxuICAgICAgJ0RlY2VtYmVyJyxcbiAgICBdO1xuICAgIGNvbnN0IG1vbnRoID0gbW9udGhzW2RhdGVUaW1lLmdldE1vbnRoKCldO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlVGltZS5nZXRGdWxsWWVhcigpO1xuICAgIGxldCBob3VycyA9IGRhdGVUaW1lLmdldEhvdXJzKCk7XG4gICAgbGV0IG1pbnV0ZXMgPSBkYXRlVGltZS5nZXRNaW51dGVzKCk7XG4gICAgbGV0IHNlY29uZHMgPSBkYXRlVGltZS5nZXRTZWNvbmRzKCk7IC8vIGdldCB0aGUgY3VycmVudCBzZWNvbmRzXG4gICAgZGF0ZVRpbWVFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZGF5fSwgJHtkYXRlfSAke21vbnRofSAke3llYXJ9LCAke2hvdXJzfToke21pbnV0ZXMgPCAxMCA/ICcwJyA6ICcnfSR7bWludXRlc306JHtcbiAgICAgIHNlY29uZHMgPCAxMCA/ICcwJyA6ICcnXG4gICAgfSR7c2Vjb25kc31gO1xuICAgIGNsZWFySW50ZXJ2YWwodGltZXJJZCk7XG4gICAgdGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHNlY29uZHMrKztcbiAgICAgIGlmIChzZWNvbmRzID09PSA2MCkge1xuICAgICAgICBzZWNvbmRzID0gMDtcbiAgICAgICAgbWludXRlcysrO1xuICAgICAgICBpZiAobWludXRlcyA9PT0gNjApIHtcbiAgICAgICAgICBtaW51dGVzID0gMDtcbiAgICAgICAgICBob3VycysrO1xuICAgICAgICAgIGlmIChob3VycyA9PT0gMjQpIHtcbiAgICAgICAgICAgIGhvdXJzID0gMDtcbiAgICAgICAgICAgIGRheSA9IGRheXNbKGRheXMuaW5kZXhPZihkYXkpICsgMSkgJSA3XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRhdGVUaW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGAke2RheX0sICR7ZGF0ZX0gJHttb250aH0gJHt5ZWFyfSwgJHtob3Vyc306JHttaW51dGVzIDwgMTAgPyAnMCcgOiAnJ30ke21pbnV0ZXN9OiR7XG4gICAgICAgIHNlY29uZHMgPCAxMCA/ICcwJyA6ICcnXG4gICAgICB9JHtzZWNvbmRzfWA7XG4gICAgfSwgMTAwMCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgYWxlcnQoZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCB7IHVwZGF0ZURhdGVUaW1lIH07XG4iLCJjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXR5LW5hbWUnKTtcbmNvbnN0IGRlZ3JlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWdyZWUnKTtcbmNvbnN0IHdlYXRoZXJJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWljb24nKTtcblxuLy8gYWlyIGNvbmRpdGlvbnNcbmNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWFsLWZlZWwgaDMnKTtcbmNvbnN0IGNoYW5jZU9mUmFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFuY2Utb2YtcmFpbiBoMycpO1xuY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQgaDMnKTtcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5IGgzJyk7XG5cbmZ1bmN0aW9uIHVwZGF0ZUNpdHlOYW1lKG5hbWUpIHtcbiAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVEZWdyZWUodGVtcCkge1xuICBkZWdyZWUudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKHRlbXApfSDCsENgO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVXZWF0aGVySW1hZ2UoaW1hZ2VGaWxlTmFtZSkge1xuICB3ZWF0aGVySW1hZ2Uuc3JjID0gYGltYWdlcy8ke2ltYWdlRmlsZU5hbWV9YDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRmVlbHNMaWtlKHRlbXApIHtcbiAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh0ZW1wKX0gwrBDYDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hhbmNlT2ZSYWluKGNoYW5jZSkge1xuICBjaGFuY2VPZlJhaW4udGV4dENvbnRlbnQgPSBgJHtjaGFuY2V9JWA7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVdpbmRTcGVlZChzcGVlZCkge1xuICB3aW5kU3BlZWQudGV4dENvbnRlbnQgPSBgJHtzcGVlZH0ga20vaGA7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUh1bWlkaXR5KGh1bSkge1xuICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke2h1bX0gJWA7XG59XG5cbmV4cG9ydCB7XG4gIHVwZGF0ZUNpdHlOYW1lLFxuICB1cGRhdGVEZWdyZWUsXG4gIHVwZGF0ZVdlYXRoZXJJbWFnZSxcbiAgdXBkYXRlRmVlbHNMaWtlLFxuICB1cGRhdGVDaGFuY2VPZlJhaW4sXG4gIHVwZGF0ZVdpbmRTcGVlZCxcbiAgdXBkYXRlSHVtaWRpdHksXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY2hlY2tXZWF0aGVyIGZyb20gJy4vbW9kdWxlcy9hcGknO1xuaW1wb3J0IHsgZ2V0RGFpbHlUZW1wZXJhdHVyZXMgfSBmcm9tICcuL21vZHVsZXMvZGFpbHknO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtY29udGFpbmVyIGlucHV0Jyk7XG4gIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQnKTtcbiAgY2hlY2tXZWF0aGVyKCdNYW5jaGVzdGVyJyk7XG4gIGdldERhaWx5VGVtcGVyYXR1cmVzKCdMb25kb24nKTtcblxuICBjb25zdCBzZWFyY2ggPSAoKSA9PiB7XG4gICAgaWYgKHNlYXJjaElucHV0LnZhbHVlID09PSAnJykgcmV0dXJuO1xuICAgIGNoZWNrV2VhdGhlcihzZWFyY2hJbnB1dC52YWx1ZSk7XG4gICAgZ2V0RGFpbHlUZW1wZXJhdHVyZXMoc2VhcmNoSW5wdXQudmFsdWUpO1xuICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gIH07XG5cbiAgc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VhcmNoKTtcblxuICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBzZWFyY2goKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=