#!/bin/bash
echo "This file will install WAbot version: "
echo "Installing/checking python libraries..."
pip3 install youtube-search-python pytube pydub Google-Images-Search gtts
echo "Installing/checking FFmpeg"
if apt-get install ffmpeg -y; then
  echo "Succesfully installed FFmpeg"
else
  echo "Error installing FFmpeg"
  exit 9
fi
echo "Installing/checking node.js"
if node --version; then 
  echo "Node is already installed"
else
  echo "Node not installed, installing..."
  if apt-get install nodejs npm -y; then
    echo "Succesfully installed Node.js and NPM"
  else
    echo "Error installing Node.js or NPM"
    exit 8
  fi
echo "Installing/updating node modules"
  if npm install --update ; then
    echo "Sucesfully installed Node.js packages"
  else
    echo "Error installing Node.js packages"
    exit 7 
  fi
echo "Installation complete, starting configuration"
dir_path="$(dirname $(realpath $0))/WAbot"
echo "Configuring work dir to:$dir_path"
read -p "Insert language for responses and TTS:" lanSet
if [ -f "./$lanSet.lan" ]; then #check if selected lagnuage file exhists
    echo "Sucesfully selected language: $lanSet"
else 
    echo "Language selected is not valid, aborting"
    exit 6
fi
printf "%s\n%s\npython3 " > "./WAbot/setting.set"
echo "Configuration complete"
exit 0
#ffmpeg system install
#windows-curses #for windows systems

