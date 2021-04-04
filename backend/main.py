from SimConnect import *
import flask
import json
from flask_cors import CORS
sm = SimConnect()
aq = AircraftRequests(sm, _time=2000)

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/', methods=['GET'])
def api():
    LAT = aq.get("GPS_POSITION_LAT")
    LON = aq.get("GPS_POSITION_LON")
    data = {
        "lat": aq.get("GPS_POSITION_LAT"),
        "lon":  aq.get("GPS_POSITION_LON"),
        "direction": aq.get("GPS_GROUND_TRUE_HEADING"),
        "alt":aq.get("GPS_POSITION_ALT")
    }   

    return json.dumps(data)
app.run()