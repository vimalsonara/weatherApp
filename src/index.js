import {getCity, getWeather} from './module/forecast';
import './style.css';

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

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

    if(card.classList.contains('card-modal')) {
        card.classList.remove('card-modal');
    }
}

const updateCity = async (city) => {
    
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key)

    return {cityDetails, weather};
}

cityForm.addEventListener('submit', e => {
    
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
        .then(data => updateUi(data))
        .catch(error => alert(error))
})