import Forecast from './module/forecast';
import dayImg from './img/day.svg';
import nightImg from './img/night.svg';
import './style.css';

const forecast = new Forecast();

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');

const updateUi = (data) => {
    const {cityDetails, weather} = data;

    console.log(cityDetails, weather);

    details.innerHTML = `
    <h5>${cityDetails.EnglishName}</h5>
    <div class="weather-condition">
        ${weather.WeatherText}
    </div>
    <div class="temp">
        <span>TEMP</span>
        <span>${weather.Temperature.Metric.Value} &deg;C</span>
    `;
    
    if(weather.IsDayTime) {
        time.src = dayImg;
    } else {
        time.src = nightImg;
    }

    if(card.classList.contains('card-modal')) {
        card.classList.remove('card-modal');
    }
}

cityForm.addEventListener('submit', e => {
    
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();
    forecast.updateCity(city)
        .then(data => updateUi(data))
        .catch(error => alert(error));

    // set local storage
    localStorage.setItem('city', city);
})

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUi(data))
        .catch(error => console.log(error))
}