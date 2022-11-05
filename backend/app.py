from flask import Flask, request
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

import wolt

@app.route("/send_order", methods=["POST"])
def send_order():
    data = request.get_json()
    print(data)
    return wolt.get_delivery_order(data)

@app.route('/find_address', methods = ['GET', 'POST'])
def find_address():
    if request.method == 'POST':
        info = request.json['info']
        print(info)
        latlng = request.json["latlng"]
        lat = latlng['lat']
        lon = latlng['lng']
        print(latlng)
        print('find address called')
        # find the address with the given lat lon
        url = f'https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json'
        req = requests.get(url)
        address = req.json()['address']
        #print(address)
        test_address = {
            'road': 'jeeroad',
            'housenumber': 2,
            'postcode': '00100',
            'city': 'Helsinki'
        }
        address_dict = {'address': address}
        test_address_dict = {'address': test_address}
        price = wolt.get_delivery_price(address_dict, test_address_dict)
        print(price)    
        return price

@app.route('/find_places', methods = ['GET', 'POST'])
def find_places():
    print('find places')
    #start_location = request.form['start_location']
    #dropoff = request.form['dropoff']
    city = 'helsinki'
    url = f'https://nominatim.openstreetmap.org/search?q=library+in+{city}&format=json'
    #print(headers)
    #print(url)
    req = requests.get(url)

    #print(req.json())
    places = {}

    for value in req.json():
        #print(value)
        #print(type(value))
 #       name = value['display_name'].encode()
  #      print(name.decode('unicode-escape'))
        #print(value['display_name'])
        places[value['display_name']] = [value['lat'], value['lon']]

    #print(places)
    return places


if __name__ == "__main__":
    app.run(debug=True)