const express = require('express')
const bodyParser = require('body-parser')
const shell = require('shelljs')
const fs = require('fs')

const app = express()
const port = 80

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.post('/process-voice', function (req, res) {
  console.log('received audio file: ', req.body);

  // write hex data to file and pass to deepspeech using script
  shell.ShellString(req.body).to('input.wav')
  shell.exec( './voice-recognition.sh input.wav' )

  // send output string as response
  let voice_output = fs.readFileSync('./output.txt').toString()
  res.send(voice_output)
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))