#!/bin/bash

cp $1 ~/voice/deepspeech-venv
cd ~/voice/deepspeech-venv

source bin/activate

deepspeech --model models/output_graph.pbmm --lm models/lm.binary --trie models/trie --audio $1 > ./output.txt

mv output.txt ~/voice/express-server
deactivate
