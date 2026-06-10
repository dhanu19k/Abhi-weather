document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherResult = document.getElementById('weather-result');
  const cityNameDisplay = document.getElementById('city-name');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const humidityDisplay = document.getElementById('humidity');
  const windSpeedDisplay = document.getElementById('wind-speed');
  const weatherIcon = document.getElementById('weather-icon');
  const errorMessage = document.getElementById('error-message');
  const API_KEY = '643d40bf9d84d1d6b40f0936a1d8e9e5';

  getWeatherBtn.addEventListener('click', fetchAndRenderWeather);
  cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      fetchAndRenderWeather();
    }
  });

  async function fetchAndRenderWeather() {
    const city = cityInput.value.trim();
    if (!city) {
      showError('Please enter a city name.');
      return;
    }

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error('Weather fetch failed:', error);
      showError('City not found. Please try again.');
    }
  }

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=en&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error response:', response.status, errorText);
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  function displayWeatherData(weatherData) {
    const weather = weatherData.weather?.[0] || {};
    const iconCode = weather.icon || '01d';

    errorMessage.classList.add('hidden');
    weatherResult.classList.remove('hidden');

    cityNameDisplay.textContent = `${weatherData.name}, ${weatherData.sys?.country ?? ''}`;
    temperatureDisplay.textContent = `${Math.round(weatherData.main?.temp ?? 0)}°C`;
    descriptionDisplay.textContent = weather.description || 'clear sky';
    humidityDisplay.textContent = `${weatherData.main?.humidity ?? '--'}%`;
    windSpeedDisplay.textContent = `${weatherData.wind?.speed ?? '--'} km/h`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = weather.description || 'Weather icon';
  }

  function showError(message) {
    weatherResult.classList.add('hidden');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
  }
});
