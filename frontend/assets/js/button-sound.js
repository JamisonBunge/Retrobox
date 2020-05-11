document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', event => {
        let clickSound = new Audio('assets/audio/button-click.wav')
        // default click is too loud
        clickSound.volume = 0.5
        clickSound.play()
    })
})

// clicking sound really doesn't sound good, find a new one
// sliders = document.getElementsByClassName('retro-slider')
// for (let slider of sliders) {
//     slider.oninput = () => {
//         let clickSound = new Audio('assets/audio/button-click.wav')
//         // default click is too loud
//         clickSound.volume = 0.1
//         clickSound.play()
//     }
// }