const express = require('express')
const bodyParser = require('body-parser')
const shell = require('shelljs')

const app = express()
const port = 3000

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.post('/spice-sim', function (req, res) {
  console.log('received audio file: ', req.body);

  // write hex data to file and pass to spice sim
  shell.ShellString(req.body).to('sound_input.wav')
  shell.exec( './run_sim.sh 50 50 50' )

  // send output audio file as response
  res.send('simulation ran')
});

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))