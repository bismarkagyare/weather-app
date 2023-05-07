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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsSUFBSSx3REFBWTtBQUNoQixJQUFJLG9FQUFvQjtBQUN4QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2RhaWx5LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZGF0ZS10aW1lLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgdXBkYXRlQ2l0eU5hbWUsXG4gIHVwZGF0ZURlZ3JlZSxcbiAgdXBkYXRlV2VhdGhlckltYWdlLFxuICB1cGRhdGVGZWVsc0xpa2UsXG4gIHVwZGF0ZVdpbmRTcGVlZCxcbiAgdXBkYXRlSHVtaWRpdHksXG59IGZyb20gJy4vZG9tJztcblxuaW1wb3J0IHsgdXBkYXRlRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGUtdGltZSc7XG5cbmltcG9ydCB7IGdldERhaWx5VGVtcGVyYXR1cmVzIH0gZnJvbSAnLi9kYWlseSc7XG5cbmNvbnN0IHdlYXRoZXJJbWFnZU1hcCA9IHtcbiAgQ2xlYXI6ICdzdW5ueS13LnN2ZycsXG4gIENsb3VkczogJ2Nsb3VkeS5zdmcnLFxuICBSYWluOiAncmFpbnkuc3ZnJyxcbiAgTWlzdDogJ21pc3Quc3ZnJyxcbiAgRHJpenpsZTogJ2RyaXp6bGUucG5nJyxcbiAgU25vdzogJ3Nub3cuc3ZnJyxcbiAgSGF6ZTogJ2hhemUuc3ZnJyxcbiAgVGh1bmRlcnN0b3JtczogJ3RodW5kZXJzdG9ybS5zdmcnLFxufTtcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tXZWF0aGVyKGNpdHkpIHtcbiAgY29uc3QgYXBpVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz1tZXRyaWNgO1xuICBjb25zdCBhcGlLZXkgPSAnNjQ1MTdhMWU4M2FhMDdjNTgwYjc1MGUzMDVlNjc3MmYnO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHthcGlVcmx9JmFwcGlkPSR7YXBpS2V5fWApO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgQ2l0eSAke2NpdHl9IG5vdCBmb3VuZGApO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICB1cGRhdGVDaXR5TmFtZShkYXRhLm5hbWUpO1xuICAgIHVwZGF0ZURlZ3JlZShkYXRhLm1haW4udGVtcCk7XG4gICAgdXBkYXRlRmVlbHNMaWtlKGRhdGEubWFpbi5mZWVsc19saWtlKTtcbiAgICB1cGRhdGVXaW5kU3BlZWQoZGF0YS53aW5kLnNwZWVkKTtcbiAgICB1cGRhdGVIdW1pZGl0eShkYXRhLm1haW4uaHVtaWRpdHkpO1xuXG4gICAgdXBkYXRlRGF0ZVRpbWUoY2l0eSk7XG4gICAgZ2V0RGFpbHlUZW1wZXJhdHVyZXMoY2l0eSk7XG5cbiAgICBjb25zdCB3ZWF0aGVyQ29uZGl0aW9uID0gZGF0YS53ZWF0aGVyWzBdLm1haW47XG4gICAgY29uc3Qgd2VhdGhlckltYWdlRmlsZU5hbWUgPSB3ZWF0aGVySW1hZ2VNYXBbd2VhdGhlckNvbmRpdGlvbl07XG4gICAgdXBkYXRlV2VhdGhlckltYWdlKHdlYXRoZXJJbWFnZUZpbGVOYW1lKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhbGVydChlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tXZWF0aGVyO1xuIiwiYXN5bmMgZnVuY3Rpb24gZ2V0RGFpbHlUZW1wZXJhdHVyZXMoY2l0eSkge1xuICBjb25zdCBhcGlLZXkgPSAnNjQ1MTdhMWU4M2FhMDdjNTgwYjc1MGUzMDVlNjc3MmYnO1xuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmYXBwaWQ9JHthcGlLZXl9YDtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IGRhaWx5RGF0YSA9IGRhdGEubGlzdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uZHRfdHh0LmluY2x1ZGVzKCcxMjowMDowMCcpKTtcbiAgICBjb25zdCB3ZWVrZGF5cyA9IFsnbW9uZGF5JywgJ3R1ZXNkYXknLCAnd2VkbmVzZGF5JywgJ3RodXJzZGF5JywgJ2ZyaWRheScsICdzYXR1cmRheScsICdzdW5kYXknXTtcbiAgICBkYWlseURhdGEuZm9yRWFjaCgoZGF5LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKGRheS5tYWluLnRlbXApO1xuICAgICAgY29uc3QgcG9wID0gZGF5LnBvcDtcbiAgICAgIGNvbnN0IHdlZWtkYXkgPSB3ZWVrZGF5c1tpbmRleF07XG4gICAgICBjb25zdCB0ZW1wZXJhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3ZWVrZGF5fSBoM2ApO1xuICAgICAgY29uc3QgY2hhbmNlT2ZSYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYW5jZS1vZi1yYWluIGgzJyk7XG4gICAgICB0ZW1wZXJhdHVyZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHt0ZW1wZXJhdHVyZX3CsENgO1xuICAgICAgY2hhbmNlT2ZSYWluLnRleHRDb250ZW50ID0gYCR7cG9wfSVgO1xuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCB7IGdldERhaWx5VGVtcGVyYXR1cmVzIH07XG4iLCJjb25zdCBkYXRlVGltZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZS10aW1lJyk7XG5cbmxldCB0aW1lcklkID0gbnVsbDtcblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlRGF0ZVRpbWUoY2l0eSkge1xuICBjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpY2A7XG4gIGNvbnN0IGFwaUtleSA9ICc2NDUxN2ExZTgzYWEwN2M1ODBiNzUwZTMwNWU2NzcyZic7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2FwaVVybH0mYXBwaWQ9JHthcGlLZXl9YCk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBDaXR5ICR7Y2l0eX0gbm90IGZvdW5kYCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCB1dGNUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoZGF0YS50aW1lem9uZSArIG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwKSAqIDEwMDA7XG4gICAgY29uc3QgZGF0ZVRpbWUgPSBuZXcgRGF0ZSh1dGNUaW1lKTtcbiAgICBjb25zdCBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuICAgIGxldCBkYXkgPSBkYXlzW2RhdGVUaW1lLmdldERheSgpXTtcbiAgICBjb25zdCBkYXRlID0gZGF0ZVRpbWUuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRocyA9IFtcbiAgICAgICdKYW51YXJ5JyxcbiAgICAgICdGZWJydWFyeScsXG4gICAgICAnTWFyY2gnLFxuICAgICAgJ0FwcmlsJyxcbiAgICAgICdNYXknLFxuICAgICAgJ0p1bmUnLFxuICAgICAgJ0p1bHknLFxuICAgICAgJ0F1Z3VzdCcsXG4gICAgICAnU2VwdGVtYmVyJyxcbiAgICAgICdPY3RvYmVyJyxcbiAgICAgICdOb3ZlbWJlcicsXG4gICAgICAnRGVjZW1iZXInLFxuICAgIF07XG4gICAgY29uc3QgbW9udGggPSBtb250aHNbZGF0ZVRpbWUuZ2V0TW9udGgoKV07XG4gICAgY29uc3QgeWVhciA9IGRhdGVUaW1lLmdldEZ1bGxZZWFyKCk7XG4gICAgbGV0IGhvdXJzID0gZGF0ZVRpbWUuZ2V0SG91cnMoKTtcbiAgICBsZXQgbWludXRlcyA9IGRhdGVUaW1lLmdldE1pbnV0ZXMoKTtcbiAgICBsZXQgc2Vjb25kcyA9IGRhdGVUaW1lLmdldFNlY29uZHMoKTsgLy8gZ2V0IHRoZSBjdXJyZW50IHNlY29uZHNcbiAgICBkYXRlVGltZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtkYXl9LCAke2RhdGV9ICR7bW9udGh9ICR7eWVhcn0sICR7aG91cnMgPCAxMCA/ICcwJyA6ICcnfSR7aG91cnN9OiR7XG4gICAgICBtaW51dGVzIDwgMTAgPyAnMCcgOiAnJ1xuICAgIH0ke21pbnV0ZXN9OiR7c2Vjb25kcyA8IDEwID8gJzAnIDogJyd9JHtzZWNvbmRzfWA7XG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcbiAgICB0aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2Vjb25kcysrO1xuICAgICAgaWYgKHNlY29uZHMgPT09IDYwKSB7XG4gICAgICAgIHNlY29uZHMgPSAwO1xuICAgICAgICBtaW51dGVzKys7XG4gICAgICAgIGlmIChtaW51dGVzID09PSA2MCkge1xuICAgICAgICAgIG1pbnV0ZXMgPSAwO1xuICAgICAgICAgIGhvdXJzKys7XG4gICAgICAgICAgaWYgKGhvdXJzID09PSAyNCkge1xuICAgICAgICAgICAgaG91cnMgPSAwO1xuICAgICAgICAgICAgZGF5ID0gZGF5c1soZGF5cy5pbmRleE9mKGRheSkgKyAxKSAlIDddO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGF0ZVRpbWVFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZGF5fSwgJHtkYXRlfSAke21vbnRofSAke3llYXJ9LCAke2hvdXJzIDwgMTAgPyAnMCcgOiAnJ30ke2hvdXJzfToke1xuICAgICAgICBtaW51dGVzIDwgMTAgPyAnMCcgOiAnJ1xuICAgICAgfSR7bWludXRlc306JHtzZWNvbmRzIDwgMTAgPyAnMCcgOiAnJ30ke3NlY29uZHN9YDtcbiAgICB9LCAxMDAwKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhbGVydChlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IHsgdXBkYXRlRGF0ZVRpbWUgfTtcbiIsImNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHktbmFtZScpO1xuY29uc3QgZGVncmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlZ3JlZScpO1xuY29uc3Qgd2VhdGhlckltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItaWNvbicpO1xuXG4vLyBhaXIgY29uZGl0aW9uc1xuY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlYWwtZmVlbCBoMycpO1xuY29uc3QgY2hhbmNlT2ZSYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYW5jZS1vZi1yYWluIGgzJyk7XG5jb25zdCB3aW5kU3BlZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2luZCBoMycpO1xuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHkgaDMnKTtcblxuZnVuY3Rpb24gdXBkYXRlQ2l0eU5hbWUobmFtZSkge1xuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZURlZ3JlZSh0ZW1wKSB7XG4gIGRlZ3JlZS50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQodGVtcCl9IMKwQ2A7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJJbWFnZShpbWFnZUZpbGVOYW1lKSB7XG4gIHdlYXRoZXJJbWFnZS5zcmMgPSBgaW1hZ2VzLyR7aW1hZ2VGaWxlTmFtZX1gO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGZWVsc0xpa2UodGVtcCkge1xuICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKHRlbXApfSDCsENgO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDaGFuY2VPZlJhaW4oY2hhbmNlKSB7XG4gIGNoYW5jZU9mUmFpbi50ZXh0Q29udGVudCA9IGAke2NoYW5jZX0lYDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlV2luZFNwZWVkKHNwZWVkKSB7XG4gIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IGAke3NwZWVkfSBrbS9oYDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSHVtaWRpdHkoaHVtKSB7XG4gIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYCR7aHVtfSAlYDtcbn1cblxuZXhwb3J0IHtcbiAgdXBkYXRlQ2l0eU5hbWUsXG4gIHVwZGF0ZURlZ3JlZSxcbiAgdXBkYXRlV2VhdGhlckltYWdlLFxuICB1cGRhdGVGZWVsc0xpa2UsXG4gIHVwZGF0ZUNoYW5jZU9mUmFpbixcbiAgdXBkYXRlV2luZFNwZWVkLFxuICB1cGRhdGVIdW1pZGl0eSxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjaGVja1dlYXRoZXIgZnJvbSAnLi9tb2R1bGVzL2FwaSc7XG5pbXBvcnQgeyBnZXREYWlseVRlbXBlcmF0dXJlcyB9IGZyb20gJy4vbW9kdWxlcy9kYWlseSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1jb250YWluZXIgaW5wdXQnKTtcbiAgY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdCcpO1xuICBjaGVja1dlYXRoZXIoJ01hbmNoZXN0ZXInKTtcbiAgZ2V0RGFpbHlUZW1wZXJhdHVyZXMoJ0xvbmRvbicpO1xuXG4gIGNvbnN0IHNlYXJjaCA9ICgpID0+IHtcbiAgICBpZiAoc2VhcmNoSW5wdXQudmFsdWUgPT09ICcnKSByZXR1cm47XG4gICAgY2hlY2tXZWF0aGVyKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICBnZXREYWlseVRlbXBlcmF0dXJlcyhzZWFyY2hJbnB1dC52YWx1ZSk7XG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgfTtcblxuICBzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWFyY2gpO1xuXG4gIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHNlYXJjaCgpO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==