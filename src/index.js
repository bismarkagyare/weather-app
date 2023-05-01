import checkWeather from './modules/api';
//import { getCurrentDateTime } from './modules/date-time';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-container input');
  const searchBtn = document.querySelector('.submit');
  checkWeather('Manchester');
  //getCurrentDateTime();

  const search = () => {
    if (searchInput.value === '') return;
    checkWeather(searchInput.value);
    searchInput.value = '';
  };

  searchBtn.addEventListener('click', search);

  searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      search();
    }
  });
});
