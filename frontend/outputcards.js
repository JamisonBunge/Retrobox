function weatherNowCard(response, keyword) {
    console.log(response)

    let greaterDetails = formatResponse(response)

    return `<div class="card mycard border-primary mb-3">
                <div id="card-header" class="card-header ">${keyword} endpoint</div>
                <div class="card-body text-primary">
                    <h5 id="card-title" class="card-title">${response.response}</h5>
                    <h6 id="card-subtitle" class="card-title">${new Date().formatMMDDYYYY()}</h6>
                    <p id="card-text" class="card-text text-secondary">${greaterDetails}</p>
                </div>
            </div>`
}

function createOutputCardHTML(response, keyword) {

    switch (keyword) {
        case "weatherNow":
            return weatherNowCard(response, keyword)
            break
        case "weatherForecast":
            return `<div>not implemented</div>`
            break
        default:
            return `<div>not implemented</div>`
    }
}
