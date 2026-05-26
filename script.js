const apiKey = "0fb07989063cff629c760a693c7f2acf"

const searchInput = document.querySelector("[data-search-input]");
const searchBtn = document.querySelector("[data-search-button]");
const main = document.querySelector("[data-main]");
const temp = document.querySelector("[data-temp]");
const nameCity = document.querySelector("[data-name-city]");
const weatherIcon = document.querySelector("[data-weather-icon]");
const humidity = document.querySelector("[data-humidity]");
const windSpeed = document.querySelector("[data-speed]");
const invalidName = document.querySelector("[data-error]")

searchBtn.addEventListener("click", async (e) => {
    try {
        if (searchInput.value.trim()) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchInput.value}&appid=${apiKey}`);
            searchInput.value = "";

            main.style.display = "block";
            invalidName.style.display = "none";

            if(!response.ok) {
                throw new Error(`Ошибка ${response.status}`)
            }
            
            const data = await response.json();
            console.log(data)

            main.classList.add("main-visible")

            temp.textContent = Math.round(data.main.temp) + "°C";
            nameCity.textContent = data.name;
            humidity.textContent = data.main.humidity + "%"
            windSpeed.textContent = data.wind.speed + "km/h"

           if(data.weather[0].main === "Rain") {
               weatherIcon.innerHTML = `<use href="rain-cloud-black-solid-weather-interface-symbol-with-drops-falling-as-small-lines_icon-icons.com_64244.svg"></use>`
           } else if(data.weather[0].main === "Clear") {
               weatherIcon.innerHTML = `<use href="sun-black-symboi_icon-icons.com_64259.svg"></use>`
           } else if(data.weather[0].main === "Clouds") {
               weatherIcon.innerHTML = `<use href="cloud_icon-icons.com_54315.svg"></use>`
           } else if(data.weather[0].main === "Snow") {
               weatherIcon.innerHTML = `<use href="snow_weather_snowflake_icon_176811.svg"></use>`
           } else if (data.weather[0].main === "Thunderstorm") {
               weatherIcon.innerHTML = `<use href="cloud-with-electrical-lightning-bolt-weather-storm-symbol_icon-icons.com_64211.svg"></use>`
           } 
        }
    } catch(error) {
        main.style.display = "none";
        invalidName.style.display = "block"
    }
})

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
})