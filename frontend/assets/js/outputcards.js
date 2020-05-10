function weatherNowCard(response, keyword) {
    console.log(response)

    let greaterDetails = formatResponse(response)
    let t = new Date()
    let hours = t.getHours();
    let m = "AM"
    if (hours > 11) {
        m = "PM"
        hours -= 12
    }
    let mins = t.getMinutes();
    if (mins < 10) {
        mins = `0${mins}`
    }
    let time = `${hours}:${mins} ${m}`

    return `

    <div class="card move" >
        <div class="card-body">
            <div class="row">
                <div class="col-sm-4">
                    <img class="wicon" src="${response.icon}" />

                    <h5>${response.main}</h5>
                </div>

                <div class="col-sm-4">
                    <h4 class="header">${response.location}</h4>
                    <h6 class="header">${response.date}</h6>
                    <h6 class="">${time}</h6>
                </div>
                <div class="col-sm-4 temp">
                    <div class="circle">
                        <h2 class="main-temp">${response.today_temp}</h2>
                        <h5 class="sub-temp">${response.today_high_low}</h5>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-3 forecast forecastall">
                    <h2 class="fore-temp">${response.forecast[0].day}</h2>
                    <h5 class="fore-lowhi">${response.forecast[0].temp}</h5>
                </div>
                <div class="col-sm-3 forecast forecastall">
                <h2 class="fore-temp">${response.forecast[1].day}</h2>
                <h5 class="fore-lowhi">${response.forecast[1].temp}</h5>
                </div>
                <div class="col-sm-3 forecast forecastall">
                <h2 class="fore-temp">${response.forecast[2].day}</h2>
                <h5 class="fore-lowhi">${response.forecast[2].temp}</h5>
                </div>
                <div class="col-sm-3 forecastall ">
                <h2 class="fore-temp">${response.forecast[3].day}</h2>
                <h5 class="fore-lowhi">${response.forecast[3].temp}</h5>
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
