from flask import Flask
 
app = Flask(__name__)
 
@app.route('/')
def photos():
    return "Hello World!"

@app.route('/photos', methods=['POST'])
def findSpeices():
    # params = request.get_json()
    # imageURL = params["imageURL"]
    return "French_buldog"