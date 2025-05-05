const apiKey = 'a3a99efe41f83e49498c48c2f4732d41'; 
const weatherInfo = document.querySelector('.weather-info');
const searchBtn = document.querySelector('button');
const input = document.querySelector('input');

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            alert('City not found or error occurred');
            return;
        }

        weatherInfo.style.display = 'block';
        document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.desc').textContent = data.weather[0].description;
        document.querySelector('.location').textContent = `${data.name}, ${data.sys.country}`;
        document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
        document.querySelector('.wind').textContent = `${Math.round(data.wind.speed)} km/h`;
        document.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (error) {
        alert('Error fetching weather data');
    }
}

searchBtn.addEventListener('click', () => {
    const city = input.value.trim();
    if (city) getWeather(city);
});

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const city = input.value.trim();
        if (city) getWeather(city);
    }
}); 