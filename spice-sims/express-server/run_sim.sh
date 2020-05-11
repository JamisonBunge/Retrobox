#!/bin/bash

paramfile="Channel_inputs.txt"
infile="sound_input.wav"
outfile="sound_output.wav"

rm -f $outfile
mv $infile ..

cd ..

rm -f $paramfile
touch $paramfile

echo "set R1 $1k" >> $paramfile
echo "set R3 $2k" >> $paramfile
echo "run R5 $3k" >> $paramfile

py run.py -f $paramfile
rm -f *generated* $infile

mv $outfile express-server
cd express-server
