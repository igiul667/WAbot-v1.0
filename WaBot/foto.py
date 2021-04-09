import argparse
import subprocess
from google_images_search import GoogleImagesSearch
parser = argparse.ArgumentParser()
parser.add_argument("-m","--mode",type=str)
parser.add_argument("-t","--titolo",type=str)
parser.add_argument("-n","--name",type=str)
args = parser.parse_args()
# you can provide API key and CX using arguments,
# or you can set environment variables: GCS_DEVELOPER_KEY, GCS_CX
gis = GoogleImagesSearch('AIzaSyChE6iAjlQC-zgEoPhrDQYAghlhX3icI74', '4e6dfa299c07caba5')
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
