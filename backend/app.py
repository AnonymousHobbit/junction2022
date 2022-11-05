from flask import Flask
import requests

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route('/find_places')
def find_places():
    # parametrit:
        # millasia sovelluksia etitään
        # miltä alueelta (eli tarpeeks läheltä lähettäjän nykyistä sijaintia)
    # lähetä pyyntö overpass apiin
    # palauttaa listan lähetyspaikkojen koordinaateista
    pass

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