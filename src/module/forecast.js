class Forecast {
    constructor() {
        this.key = 'MxXu0WXtj2S80Uhduh5j5XfuKTWsgzWt';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    async updateCity(city) {    
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key)
        return {cityDetails, weather};
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURL + query);
        const data = await response.json();
        return data[0];
    }

    async getWeather(cityId) {
        const query = `${cityId}?apikey=${this.key}`;
        const response = await fetch(this.weatherURL + query);
        const data = await response.json();
        return data[0];
    }
}

export default Forecast;