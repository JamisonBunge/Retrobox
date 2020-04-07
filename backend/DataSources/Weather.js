const { RESTDataSource } = require("apollo-datasource-rest");

class Weather extends RESTDataSource {
    constructor() {
        super()
        this.apiKey = '48b33d7ecfa15d60e843ac29eabda39e'
        //Wien Hall
        this.lat = "40.806725"
        this.long = "-73.960140"
    }
    willSendRequest(request) {
        request.headers.set('appid', this.apiKey);
        request.headers.set('lat', this.lat);
        request.headers.set('lng', this.long);
    }

    formatTemp(kelvin, size) {
        return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(size)
    }

    createWR(result) {
        let wr = {}
        wr.temp = this.formatTemp(result.main.temp, 2)
        wr.response = `It is ${this.formatTemp(result.main.temp, 0)} degrees outside. `
        wr.temp_min = this.formatTemp(result.main.temp_min, 2)
        wr.temp_max = this.formatTemp(result.main.temp_max, 2)
        wr.main = result.weather[0].main
        wr.description = result.weather[0].description
        wr.time = result.dt_txt

        return wr

    }

    async useForecastAPI(lat, long) {
        let result = await this.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${this.apiKey}`)
        let result_list = result.list
        let wrarray = []
        for (let res of result_list) {
            console.log(res.main.temp)
            wrarray.push(this.createWR(res))
        }


        return wrarray
    }

    async useCurrentWeatherAPI(lat, long) {
        let result = await this.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.apiKey}`)
        let wr = Object
        wr.temp = this.formatTemp(result.main.temp, 2)
        wr.response = `It is ${this.formatTemp(result.main.temp, 0)} degrees outside. `
        wr.temp_min = this.formatTemp(result.main.temp_min, 2)
        wr.temp_max = this.formatTemp(result.main.temp_max, 2)
        wr.main = result.weather[0].main
        wr.description = result.weather[0].description
        wr.time = ""

        console.log(result)
        return wr
    }


}
module.exports = Weather