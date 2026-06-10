# Abhiweather Script Explanation (Hinglish)

Yeh document `script.js` ke har important part ko samjhata hai jo Abhiweather project mein use hua hai.

```js
document.addEventListener('DOMContentLoaded', () => {
```
- Jab tak page ka poora DOM load na ho jaye, code execute nahi hoga.
- Yeh ensure karta hai ki sare HTML elements mil jaayein jab script unko access kare.

```js
  const cityInput = document.getElementById('city-input');
```
- City input field ko dhoondhta hai jahan user city type karega.
- Is element ko `cityInput` variable mein store karta hai.

```js
  const getWeatherBtn = document.getElementById('get-weather-btn');
```
- Search button ko find karta hai.
- Jab user click karega, hum API request bhejenge.

```js
  const weatherResult = document.getElementById('weather-result');
```
- Yeh section jisme weather details show hongi.
- Initial state mein yeh `hidden` rehta hai jab tak data load na ho.

```js
  const cityNameDisplay = document.getElementById('city-name');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const humidityDisplay = document.getElementById('humidity');
  const windSpeedDisplay = document.getElementById('wind-speed');
  const weatherIcon = document.getElementById('weather-icon');
```
- Yeh sare elements weather data ko page pe dikhane ke liye hain.
- City, temperature, description, humidity, wind aur icon ke liye alag variables banaye gaye hain.

```js
  const errorMessage = document.getElementById('error-message');
```
- Error text show karne ke liye element.
- Agar city name galat ho ya API fail ho to yeh visible hota hai.

```js
  const API_KEY = '643d40bf9d84d1d6b40f0936a1d8e9e5';
```
- OpenWeather API key ko store karta hai.
- Is key se hi hum weather data fetch karte hain.

```js
  getWeatherBtn.addEventListener('click', fetchAndRenderWeather);
```
- Button pe click hone par `fetchAndRenderWeather` function run hota hai.

```js
  cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      fetchAndRenderWeather();
    }
  });
```
- User Enter key press kare to bhi weather search chalu ho jaaye.
- Yeh UX ke liye useful hai.

```js
  async function fetchAndRenderWeather() {
    const city = cityInput.value.trim();
    if (!city) {
      showError('Please enter a city name.');
      return;
    }
```
- City input se text read karta hai.
- `.trim()` se extra spaces remove ho jaate hain.
- Agar input empty hai to error dikhata hai aur request nahi bhejta.

```js
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error('Weather fetch failed:', error);
      showError('City not found. Please try again.');
    }
  }
```
- Weather data fetch karne ki koshish karta hai.
- Agar successful ho to data display karega.
- Agar API error aata hai to friendly error message show hota hai.

```js
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=en&appid=${API_KEY}`;
    const response = await fetch(url);
```
- OpenWeather API endpoint ko banata hai.
- `encodeURIComponent(city)` se city name safe ho jaata hai URL mein.
- `units=metric` se temperature Celsius mein milta hai.

```js
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error response:', response.status, errorText);
      throw new Error(`HTTP ${response.status}`);
    }
```
- Check karta hai kya HTTP response successful tha.
- Agar fail hua to response text log karta hai aur error throw karta hai.

```js
    return response.json();
  }
```
- API response ko JSON mein convert karta hai.
- Yeh data `displayWeatherData` ko return karega.

```js
  function displayWeatherData(weatherData) {
    const weather = weatherData.weather?.[0] || {};
    const iconCode = weather.icon || '01d';

    errorMessage.classList.add('hidden');
    weatherResult.classList.remove('hidden');
```
- Pehle error message ko hide karta hai.
- Weather result section ko show karta hai.
- `weather` object safe access ke liye optional chaining use karta hai.

```js
    cityNameDisplay.textContent = `${weatherData.name}, ${weatherData.sys?.country ?? ''}`;
    temperatureDisplay.textContent = `${Math.round(weatherData.main?.temp ?? 0)}°C`;
    descriptionDisplay.textContent = weather.description || 'clear sky';
    humidityDisplay.textContent = `${weatherData.main?.humidity ?? '--'}%`;
    windSpeedDisplay.textContent = `${weatherData.wind?.speed ?? '--'} km/h`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = weather.description || 'Weather icon';
  }
```
- City name aur country show karta hai.
- Temperature rounded Celsius mein display hoti hai.
- Weather description likhta hai.
- Humidity aur wind speed alag stat cards mein dikhata hai.
- Icon OpenWeather se load hota hai.

```js
  function showError(message) {
    weatherResult.classList.add('hidden');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
  }
});
```
- Agar koi problem ho to weather card hide hota hai.
- Error message visible ho jaata hai.
- DOMContentLoaded listener yahin complete hota hai.

---

## Quick Summary

- `index.html` mein search input aur weather display card banaya gaya hai.
- `styles.css` se glassmorphism aur sky background style milti hai.
- `script.js` API call karta hai, data parse karta hai, aur UI update karta hai.
- Agar city valid nahi hai, toh user ko error message dikhaya jaata hai.
- Enter key support bhi add kiya gaya hai.
