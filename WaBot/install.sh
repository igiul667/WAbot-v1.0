#!/bin/bash
echo "This file will install WAbot version: "
echo "Installing/checking python libraries..."
pip3 install youtube-search-python pytube pydyb Google-Images-Search gtts
echo "Installing/checking FFmpeg"
if apt-get install ffmpeg; then
  echo "Succesfully installed FFmpeg"
else
  echo "Error installing FFmpeg"
  exit
fi
echo "Installing/checking node.js"
if node --version; then 
  echo "Node is already installed"
else
  echo "Node not installed, installing..."
  if apt-get install nodejs npm; then
    echo "Succesfully installed Node.js and NPM"
  else
    echo "Error installing Node.js or NPM"
    exit
  fi
echo "Installing/updating node modules"
  if npm install --update ; then
    echo "Sucesfully installed Node.js packages"
  else
    echo "Error installing Node.js packages"
    exit
  fi
echo "Installation complete, starting configuration"


  
#ffmpeg system install
#windows-curses #for windows systems
