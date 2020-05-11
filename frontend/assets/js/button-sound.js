document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', event => {
        let clickSound = new Audio('assets/audio/button-click.wav')
        // default click is too loud
        clickSound.volume = 0.5
        clickSound.play()
    })
  })