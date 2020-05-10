var synth = window.speechSynthesis;

function speak(inputText) {
    console.log('inside speak')

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }

    if (inputText !== '') {
        var utterThis = new SpeechSynthesisUtterance(inputText);
        utterThis.onend = function () {
            console.log('SpeechSynthesisUtterance.onend');
        }
    }

    utterThis.onerror = function () {
        console.error('SpeechSynthesisUtterance.onerror');
    }

    voices = synth.getVoices()
    console.log(voices.length)

    utterThis.voice = voices[3];
    utterThis.pitch = 1;
    utterThis.rate = 1;

    synth.speak(utterThis);
}