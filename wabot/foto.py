#file to fetch pictures
import argparse
import subprocess
from google_images_search import GoogleImagesSearch
parser = argparse.ArgumentParser()
parser.add_argument("-m","--mode",type=str)
parser.add_argument("-t","--titolo",type=str)
parser.add_argument("-n","--name",type=str)
args = parser.parse_args()

gis = GoogleImagesSearch('API-KEY', 'SEARCH-ENGINE-ID')
_search_params = {
        'q': args.titolo,
        'num': 1,
        'safe': 'high',
        'fileType': 'jpg'
}

if args.mode == "NSFW":
    _search_params = {
        'q': args.titolo,
        'num': 1,
        'safe': 'off',
        'fileType': 'jpg'
    }
gis.search(search_params=_search_params, path_to_dir='.', custom_image_name=args.name)
