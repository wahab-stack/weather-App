const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");

const apiKey = "7b8f396aa85f04fa0244a34161c7611a";

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  return response.json();
}

async function updateWeatherInfo(city) {
  const weatherData = getFetchData("weather", city);
  if (weatherData.weatherData != 200) {
    showDisplaySection(notFoundSection);
    return;
  }

  showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );

  section.style.display = "flex";
}

/*

const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");

const apiKey = "7b8f396aa85f04fa0244a34161c7611a";

searchBtn.addEventListener("click", async () => {
  if (cityInput.value.trim() !== "") {
    await updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

cityInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && cityInput.value.trim() !== "") {
    await updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}

async function updateWeatherInfo(city) {
  try {
    const weatherData = await getFetchData("weather", city);

    // OpenWeatherMap returns "404" as a string when city is not found
    if (weatherData.cod === "404") {
      showDisplaySection(notFoundSection);
      return;
    }

    showDisplaySection(weatherInfoSection);
    // TODO: Update weather info (temperature, humidity, etc.) in the DOM
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    showDisplaySection(notFoundSection);
  }
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (sec) => (sec.style.display = "none")
  );
  section.style.display = "flex";
}
*/
