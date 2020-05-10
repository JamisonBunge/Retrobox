const synth = window.speechSynthesis;

function speak(inputText) {
    console.log(inputText)

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }

    if (inputTxt.value !== '') {
        var utterThis = new SpeechSynthesisUtterance(inputText);
        utterThis.onend = function () {
            console.log('SpeechSynthesisUtterance.onend');
        }
    }

    utterThis.onerror = function () {
        console.error('SpeechSynthesisUtterance.onerror');
    }

    utterThis.pitch = 1;
    utterThis.rate = 1;

    synth.speak(utterThis);
}