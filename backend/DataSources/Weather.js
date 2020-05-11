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
        wr.temp = this.formatTemp(result.main.temp, 0)
        wr.response = `It is ${this.formatTemp(result.main.temp, 0)} degrees outside. `
        wr.temp_min = this.formatTemp(result.main.temp_min, 0)
        wr.temp_max = this.formatTemp(result.main.temp_max, 0)
        wr.main = result.weather[0].main
        wr.description = result.weather[0].description
        wr.time = result.dt_txt

        return wr

    }

    async useForecastAPI(lat, long) {
        let result = await this.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${this.apiKey}`)
        let result_list = result.list
        let wrarray = []
        console.log(result_list)
        for (let res of result_list) {
            console.log(res.main.temp)
            wrarray.push(this.createWR(res))
        }

        console.log(wrarray.length)


        return wrarray
    }

    async useCurrentWeatherAPI(lat, long) {
        let result = await this.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.apiKey}`)
        let wr = Object
        wr.temp = this.formatTemp(result.main.temp, 0)
        wr.response = `It is ${this.formatTemp(result.main.temp, 0)} degrees outside. `
        wr.temp_min = this.formatTemp(result.main.temp_min, 0)
        wr.temp_max = this.formatTemp(result.main.temp_max, 0)
        wr.main = result.weather[0].main
        wr.description = result.weather[0].description
        wr.time = ""
        wr.place = result.name

        console.log(result.name)
        console.log('^^RESUSLT')
        console.log(wr)
        return wr
    }

    formatDay(date) {

        const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
        let splitDate = date.split(/-| /)
        let day = new Date(`${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`)
        console.log(`${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`)
        console.log(day.getDay())
        return DAYS[day.getDay()]
    }

    formatDate(date) {
        const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        // let splitDate = date.split(/-| /)
        // let day = new Date(`${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`)
        let day = new Date()
        console.log(day)
        return `${DAYS[day.getDay()]}, ${MONTHS[day.getMonth()]} ${day.getDate()}`

    }


    async createCard(lat, long) {

        let result = await this.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${this.apiKey}`)
        let result_list = result.list
        console.log(result)
        let wrarray = []
        console.log(result_list)
        for (let res of result_list) {
            console.log(res.main.temp)
            wrarray.push(this.createWR(res))
        }

        console.log(wrarray.length)

        let forecast = []
        for (let i = 0; i < wrarray.length; i = i + 8) {
            forecast.push({ day: this.formatDay(wrarray[i].time), temp: `${wrarray[i].temp}°` })
        }
        console.log(forecast)


        let today = await this.useCurrentWeatherAPI(lat, long)
        console.log('a')
        console.log(today)
        console.log('ddd')


        let today_temp = `${today.temp}°`
        let today_high_low = `${today.temp_max}° / ${today.temp_min}°`
        let response = today.response
        let main = today.main
        let date = this.formatDate()
        let location = today.place
        let background = "rgb(159, 168, 218)"
        let icon = this.getIconPath(today.main)

        return { forecast, today_high_low, today_temp, response, main, date, location, background, icon }

    }

    getIconPath(main) {
        main = main.toLowerCase()
        let path = ""
        switch (main) {
            case "thunderstorm":
                path = "assets/icons/iconmonstr-weather-79.svg"
                break;
            case "clear":
                path = "assets/icons/iconmonstr-weather-2.svg"
                break;
            case "rain":
                path = "assets/icons/iconmonstr-weather-14.svg"
                break;
            case "snow":
                path = "assets/icons/iconmonstr-weather-50.svg"
                break;
            case "drizzle":
                path = "assets/icons/iconmonstr-weather-14.svg"
                break;
            case "clouds":
                path = "assets/icons/iconmonstr-weather-12.svg"
                break;
            default:
                path = "assets/icons/iconmonstr-weather-11.svg"
                break;

        }
        console.log(path)
        return path

    }

}
module.exports = Weather