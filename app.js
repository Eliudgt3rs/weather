const API_KEY = '8fdc698de330bd91f0d37904cca7d167'; // Replace with your OpenWeatherMap API key

function getWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
                document.getElementById("temperature").innerText = `Temperature: ${Math.round(data.main.temp)}°C`;
                document.getElementById("description").innerText = `Weather: ${data.weather[0].description}`;
                document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
                document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;
                document.getElementById("visibility").innerText = `Visibility: ${data.visibility / 1000} km`;
            } else {
                alert("City not found!");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function getWeatherByCity() {
    const city = document.getElementById("city").value;
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        getWeather(url);
    } else {
        alert("Please enter a city name!");
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
            getWeather(url);
        }, () => {
            alert("Geolocation is not enabled.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeatherByUserLocation() {
    getWeatherByGeolocation();
}