import argparse
from youtubesearchpython import VideosSearch
from pytube import YouTube
from pydub import AudioSegment

parser = argparse.ArgumentParser()
parser.add_argument("-t","--titolo",type=str)
parser.add_argument("-m","--mode",type=str)
parser.add_argument("-n","--name",type=str)
args = parser.parse_args()

if "https://" in args.titolo:
    try:
        ytObj = YouTube(args.titolo.replace(" ",""))
    except:
       print("error general")
else:
    try:
        videosSearch = VideosSearch(args.titolo, limit = 1)
        ytObj = YouTube(videosSearch.result().get("result")[0]["link"])
    except:
        print("error searching video")
try:
    if args.mode == "video":
        ytObj.streams.filter(progressive=True, file_extension="mp4").get_highest_resolution().download(filename=args.name)
    else:
        ytObj.streams.filter(only_audio=True).first().download(filename=args.name)
        AudioSegment.from_file(args.name+".mp4", "mp4").export(args.name+".mp3",format="mp3")
except:
    print("error downloading")
