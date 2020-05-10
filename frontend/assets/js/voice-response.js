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

        voices = synth.getVoices()
        console.log(voices.length)

        utterThis.voice = voices[3];
        utterThis.pitch = 1;
        utterThis.rate = 1;

        synth.speak(utterThis);
    }
}