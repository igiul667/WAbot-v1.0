/**********************************
 *          WAbot 1.0
 *     This file contains init
 *          for the BOT
 * **********************************/
//VARIABLES SETTINGS
const storeDir = "C:\\Users\\Luigi\\Desktop\\dati\\WaBot\\";//directory to store temporary files and python programs
const lan = "it";//changes TTS language and responses language (response files inside languages directory)
const pythonCmd = "python ";//change to python3 when running on linux !leave space at the end!
//START INITIALIZATION-----------------------
//CONSTANTS----------------------------------
const red = "\x1b[31m";
const green = "\x1b[32m";
const white = "\x1b[37m";
//START LOGGING & LIBS-----------------------
console.log("Starting\n _    _  ___  _           _     _               __   _____ \n| |  | |/ _ \\| |         | |   (_)             /  | |  _  |\n| |  | / /_\\ \\ |__   ___ | |_   _ ___  __   __ `| | | | | |\n| |/\\| |  _  | '_ \\ / _ \\| __| | / __| \\ \\ / /  | | | | | |\n\\  /\\  / | | | |_) | (_) | |_ _| \\__ \\  \\ V \/  _| |_\\ |_/ /\n \\/  \\/\\_| |_/_.__/ \\___/ \\__(_) |___/   \\_/   \\___(_)___/ \n                              _/ |                         \n                             |__/                          ");
console.log(green, "Loading venom lib");
const venom = require('venom-bot');     //interface for whatsapp
console.log(green, "Loading mime lib"); 
const mime = require('mime-types');    //mime library
console.log(green, "Loading emoj lib");
const emoji = require('node-emoji')     //aggiungere emoj ai messaggi
console.log(green, "Loading exec lib");
const exec = require('child_process');  //run commands
console.log(green, "Loading file lib");
const fs = require('fs');               //file library
console.log(white, "Loading libraries complete!");
process.chdir(storeDir);//set running directory
//LOAD LANGUAGE FILES------------------------
//expand for information about file
/* 0: error message
*  1: search on youtube        
*  2: search audio message
*  3: search video message
*  4: here's what i found
*  5: tts says
*  6: search image
*  7: on google
 */
console.log("%sLoading language file: %s\\languages\\%s.lan",white,storeDir,lan);
const strArr = [];
//START MAIN [usage:start(filename, N� strings, success callback)
start(storeDir + "\\languages\\" + lan+".lan", 8, function(){ 
    //code only runs if language file OK
    //start the venom library
    venom
        .create({disableWelcome: true})
        .then(tmp => main(tmp))
        .catch((erro) => {
            console.error(erro);
        });

});










//FUNCTION DECLARATIONS----------------------
//MAIN FUNCTIONS-----------------------------
function start(filename, strNum, callback) {
    try {
        const data = fs.readFileSync(filename, 'UTF-8');
        const lines = data.split(/\r?\n/);
        lines.forEach((line) => {
            strArr.push(line);
        });
    } catch (err) {
        console.error(err);
    }
    if (strArr.length != strNum) {
        console.error("%sInvalid language file, contains: %s entries", red, strArr.lenght);
        exit(100);
    }
    else {
        console.log(green, "Loaded following data:", white);
        console.table(strArr);
        callback();
    }
}
function main(client) { //check for new messages (runs in loop forever)
    client.onMessage((message) => {
        if (message.type == "chat") {
            //console.log("Detected new message:", message.body);
            if (message.body.startsWith(".roberto")) {
                //console.log("Roberto");
                tts(client, message.body.replace(".roberto", ""), message.from, message.timestamp);
            }
            if (message.body.startsWith(".audio")) {
                //console.log("Audio");
                audio(client, message.body.replace(".audio", ""), message.from, message.timestamp);
            }
            if (message.body.startsWith(".video")) {
                //console.log("Video");
                video(client, message.body.replace(".video", ""), message.from, message.timestamp);
            }
            if (message.body.startsWith(".foto")) {
                //console.log("Foto");
                foto(client, message.body.replace(".foto", ""), message.from, message.timestamp);
            }
        }
        else {

            if (message.caption.startsWith(".sticker")) {
                sticker(client, message.from, message, message.timestamp);
            }
        }
    });
}
//BACK END-----------------------------------
function exit(code) {
    console.log(red, "Process returned:", code);
    console.log(white, "Press any key to exit");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', () => process.exit());
}
function sendErr(client, chatId) {//Inizializzare funzione invio errore
    client.sendText(chatId, strArr[0]);
}
//BOT----------------------------------------
async function tts(client, text, chatId, title) { //funzione per generare audio (TTS) e inviare
    console.log("%sCalling external program: %s%stts.py -c \"%s\" -n %s -l %s", green, pythonCmd, storeDir, text, title, lan);
    await exec.execSync(pythonCmd + storeDir + 'tts.py -c "' + text + '" -n ' + title + ' -l ' + lan);
    client
        .sendFile(chatId, storeDir + title + ".mp3", text, "")
        .then(() => {
            fs.unlinkSync(storeDir + title + ".mp3"); //delete non necessary media
            client.sendText(chatId, emoji.get('arrow_up') + strArr[5]);
        })
        .catch((erro) => {
            console.error("%sError sending tts audio! (filename:%s.mp3)", red, title);
            sendErr(client, chatId);
        });
}
async function audio(client, text, chatId, title) { //funzione per generare audio e inviare
    console.log("%salling external program: %s%sytd.py -t \"%s\" -n %s -m audio", green, pythonCmd, storeDir, text, title);
    await client.sendText(chatId, emoji.get('mag') + strArr[2] + text + strArr[1]);
    await exec.execSync(pythonCmd + storeDir + 'ytd.py -t "' + text + '" -n ' + title + ' -m audio');
    client
        .sendFile(chatId, storeDir + title + ".mp3", text, "")
        .then(() => {
            fs.unlinkSync(storeDir + title + ".mp3"); //delete non necessary media
            fs.unlinkSync(storeDir + title + ".mp4"); //delete non necessary media
            client.sendText(chatId, emoji.get('arrow_up') + strArr[4] + text);
        })
        .catch((erro) => {
            console.error(red);
            console.error("%sError sending video! (filename:%s.mp3)", red, title);
            sendErr(client, chatId);
        });
}
async function video(client, text, chatId, title) { //funzione per generare video e inviare
    console.log("%sCalling external program: %s%sytd.py -t \"%s\" -n %s -m video", green, pythonCmd, storeDir, text, title);
    await client.sendText(chatId, emoji.get('mag') + strArr[3] + text + strArr[1]); //invio messaggio unknowledge
    await exec.execSync(pythonCmd + storeDir + 'ytd.py -t "' + text + '" -n ' + title + ' -m video'); //esegui python script
    client //invia file
        .sendFile(chatId, storeDir + title + ".mp4", text, emoji.get('white_check_mark') + strArr[4] + text)
        .then(() => {
            fs.unlinkSync(storeDir + title + ".mp4"); //delete non necessary media
        })
        .catch((erro) => {
            console.error(red);
            console.error("%sError sending video! (filename:%s.mp4)", red, title);
            sendErr(client, chatId);
        });
}
async function foto(client, text, chatId, title) { //funzione per generare foto e inviare
    var mode = "-";
    if (text.includes("NSFW")) {
        text.replace("NSFW", "");
        mode = "NSFW";
    }
    console.log("%sCalling external program: %s%sfoto.py -t \"%s\" -n %s -m %s", green, pythonCmd, storeDir, text, title, mode);
    await client.sendText(chatId, emoji.get('mag') + strArr[6] + text + strArr[7]); //invio messaggio unknowledge
    await exec.execSync(pythonCmd + storeDir + 'foto.py -t "' + text + '" -n ' + title + ' -m ' + mode); //esegui python script
    client //invia file
        .sendFile(chatId, storeDir + title + ".jpg", text, emoji.get('white_check_mark') + strArr[4] + text)
        .then(() => {
            fs.unlinkSync(storeDir + title + ".jpg"); //delete non necessary media
        })
        .catch((erro) => {
            console.error(red);
            console.error("%sError sending foto! (filename:%s.jpg)", red, title);
            sendErr(client, chatId);
        });
}
async function sticker(client, chatId, message, title) {
    const buffer = await client.decryptFile(message);
    const ext = "." + await mime.extension(message.mimetype);
    fs.writeFileSync(storeDir + title + ext, buffer, (err) => {
        console.log(red, "Error downloading media");
    });
    if (ext == ".gif") {
        client.sendImageAsStickerGif(chatId, storeDir + title + ext)
            .then((res) => {
                fs.unlinkSync(storeDir + title + ext);
            })
            .catch((erro) => {
                console.log(red, "Error sending sticker gif");
            });
    }
    if (ext == ".jpeg") {
        client.sendImageAsSticker(chatId, storeDir + title + ext)
            .then((res) => {
                fs.unlinkSync(storeDir + title + ext);
            })
            .catch((erro) => {
                console.log(red, "Error sending sticker");
            });
    }

}

