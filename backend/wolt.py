import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY=os.environ.get("API_KEY")
MERCHANT_ID=os.environ.get("MERCHANT_ID")

API_BEARER = "Bearer " + API_KEY

def get_price(data):
    headers = {"Content-Type": "application/json", "Authorization": "%s" % (API_BEARER)}
    #print(headers)
    url = f"https://daas-public-api.development.dev.woltapi.com/merchants/%s/delivery-fee" % (MERCHANT_ID)
    #print(url)
    req = requests.post(url, data=json.dumps(data), headers=headers)
    return req.json()



e = {
  "pickup": {
    "location": {
        "formatted_address": "Otakaari 1, 02150 Espoo"
    }
  },
  "dropoff": {
    "location": {
        "formatted_address": "Leppäsuonkatu 9, 00100 Helsinki"
    }
  }
}

get_price(e)



def create_pickup(data):
  pass