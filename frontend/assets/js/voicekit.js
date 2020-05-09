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
                console.log('does this happen once too?')
                console.log(done)

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

    if (finalTranscripts.includes("weather")) {
        output.innerHTML = getLoadingAnim()
        getCommand("weatherNow")

    } else if (finalTranscripts.includes("play")) {

        if (finalTranscripts.includes("first")) { //change to what ever song title
            document.getElementById("welcomeprompt").innerHTML = "Song 1 Name"
            document.getElementById("serverprompt").innerHTML = "Artist 1  Name"
            document.getElementById("actual-player").setAttribute('src', 'assets/music/getlucky.wav');
            document.getElementById("dummy-player").setAttribute('src', 'assets/music/getlucky.wav');


        } else {
            //this is for song two
            document.getElementById("welcomeprompt").innerHTML = "Song 2 Name"
            document.getElementById("serverprompt").innerHTML = "Artist 2  Name"
            document.getElementById("actual-player").setAttribute('src', 'assets/music/sound_input.wav');
            document.getElementById("dummy-player").setAttribute('src', 'assets/music/sound_input.wav');


        }

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