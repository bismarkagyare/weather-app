import checkWeather from './modules/api';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-container input');
  const searchBtn = document.querySelector('.submit');
  checkWeather('Manchester');

  const search = () => {
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
