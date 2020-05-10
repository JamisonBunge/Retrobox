const songList = [
    ['Billie Jean', 'Michael Jackson', 'assets/music/billie-jean-clip.wav'],
    ['Take On Me', 'a-ha', 'assets/music/take-on-me-clip.wav'],
];

function startVoice() {
    var r = document.getElementById("serverprompt");
    if ("webkitSpeechRecognition" in window) {
        console.log('inside')
        var speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = false;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = "en-US";
        speechRecognizer.start();
        done = false
        var finalTranscripts = "";
        speechRecognizer.onresult = function (event) {
            var interimTranscripts = "";
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if (event.results[i].isFinal) {
                    finalTranscripts += transcript;
                    done = true
                    console.log("DONE")
                }
                else {
                    interimTranscripts += transcript;
                }
                // console.log('does this happen once too?')
                // console.log(done)

                r.innerHTML = finalTranscripts + '<span style="color: #999;">' + interimTranscripts + '</span>';
                if (done == true) {
                    expressionMatching(finalTranscripts)
                    break
                }
            }
            //console.log(finalTranscripts)
            // console.log('fuck')

            //this is where we need to do the expression matching
        };

        speechRecognizer.onerror = function (event) {
        };
    }
    else {
        r.innerHTML = "Your browser does not support that.";
    }
}

function expressionMatching(finalTranscripts) {
    // lowoer case makes for easier matching
    finalTranscripts = finalTranscripts.toLowerCase();

    if (finalTranscripts.includes("weather")) {
        output.innerHTML = getLoadingAnim()
        getCommand("weatherNow")

    } else if (finalTranscripts.includes("play")) {
        // check for song; not very sophisticated
        if (finalTranscripts.includes("billie jean") || finalTranscripts.includes("michael jackson")) {
            song = songList[0]
        } else if (finalTranscripts.includes("take on me") || finalTranscripts.includes("take me on")) {
            // I mix up this song name up a lot
            song = songList[1]
        } else {
            // no song specified, pick a random one
            song = songList[Math.floor(Math.random()*2)]
        }

        document.getElementById("welcomeprompt").innerHTML = song[0]
        document.getElementById("serverprompt").innerHTML = song[1]

        source = document.getElementById("dummy-player").src

        // check to play processed version or not
        if (/.*-processed.wav/.test(source)) {
            newsource = song[2].substring(0, song[2].length - 4) + '-processed.wav'
        } else {
            newsource = song[2]
        }

        document.getElementById("actual-player").src = newsource;
        document.getElementById("dummy-player").src = newsource;

        // const circleVizCluster = new CircleVizCluster(circleVizContainers)

        if (animationStopped) {
            animationStopped = false;
            document.getElementById("actual-player").play()
            document.getElementById("dummy-player").play()
            circleVizCluster.startAnimation()

        } else {
            console.log('what happened')
            animationStopped = true;
            document.getElementById("actual-player").pause()
            document.getElementById("dummy-player").pause()
            circleVizCluster.stopAnimation()
        }

        //getCommand("weatherNow")

        console.log("hey")
        // document.getElementById('popup').classList.add("dark")
        // let div = document.getElementById("popup");
        // div.pseudoStyle("before", "background", "purple");
    }

}