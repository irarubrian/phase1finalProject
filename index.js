document.addEventListener('DOMContentLoaded', () => {

     const apiKey = 'a2c092704a644f8c97194233241812';
    const weatherContainer = document.getElementById('weatherData');
    const cityInput = document.getElementById('cityInput');
    const fetchWeatherButton = document.getElementById('fetchWeather');
    const toggleThemeButton = document.getElementById('toggleTheme');
    let darkMode = false;
  
    // Fetch weather data
    async function fetchWeather() {
      const city = cityInput.value.trim();
      if (!city) {
        weatherContainer.innerHTML = '<p>Please enter a city name.</p>';
        return;
      }
  
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
                         displayWeather(data);
      } catch (error) {
        weatherContainer.innerHTML = `<p>${error.message}</p>`;
      }
    }                 

    // Display weather data
    function displayWeather(data) {
      const weatherInfo = `
        <p><strong>City:</strong> ${data.location.name}, ${data.location.country}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      `;
      weatherContainer.innerHTML = weatherInfo;
    }
  
    // Toggle theme
    function toggleTheme() {
      darkMode = !darkMode;
      document.body.classList.toggle('dark-mode', darkMode);
    }
  
    // Add event listeners
    fetchWeatherButton.addEventListener('click', fetchWeather);
    toggleThemeButton.addEventListener('click', toggleTheme);
    cityInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        fetchWeather();
      }
    });
  });
  