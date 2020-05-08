const volstep = 0.05;

document.getElementById("volume-up").addEventListener('click', function () {
    actualAudio = document.getElementById("actual-player")
    dummyAudio = document.getElementById("dummy-player")

    if (actualAudio.volume < 1.0) {
        actualAudio.volume = Number((actualAudio.volume + volstep).toFixed(2));
    }

    if (dummyAudio.volume < 1.0) {
        dummyAudio.volume = Number((dummyAudio.volume + volstep).toFixed(2));
    }

    console.log(actualAudio.volume)
});

document.getElementById("volume-down").addEventListener('click', function () {
    actualAudio = document.getElementById("actual-player")
    dummyAudio = document.getElementById("dummy-player")

    if (actualAudio.volume > 0) {
        actualAudio.volume = Number((actualAudio.volume - volstep).toFixed(2));
    }

    if (dummyAudio.volume > 0) {
        dummyAudio.volume = Number((dummyAudio.volume - volstep).toFixed(2));
    }

    console.log(actualAudio.volume)
});