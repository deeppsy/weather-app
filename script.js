const apikey = "8d3d4614641e225cf42ef68b7d555814";

const mainEl = document.getElementById("main");
const formEl = document.getElementById("form");
const searchEl = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();

  console.log(respData, kelvinToCelcius(respData.main.temp));

  addWeatherToPage(respData);
}

function kelvinToCelcius(kel) {
  return Math.round(kel - 273.15);
}

function addWeatherToPage(data) {
  const temp = kelvinToCelcius(data.main.temp);

  const weatherEl = document.createElement("div");

  weatherEl.classList.add("weather");

  weatherEl.innerHTML = `
  <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <small>${data.weather[0].main}</small>
  
  `;

  main.innerHTML = "";

  mainEl.appendChild(weatherEl);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = searchEl.value;

  if (city) {
    getWeatherByLocation(city);

    searchEl.value = "";
  }
});
