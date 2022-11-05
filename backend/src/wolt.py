import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY=os.environ.get("API_KEY")
MERCHANT_ID=os.environ.get("MERCHANT_ID")

API_BEARER = "Bearer " + API_KEY

def get_price(delivery_price_json):
    headers = {"Content-Type": "application/json", "Authorization": "{API_BEARER}".format(API_BEARER=API_BEARER)}
    url = "https://daas-public-api.development.dev.woltapi.com/merchants/{MERCHANT_ID}/delivery-fee".format(MERCHANT_ID=MERCHANT_ID)
    req = requests.post(url, data=json.dumps(delivery_price_json), headers=headers)
    reqinfo = req.json()
    return reqinfo

def get_delivery(delivery_order_json):
    headers = {"Content-Type": "application/json", "Authorization": "{API_BEARER}".format(API_BEARER=API_BEARER)}
    url = "https://daas-public-api.development.dev.woltapi.com/merchants/{MERCHANT_ID}/delivery-order".format(MERCHANT_ID=MERCHANT_ID)
    req = requests.post(url, data=json.dumps(delivery_order_json), headers=headers)
    reqinfo = req.json()
    return reqinfo


def write_delivery_price_json(map_data, form_data):
  """This funktion builds json that will be used for API to get delivery price
    
    Args: data from user form

    Return: json formatted delivery price request
  
  """
  # Create variables from map data to be used for pickup address
  roadName = map_data["address"]["road"]
  houseNumber = map_data["address"]["house number"]
  cityName = map_data["address"]["city"]
  postalCode = map_data["address"]["postcode"]  
  pickupAddress = roadName + " " + houseNumber + ", " + postalCode + " " + cityName

  # Create variables from form data to be used for dropoff address
  roadName = form_data["address"]["road"]
  houseNumber = form_data["address"]["house number"]
  cityName = form_data["address"]["city"]
  postalCode = form_data["address"]["postcode"]
  dropoffAddress = roadName + " " + houseNumber + ", " + postalCode + " " + cityName

  # Create json for delivery price request
  delivery_price_json = {
    "pickup": {
      "location": {
          "formatted_address": pickupAddress
      }
    },
    "dropoff": {
      "location": {
          "formatted_address": dropoffAddress
      }
    }
  }
  return delivery_price_json

def write_delivery_order_json(map_data, form_data):
  """This funktion builds json that will be used for API to create delivery order
    
    Args: data from user form

    Return: json formatted delivery price request
  
  """
  # Create variables from map data to be used for pickup address
  roadName = map_data["address"]["road"]
  houseNumber = map_data["address"]["house number"]
  cityName = map_data["address"]["city"]
  postalCode = map_data["address"]["postcode"]  
  pickupAddress = roadName + " " + houseNumber + ", " + postalCode + " " + cityName

  # Create variables from form data to be used for dropoff address
  roadName = form_data["address"]["road"]
  houseNumber = form_data["address"]["house number"]
  cityName = form_data["address"]["city"]
  postalCode = form_data["address"]["postcode"]
  dropoffAddress = roadName + " " + houseNumber + ", " + postalCode + " " + cityName

  # Create variables from form data to be used for item info
  itemDescription = form_data["items"]["description"]
  itemCount = form_data["items"]["count"]

  # Create variables from form data to be used for sender info
  pickupContactName = "string"
  
  # Create variables from form data to be used for receiver info
  dropoffContanctName = "string"

  delivery_order_json ={
    "pickup": {
      "location": {
          "formatted_address": pickupAddress
      },
      "comment": "The box is in front of the door",
      "contact_details": {
        "name": pickupContactName,
        "phone_number": "+358123456789",
        "send_tracking_link_sms": False
      }
    },
    "dropoff": {
      "location": {
        "formatted_address": dropoffAddress
      },
      "contact_details": {
        "name": dropoffContanctName,
        "phone_number": "+358123456789",
        "send_tracking_link_sms": False
      },
      "comment": "Leave at the door, please"
    },
    "customer_support": {
      "email": ":)",
      "phone_number": ":)",
      "url": ":)"
    },
    "merchant_order_reference_id": None,
    "is_no_contact": True,
    "contents": [
      {
        "count": itemCount,
        "description": itemDescription,
        "identifier": "12345",
        "tags": []
      }
    ],
    "tips": [],
    "min_preparation_time_minutes": 0,
    "scheduled_dropoff_time": None
  }

  return delivery_order_json

def get_delivery_price(map_data, form_data):
  """This funktion gets delivery price from API
    
    Args: data from user form

    Return: delivery price, esiimated delivery time
  
  """
  # Create json for delivery price request
  delivery_price_json = write_delivery_price_json(map_data, form_data)

  # Get delivery price from API
  delivery_price_json = get_price(delivery_price_json)

  # Get delivery price and estimated delivery time from API response
  delivery_price = delivery_price_json["fee"]["amount"]
  delivery_time = delivery_price_json["time_estimate_minutes"]
  return [delivery_price, delivery_time]

def get_delivery_order(map_data, form_data):
  """This funktion creates delivery order from API
    
    Args: data from user form

    Return: delivery order API link
  
  """
  delivery_order_json = write_delivery_order_json(map_data, form_data)
  delivery_order = get_delivery(delivery_order_json)
  delivery_order_link = delivery_order["tracking"]["url"]
  return delivery_order_link

