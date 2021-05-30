#fetch video and audio from youtube
import argparse
import youtube_dl
from youtubesearchpython import VideosSearch

parser = argparse.ArgumentParser()
parser.add_argument("-t","--titolo",type=str)
parser.add_argument("-m","--mode",type=str)
parser.add_argument("-n","--name",type=str)
args = parser.parse_args()

if "https://" in args.titolo:
    try:
        link = args.titolo
    except:
        print("error general")
else:
    try:
        videosSearch = VideosSearch(args.titolo, limit = 1)
        link = videosSearch.result().get("result")[0]["link"]
    except:
        print("error searching video")
if args.mode == "video":
    ydl_opts = {
         'format': 'best[filesize<64M][ext=mp4]',
         'outtmpl': args.name+'.%(ext)s',
     }
else:
     ydl_opts = {
         'format': 'best[filesize<64M]',
         'outtmpl': args.name+'.%(ext)s',
         'postprocessors': [{
             'key': 'FFmpegExtractAudio',
             'preferredcodec': 'mp3',
             'preferredquality': '320',
         }],
     }

with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download([link])

