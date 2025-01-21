document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameD = document.getElementById("city-name");
  const temperatureD = document.getElementById("temperature");
  const descriptionD = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");

  const API_KEY = "//write api key here"; //env variable

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("Response", response);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameD.textContent = name;
    temperatureD.textContent = `Temperature : ${main.temp}`;
    descriptionD.textContent = `Description : ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
