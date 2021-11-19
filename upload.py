import os
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--path', type=str, required=True)
args = parser.parse_args()
os.system('uplink cp '+ args.path +' sj://data')