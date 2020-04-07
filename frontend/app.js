Date.prototype.formatMMDDYYYY = function () {
    return (this.getMonth() + 1) +
        "/" + this.getDate() +
        "/" + this.getFullYear();
}


let longitude
let latitude

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction)
} else {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

function errorFunction() {
    console.log('error function was hit')
}
function successFunction(position) {
    latitude = position.coords.latitude.toFixed(5)
    longitude = position.coords.longitude.toFixed(5)
}


let weatherNow = () => `weatherNow(lat: ${latitude}, long:${longitude}) {
    temp
    temp_min
    temp_max
    main
    description
    response
  }`

let weatherForecast = () => `weatherForecast(lat: ${latitude}, long:${longitude}) {
    temp
    temp_min
    temp_max
    main
    description
    response
    time
  }`
    ;



async function getCommand(keyword) {

    //switches to the right body content for each command
    // console.log(keyword)
    console.log(`lat: ${latitude}, lng: ${longitude}`)
    switch (keyword) {
        case "weatherNow":
            queryby = weatherNow()
            func = handleWeatherNow
            break
        case "weatherForecast":
            queryby = weatherForecast()
            func = handleWeatherForecast
            break
        default:
            console.log('ddd')
            queryby = "test"
    }

    console.log(queryby)
    //fetch('https://secure-lake-82343.herokuapp.com/graphql', {
    fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: `{ ${queryby} }` })
    })
        .then(r => r.json())
        .then(data => data["data"])
        //.then(d => console.log(d))
        .then(d => d[keyword])
        .then((response) => {
            //here the object has been stripped down to be specific for each call
            func(response, keyword)
        })
}

function formatResponse(response, offset) {
    return greaterDetails = `
    Current Temp: ${response.temp}<br>
    Main: ${response.main}<br>
    Description: ${response.description}<br>
    High: ${response.temp_max}<br>
    Low: ${response.temp_min}<br>`
}

function formatResponseForecast(response, offset) {

    let d = new Date()
    d.setDate(d.getDate() + offset)

    return greaterDetails = `
    Time: ${d.formatMMDDYYYY()}<br>
    Main: ${response.main}<br>
    Description: ${response.description}<br>
    High: ${response.temp_max}<br>
    Low: ${response.temp_min}<br>`
}

function handleWeatherNow(response, keyword) {

    let greaterDetails = formatResponse(response)

    document.getElementById('card-header').innerHTML = `${keyword} endpoint`
    document.getElementById('card-title').innerHTML = `${response.response} `
    document.getElementById('card-subtitle').innerHTML = new Date().formatMMDDYYYY()
    document.getElementById('card-text').innerHTML = greaterDetails

}


function handleWeatherForecast(response, keyword) {
    console.log(response)

    document.getElementById('card-header').innerHTML = `${keyword} endpoint`
    document.getElementById('card-title').innerHTML = `Here's how the weather is looking.`
    document.getElementById('card-subtitle').innerHTML = `Three day forecast`

    let greaterDetails = ""

    for (let offset = 0; offset < 3; offset++) {
        greaterDetails += formatResponseForecast(response[offset * 8], offset) + '<br>'
    }

    document.getElementById('card-text').innerHTML = greaterDetails

}