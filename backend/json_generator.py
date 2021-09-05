# Parsing 封面统计 csv into JSON objects
# Created for Colby East Asian Studies
# Written by Ruize Li, Siyuan Peng
# Updated on July 19, 2021
# ----------------------------------------
# REQUIRED FORMAT:
# COL1          COL2 ...
# 期刊日期       attributes        
#
# ----------------------------------------
# attributes: 职业，性别，摄影师，etc
# ----------------------------------------
# Usage: 
#       1. place this file in the directory where all CSV files are located
#       2. run python3 json_generator.py in terminal
#       3. output file as result.json

# dependencies
import pandas as pd
import numpy as np
import json

file_name = '1950s  《人民画报》封面统计.xlsx'


# read excel
df = pd.read_excel(file_name)
df.rename(columns=dict(zip(list(df.columns), range(7))), inplace=True)

df = df.fillna('')

# prepare keywords
df[7] = df.apply(lambda row: row[1] + row[2] + row[3] + row[4] + row[5] + row[6], axis=1)

df[8] = df[0].str.replace('年第', '_').str.replace('期', '').str.replace('年', '_')

# generate json
result = dict()

for row in df.iterrows():
    date = row[1][8].split('_')
    if len(date) != 2:
        continue
    file_name = f'RMHB_{date[0]}_{date[1]}'
    keyword = row[1][7]
    result[file_name] = {'file_name': file_name,
                         'keyword': keyword,
                         'image_path': ''}



# output json files
with open('result.json', 'w') as file:
    file.write(json.dumps(result))

