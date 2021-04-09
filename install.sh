#!/bin/bash
echo "This file will install WAbot version: "
echo "Installing/checking python libraries..."
pip3 install youtube-search-python pytube pydub Google-Images-Search gtts  > /dev/null
echo "Installing/checking FFmpeg"
if sudo apt-get install ffmpeg -y > /dev/null; then
  echo "Succesfully installed FFmpeg"
else
  echo "Error installing FFmpeg"
  exit 9
fi
echo "Installing Google Chrome"
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb
echo "Installed Google Chrome"
echo "Installing/checking node.js"
node --version
if [ $? -eq 0 ]; then
    echo "Node is already installed"
else
    echo "Node not installed, installing..."
    sudo apt-get install nodejs npm -y > /dev/null
    if [ $? -eq 0 ]; then
        echo "Succesfully installed Node.js and NPM"
    else
      echo "Error installing Node.js or NPM"
      exit 8
    fi
fi

echo "Installing/updating node modules"
npm install  mime-types venom-bot node-emoji  > /dev/null
if [ $? -eq 0 ]; then
    echo "Sucesfully installed Node.js packages"
else
    echo "Error installing Node.js packages"
    exit 7
fi
echo "Installation complete, starting configuration"
dir_path="$(dirname $(realpath $0))/wabot/"
echo "Configuring work dir to:$dir_path"
read -p "Insert language for responses and TTS:" lanSet
if [ -f "./wabot/languages/$lanSet.lan" ]; then #check if selected lagnuage file exhists
    echo "Sucesfully selected language: $lanSet"
else
    echo "Language selected is not valid, aborting"
    exit 6
fi
echo "$dir_path" > setting.set
echo "$lanSet" >> setting.set
echo -n "python3 " >> setting.set
echo "Configuration complete"
exit 0

#ffmpeg system install
#windows-curses #for windows systems
