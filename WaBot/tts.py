import argparse
from gtts import gTTS
parser = argparse.ArgumentParser()
parser.add_argument("-c","--content",type=str)
parser.add_argument("-n","--name",type=str)
parser.add_argument("-l","--lang",type=str)
args = parser.parse_args()
tts = gTTS(text=args.content, lang=args.lang)
tts.save(args.name+".mp3")

