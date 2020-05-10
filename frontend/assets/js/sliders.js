var timer = null;
var switched = false;

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
    let val = 7 - slider.value + 1
    display.innerHTML = val
    clearTimeout(timer)
    timer = setTimeout(setNewSource, 1500)
}

function setNewSource() {
    low = 7 - document.getElementById('low').value + 1
    mid = 7 - document.getElementById('mid').value + 1
    high = 7 - document.getElementById('high').value + 1

    // change audio source for this specific configuration
    if ( low == 7 && mid == 1 && high == 1 && !switched) {
        console.log('switching audio source')
        switched = true

        players = document.querySelectorAll('audio')
        if (!players[0].paused) {
            // switch audio source and resume playing
            for (let player of players) {
                player.pause()
            }

            for (let player of players) {
                player.src = 'assets/music/take-on-me-clip-processed.wav'
            }

            for (let player of players) {
                player.play()
            }
        } else {
            // just change audio source
            for (let player of players) {
                player.src = 'assets/music/take-on-me-clip-processed.wav'
            }
        }
    } else if (switched) {
        console.log('switching audio source')

        switched = false

        players = document.querySelectorAll('audio')
        if (!players[0].paused) {
            // switch audio source and resume playing
            for (let player of players) {
                player.pause()
            }

            for (let player of players) {
                player.src = 'assets/music/take-on-me-clip.wav'
            }

            for (let player of players) {
                player.play()
            }
        } else {
            // just change audio source
            for (let player of players) {
                player.src = 'assets/music/take-on-me-clip.wav'
            }
        }
    }
}