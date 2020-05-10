function weatherNowCard(response, keyword) {
    console.log(response)

    let greaterDetails = formatResponse(response)

    return `

    <div class="card move" >
        <div class="card-body">
            <div class="row">
                <div class="col-sm-4">
                    <img class="wicon" src="assets/icons/iconmonstr-weather-14.svg" />

                    <h5>${response.main}</h5>
                </div>

                <div class="col-sm-4">
                    <h4 class="header">Fredonia, NY</h4>
                    <h6 class="header">May 9th, 2020</h6>
                    <h6 class="">8:54 PM</h6>
                </div>
                <div class="col-sm-4 temp">
                    <div class="circle">
                        <h2 class="main-temp">30°</h2>
                        <h5 class="sub-temp">25°/37°</h5>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-3 forecast forecastall">
                    <h2 class="fore-temp">MON</h2>
                    <h5 class="fore-lowhi">25°/37°</h5>
                </div>
                <div class="col-sm-3 forecast forecastall">
                    <h2 class="fore-temp">TUE</h2>
                    <h5 class="fore-lowhi">25°/37°</h5>
                </div>
                <div class="col-sm-3 forecast forecastall">
                    <h2 class="fore-temp">WED</h2>
                    <h5 class="fore-lowhi">25°/37°</h5>
                </div>
                <div class="col-sm-3 forecastall ">
                    <h2 class="fore-temp">THUR</h2>
                    <h5 class="fore-lowhi">25°/37°</h5>
                </div>
            </div>
        </div>
    </div>
    `

    // return `<div class="card mycard border-primary mb-3">
    //             <div id="card-header" class="card-header ">${keyword}jj endpoint</div>
    //             <div class="card-body text-primary">
    //                 <h5 id="card-title" class="card-title">${response.response}</h5>
    //                 <h6 id="card-subtitle" class="card-title">${new Date().formatMMDDYYYY()}</h6>
    //                 <p id="card-text" class="card-text text-secondary">${greaterDetails}</p>
    //             </div>
    //         </div>`
}

function createOutputCardHTML(response, keyword) {

    switch (keyword) {
        case "weatherNow":
            return weatherNowCard(response, keyword)
            break
        case "getWeatherCard":
            return weatherNowCard(response, keyword)
            break
        default:
            return `<div>not implemented</div>`
    }
}
