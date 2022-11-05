from flask import Flask, request
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

import wolt


@app.route('/find_address', methods = ['GET', 'POST'])
def find_address():
    if request.method == 'POST':
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
            'house_number': '2',
            'postcode': '00100',
            'city': 'Helsinki'
        }
        address_dict = {'address': address}
        test_address_dict = {'address': test_address}
        price = wolt.get_delivery_price(address_dict, test_address_dict)[0]
        time = wolt.get_delivery_price(address_dict, test_address_dict)[1]
        return [price, time]

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


@app.route('/show_map')
def show_map():
    # paramretrit:
        # lista koordinaateista mitä näytetään
    # näistä togglet kartalle
    # jotenkin pitää hoitaa togglen klikkaaminen
        # lähettää api pyynnön woltille josta saadaan hinta nykysestä pisteestä tähän pisteeseen
        # näyttää hinnan kartalla
    # toinen event lähetyskohteen valitsemiselle
    # sulkee pop up ikkunan ja valitsee tämän lähetyskohteen koordinaatit lomakkeeksi
    start_coords = (60.19, 24.94)
    folium_map = folium.Map(location=start_coords, zoom_start=14)
    return folium_map._repr_html_()


if __name__ == "__main__":
    app.run(debug=True)