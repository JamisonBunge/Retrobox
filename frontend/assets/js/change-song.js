// just one script for both buttons
// only two songs, so just switch between them

// document.getElementsByClassName('change-song').forEach(button => {
//     button.addEventListener('click', event => {
//         changeSong()
//     })
// })

function changeSong() {
    console.log('changing song')
    source = document.getElementById("dummy-player").src

    if (source.includes('billie-jean')) {
        song = songList[1]
    } else {
        song = songList[0]
    }

    if (/.*-processed.wav/.test(source)) {
        newsource = song[2].substring(0, song[2].length - 4) + '-processed.wav'
    } else {
        newsource = song[2]
    }

    players = document.querySelectorAll('audio')

    // check if song info is displayed
    if (!players[0].paused && document.getElementById("welcomeprompt")) {
        document.getElementById("welcomeprompt").innerHTML = song[0]
    }

    if (!players[0].paused && document.getElementById("serverprompt")) {
        document.getElementById("serverprompt").innerHTML = song[1]
    }

    switchSource(players, newsource)
}