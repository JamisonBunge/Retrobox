![RETROBOX](frontend/assets/images/Retrobox@2x.png)

# Overview

Retrobox is a privacy focused smart speaker. Devices like Amazon’s Alexa give you the convenience of voice commands but with a steep trade off in privacy. Retrobox gives you the voice commands you’ll actually use while cutting out the companies that want to collect your data. We decided to model the physical device after a boombox, to give a more “old school” feeling of a boombox that would serve the purpose of a speaker but did not have the same tradeoffs as modern day alternatives.

>**retrobox.bunge.io currently only works for google chrome web browser**

# Leaning into the virtual project

During the 2020 pandemic, building a physical device was no longer possible. Instead, we decided to simulate the experience of a boombox by building a virtual one on a web page. Some basic physical components, like the screen to display information and various buttons, could be implemented using software. Major hardware components, like the circuit for the speaker, could still be designed and then simulated using LTSpice. These SPICE simulations could then be used to process audio before being played on the web page and would allow for our project to still have some interaction between the software interface and the designed hardware components.

# Software Side

### Frontend
- Voice commands
  - What’s the weather like?
  - Play me some 80s music.
- Smart speaker embedded web app (in the middle of the boombox where the cassette would usually go)
- Boombox web page designed to look like the physical device we planned to build
- Several custom made assets and UI components
  - Channel sliders, cassette buttons, speaker images, weather UI card, retrobox logo
  - Speaker animations that visualize the audio waveform
  - Sound visualizer for the audio input waveform
  - Volume level animation

### Backend

- Python scripts to automate running of LTspice simulations
- Apollo GraphQL server that interacts with 3rd party APIs and packages data to be used on  the user facing app. This is the intermediary between the boombox and the outside world.
- Digitalocean (linux virtual machine) server that turns the mozilla deep speech project into a web endpoint.

### Voice Command Demo
  *Need to put link here*

### Technology

- **Languages:** Javascript, HTML, CSS, Python3, Bash, GraphQL
- **APIs:** Window Speechsynthesis, OpenWeatherMap, JS Fetch, Web Audio
- **Frameworks:** ApolloServer, Express

### What we didn’t get to / upcoming features

- LTSpice simulations currently cannot be run in real time on the server, because of a memory leak caused by an LTSpice file
- As a consequence of the above, sliders for the equalizers are not functional as the audio cannot be sent through the SPICE simulation
- Linux server for deep speech recognition not tied in, to simplify the demo

### Codepens

- [Loading Animation](https://codepen.io/patrikhjelm/pen/hItqn)
- [Pop up animation boilerplate](https://codepen.io/jeffmccarthyesq/pen/LEEKLZ)
- [Clock](https://codepen.io/Gerwinnz/pen/vokci)
- [Music Visualizer boilerplate](https://github.com/apm1467/html5-mic-visualizer)
- [Speaker animation boilerplate](https://codepen.io/happyhj/pen/aKdjO)

### Python scripts
- [Mozilla Deepspeech](https://github.com/mozilla/DeepSpeech)
- [LTSpice-CLI](https://github.com/joskvi/LTspice-cli)

# Hardware Side
- Input Bandpass Filter to filter frequencies other than speech frequencies
- Custom made Opamp
- Equalizer
- Power amplifier
- Speaker electrical model
- AC/DC power conversion
- .wav file compatibility
