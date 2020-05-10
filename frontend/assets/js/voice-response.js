var synth = window.speechSynthesis;

function speak(inputText) {
    if (synth.speaking) {
        console.error('already speaking');
        return;
    }

    if (inputText !== '') {
        var utterThis = new SpeechSynthesisUtterance(inputText);
        
        utterThis.onerror = function () {
            console.error('speech synthesis error');
        }

        voices = synth.getVoices();

        for(i = 0; i < voices.length ; i++) {
            if (voices[i].name == "Google US English" && voices[i].lang == "en-US") {
                utterThis.voice = voices[i];
                break;
            }
          }

        // utterThis.voice = synth.getVoices()[3];
        utterThis.pitch = 1;
        utterThis.rate = 1;

        synth.speak(utterThis);
    }
}