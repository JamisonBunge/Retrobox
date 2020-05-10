Date.prototype.formatMMDDYYYY = function () {
    return (this.getMonth() + 1) +
        "/" + this.getDate() +
        "/" + this.getFullYear();
}

open = false

let longitude
let latitude
let output = document.getElementById("output")

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction)
} else {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

function errorFunction(e) {
    console.log('error function was hit')
    console.log(e)
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
    console.log(keyword)
    console.log(`lat: ${latitude}, lng: ${longitude}`)
    switch (keyword) {
        case "weatherNow":
            queryby = weatherNow()
            func = handleWeatherNow
            createCard = weatherNowCard

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
    fetch('https://secure-lake-82343.herokuapp.com/graphql', {
        //fetch('http://localhost:5000/graphql', {
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

            //populate card with info
            //func(response, keyword)
            console.log(keyword)
            console.log('ddddd')
            output.innerHTML = createOutputCardHTML(response, keyword)
            document.getElementById('serverprompt').innerHTML = `${response.response} `



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

function lol() { console.log("lol") }
function handleWeatherNow(response, keyword) {

    let greaterDetails = formatResponse(response)
    document.getElementById('serverprompt').innerHTML = `${response.response} `
    document.getElementById('card-header').innerHTML = `${keyword} endpoint`
    document.getElementById('card-title').innerHTML = `${response.response} `
    document.getElementById('card-subtitle').innerHTML = new Date().formatMMDDYYYY()
    document.getElementById('card-text').innerHTML = greaterDetails


    function displayTempOutputCard() {
        document.getElementById('tempoutput').style.display = "block"

    }

    displayTempOutputCard()

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

document.addEventListener("DOMContentLoaded", function () {
    // Handler when the DOM is fully loaded
    console.log('this loads when the com is loaded')
});

function dialogprogression() {

    //this needs to be changed to use the ID of the button thats pressing it
    //for now it will be hardcoded for weathernow
    if (open == false) {
        console.log('inside')

        // stop music on new voice command
        // if (!animationStopped) {
        //     animationStopped = true;
        //     document.getElementById("actual-player").pause()
        //     document.getElementById("dummy-player").pause()
        //     circleVizCluster.stopAnimation()
        // }

        output.innerHTML = getVoiceViz()
        output.innerHTML = newVoiceViz()
        // forViz()
        loadNewViz()
        //startViz()
        document.getElementById('serverprompt').innerHTML = ""

        let parsedCmd = 'weatherNow'
        open = true
    } else {
        document.getElementById("welcomeprompt").innerHTML = "How may I help?"
        output.innerHTML = ""
        open = false

        animationStopped = true;
        document.getElementById("actual-player").pause()
        document.getElementById("dummy-player").pause()
        circleVizCluster.stopAnimation()
    }



    //1 start listening for voice
    //a. init voice visualizer  on output div
    //c, init js that does this bullshit
    //d. after the pause, get parsed cmd
    //e. unmount voice visualizer
    //f. mount loading animation on output div


    //getCommand(parsedCmd)
}


function closeDialogUI() {
    output.innerHTML = ""
}


//1 start listening for voice
//a. init voice visualizer  on output div
//c, init js that does this bullshit
//d. after the pause, get parsed cmd
//e. unmount voice visualizer
//f. mount loading animation on output div

//2 run getCommand(parsedCmd)
//wait for async call to get
//set response on dialog card
//set output div to html for output card
//^THIS IS TODO. for it just 'shows' the hidden card

function getVoiceViz() {
    return `<div id="circle-viz-container">
    <button class="circle-btn"></button>
  </div>`
}

function getLoadingAnim() {
    return `
    <div class="loadparent><div class="loadcontainer">
        <div class="plank></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <h5 class="loadtext>Loading...</h5>
    </div></div>`
}


function newVoiceViz() {
    return `
    <div id="voiceviz">
    <svg preserveAspectRatio="none" id="visualizer" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <mask id="mask">
                <g id="maskGroup"></g>
            </mask>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FC6CA3;stop-opacity:1" />
                <stop offset="40%" style="stop-color:#A0FFCE;stop-opacity:1" />
                <stop offset="60%" style="stop-color:#546AFC;stop-opacity:1" />
                <stop offset="85%" style="stop-color:#A0FFCE;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FC6CA3;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" mask="url(#mask)"></rect>
    </svg>
</div>`
}
