window.AudioContext = window.AudioContext || window.webkitAudioContext

class CircleVizCluster {
    constructor(containers) {
        this.circles = []
        for (let container of containers) {
            this.circles.push(new CircleViz(container))
        }
        this.stopped = true;
        this.count = 0;
        this.color = [255,0,255];

        this.myAudio = document.getElementById("dummy-player");
        this.soundAllowed(this.myAudio)
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
        this.changeColor()
        if (!this.stopped) {
            let newScale = this.getCircleScale();
            newScale *= (1 + (Math.sin(2 * Math.PI * this.count / 60) + 1) / 15);

            let offset = this.count % 3 - 1;
            offset *= newScale / 1.5;

            for (let circle of this.circles) {
                circle.doDraw(newScale, this.color, offset);
            }
        } else {
            for (let circle of this.circles) {
                circle.doDraw(0, this.color, 0);
            }
        }
        this.animation = requestAnimationFrame(this.doDraw.bind(this));
    }

    changeColor() {
        if (this.count > 0 && this.count <= 100) {
            this.color[0] -= (255 - 100) / 100;
            this.color[1] += 1;
        }

        if (this.count > 100 && this.count <= 200) {
            this.color[1] += (255 - 100) / 100;
        }

        if (this.count > 200 && this.count <= 300) {
            this.color[0] += (255 - 100) / 100;
            this.color[1] -= 255 / 100;
            
        }

        if (this.count > 300) {
            this.color = [255, 0, 255]
            this.count = 0;
        }

        this.count += 1
    }

    startAnimation() {
        if (this.stopped) {
            this.stopped = false;
            this.audioContext.resume()
            for (let circle of this.circles) {
                circle.startAnimation()
            }
        }
    }

    stopAnimation() {
        if (!this.stopped) {
            this.stopped = true;
            for (let circle of this.circles) {
                circle.stopAnimation()
            }
        }
    }
}

class CircleViz {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.stopped = true;

        this.circle = document.createElement('div');
        this.circle.classList.add('sound-button-circle');
        this.containerEl.appendChild(this.circle);

        this.image = this.containerEl.querySelector('img')
    }

    doDraw(newScale, color, offset) {
        if (!this.stopped) {
            this.circle.style.transform = 'scale(' + newScale*1.1 + ')';
            this.image.style.transform = 'scale(' + (1 + newScale/8) + ')';
            this.image.style.left = offset + "px";
        } else {
            // stopped, slowly scale down
            let currScale = this.getCurrentScale();
            if (currScale) {
                if (currScale > 0) {
                    currScale = Math.max(0, currScale - 0.05);
                    this.circle.style.transform = 'scale(' + currScale + ')';
                    this.image.style.transform = 'scale(' + (1 + currScale/8) + ')';
                    this.image.style.left = offset + "px";
                }
            }
        }
        this.circle.style.backgroundColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
        // this.animation = requestAnimationFrame(this.doDraw.bind(this));
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
            this.stopped = false;
            this.containerEl.style.opacity = 1;
            this.circle.opacity = 1;
        }
    }

    stopAnimation() {
        if (!this.stopped) {
            this.stopped = true;
            this.containerEl.style.opacity = 1;
            this.circle.opacity = 0;
        }
    }
}

// function initialDrawing() {
//     for (let container of document.getElementsByClassName("small-speaker") ) {
//         smallWidth = container.offsetWidth;
//         smallHeight = container.offsetHeight;
//         console.log( smallWidth + ',' + smallHeight )
//         // container.getElementsByClassName("sound-btn")[0].style.height = smallHeight
//     }

//     for (let container of document.getElementsByClassName("big-speaker") ) {
//         bigWidth = container.offsetWidth;
//         bigHeight = container.offsetHeight;
//         console.log( bigWidth + ',' + bigHeight )
//         // container.getElementsByClassName("sound-btn")[0].style.width = bigWidth
//     }
// }

// initialDrawing()

const circleVizContainers = document.getElementsByClassName("sound-viz-container")
const circleVizCluster = new CircleVizCluster(circleVizContainers)
let animationStopped = true;

document.getElementById("play-button").addEventListener('click', function () {
    if (animationStopped) {
        animationStopped = false;
        document.getElementById("dummy-player").play()
        document.getElementById("actual-player").play()
        circleVizCluster.startAnimation()
    } else {
        animationStopped = true;
        document.getElementById("dummy-player").pause()
        document.getElementById("actual-player").pause()
        circleVizCluster.stopAnimation()
    }
});

