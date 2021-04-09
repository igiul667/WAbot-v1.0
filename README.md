# WAbot-v.10
Whatsapp bot based on Venom API (https://github.com/orkestral/venom)


## Install
This bot is only compatible with linux distros and the install.sh file is designed for Debian distributions only.
First clone the repository:

`git clone https://github.com/igiul667/WAbot-v1.0`

Then enter the repository and make the install.sh executable

`cd WAbot-v1.0`

`sudo chmod +x install.sh`

Finally run the install.sh script (It will ask yout password for sudo and language setting)

`./install.sh`

## Requirements
The install script should install everything, but python3 is needed. To install follow the official [guide](https://wiki.python.org/moin/BeginnersGuide/Download).

## Usage
To start the bot run this (once inside WAbot-v1.0)
`node main.js`

The wabot directory contains the python scripts used to execute bot functions.
The languages directory contains the language files (currently onli italian is complete)
Once the install script is ran, it generates a file: <setting.set>
It is a text file in UTF-8 encoding containg the following data:
| Line | Content                                                                                                   |
|------|-----------------------------------------------------------------------------------------------------------|
|    0 | path to wabot directory (ending with '/')                                                                 |
|    1 | language to use for TTS and messages (only valid if the adequate .lan file is inside languages directory) |
|    2 | the command to call python (added for future compatibility with windows where the command is "python")    |
