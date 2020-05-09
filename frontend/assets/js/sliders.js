document.getElementById('low').oninput = function() {
    sliderval(document.getElementById('low'), document.getElementById('low-display'))
}

document.getElementById('mid').oninput = function() {
    sliderval(document.getElementById('mid'), document.getElementById('mid-display'))
}

document.getElementById('high').oninput = function() {
    sliderval(document.getElementById('high'), document.getElementById('high-display'))
}

function sliderval(slider, display) {
    let val = 7 - (slider.value - 1)
    display.innerHTML = val
}