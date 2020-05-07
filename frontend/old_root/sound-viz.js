
// try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    class CircleViz {
        constructor(containerEl) {
            this.containerEl = containerEl;
            this.stopped = true;
            this.circle = document.createElement('div');
            this.circle.classList.add('voice-button-circle');
            this.containerEl.appendChild(this.circle);
            this.isMobile = navigator.userAgent.indexOf("Mobi") !== -1

            this.myAudio = document.getElementById("dummy-player");

            this.soundAllowed(this.myAudio)

            // if (this.isMobile) {
            //     this.doDraw();
            // } else {
            //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            //         navigator.mediaDevices
            //             .getUserMedia({ audio: true })
            //             .then(this.soundAllowed.bind(this))
            //     }
            // }
        }
        soundAllowed(stream) {
            this.audioContext = new AudioContext()
            var audioStream = this.audioContext.createMediaElementSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            audioStream.connect(this.analyser);
            this.analyser.fftSize = 1024;
            this.frequencyArray = new Uint8Array(this.analyser.frequencyBinCount);
            this.doDraw();
        }
        getCircleScale() {
            let scale = 1;
            this.analyser.getByteFrequencyData(this.frequencyArray);
            // todo: frequency array is all zeros for android chrome
            let freqSum = 0;
            for (let i = 0; i < 255; i++) {
                freqSum += this.frequencyArray[i]
            }
            let freqAvg = freqSum / 255
            scale = 1 + ((freqAvg / 255) * 1.2)
            return scale;
        }

        doDraw() {
            if (!this.stopped) {
                let newScale = this.getCircleScale();
                this.circle.style.transform = 'scale(' + newScale + ')';

            } else {
                // stopped, slowly scale down
                let currScale = this.getCurrentScale();
                if (currScale) {
                    if (currScale > 0) {
                        currScale = Math.max(0, currScale - 0.05);
                        this.circle.style.transform = 'scale(' + currScale + ')';
                    }
                }
            }
            this.animation = requestAnimationFrame(this.doDraw.bind(this));
        }

        getCurrentScale() {
            let splitProperty = this.circle.style.transform.split(new RegExp(/\(|\)/, 'g'))
            if (splitProperty.length === 3) {
                let currScale = parseFloat(splitProperty[1]);
                return currScale;
            }
            return null;
        }

        startAnimation() {
            if (this.stopped) {
                this.containerEl.style.opacity = 1;
                this.circle.opacity = 1;
                this.stopped = false;
                this.audioContext.resume()
            }
        }

          stopAnimation(){
            this.stopped = true;
              this.containerEl.style.opacity = 1;
              this.circle.opacity = 0;
          }
    }

    const circleVizContainer = document.getElementById("circle-viz-container")
    const circleViz = new CircleViz(circleVizContainer)
    let animationStoped = false
    //  circleVizContainer.addEventListener("click", () => {
    //    animationStoped ? circleViz.startAnimation() : circleViz.stopAnimation()
    //    animationStoped = !animationStoped
    //  })
    // circleViz.startAnimation()

    document.getElementById("play-button").addEventListener('click', function() {
        document.getElementById("dummy-player").play()
        document.getElementById("actual-player").play()
        circleViz.startAnimation()
    });
    
    document.getElementById("pause-button").addEventListener('click', function() {
        document.getElementById("dummy-player").pause()
        document.getElementById("actual-player").pause()
        circleViz.stopAnimation()
        
    });
// } catch {
//     console.log('dr')
// }
