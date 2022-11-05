import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY=os.environ.get("API_KEY")
MERCHANT_ID=os.environ.get("MERCHANT_ID")

API_BEARER = "Bearer " + API_KEY

def get_price(e):
    headers = {"Content-Type": "application/json", "Authorization": "{API_BEARER}".format(API_BEARER=API_BEARER)}
    #print(headers)
    url = "https://daas-public-api.development.dev.woltapi.com/merchants/{MERCHANT_ID}/delivery-fee".format(MERCHANT_ID=MERCHANT_ID)
    #print(url)
    req = requests.post(url, data=json.dumps(e), headers=headers)
    print(req.json())



e = {
  "pickup": {
    "location": {
        "formatted_address": "Otakaari 1, 02150 Espoo"
    }
  },
  "dropoff": {
    "location": {
        "formatted_address": "Otakaari 24, 02150 Espoo"
    }
  }
}

get_price(e)