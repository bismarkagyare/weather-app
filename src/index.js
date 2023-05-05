import checkWeather from './modules/api';
import { getDailyTemperatures } from './modules/daily';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-container input');
  const searchBtn = document.querySelector('.submit');
  checkWeather('Manchester');
  getDailyTemperatures('London');

  const search = () => {
    if (searchInput.value === '') return;
    checkWeather(searchInput.value);
    getDailyTemperatures(searchInput.value);
    searchInput.value = '';
  };

  searchBtn.addEventListener('click', search);

  searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      search();
    }
  });
});
