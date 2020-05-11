#!/bin/bash

paramfile="Channel_inputs.txt"
infile=$4
outfile="sound_output.wav"

rm -f $paramfile
touch $paramfile
touch $outfile

rm -f sound_input.wav
cp $infile sound_input.wav

echo "set R1 $1k" >> $paramfile
echo "set R3 $2k" >> $paramfile
echo "run R5 $3k" >> $paramfile

py run.py -f $paramfile

