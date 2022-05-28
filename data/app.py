from flask import Flask, jsonify, request
import cv2
import tensorflow as tf
import keras
import numpy as np
import requests

from labels.dog_label import dog_label

app = Flask(__name__)

MODEL_PATH = "./models/loaded_2.h5"

app.run(host='0.0.0.0', port=5000)


def load_model():
    loaded_model = keras.models.load_model(MODEL_PATH)
    return loaded_model


def preprocess_image(image_path):
    image_nparray = np.asarray(
        bytearray(requests.get(image_path).content), dtype=np.uint8)
    image = cv2.imdecode(image_nparray, cv2.IMREAD_COLOR)
    # img = cv2.imread(image)
    img = cv2.resize(image, dsize=(224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img


@app.route('/')
def photos():
    return "Hello World!"


@app.route('/photos', methods=['POST'])
def findSpeices():
    params = request.get_json()
    imageURL = params["imageURL"]

    # image_path = request.files['image'].read()
    # image_path = "./test_img/mal.jpg"
    # image_path = "./test_img/Silky-Terrier.jpg"
    # image_path = "./test_img/toy_poddle.jpg"

    loaded_model = load_model()

    img = preprocess_image(imageURL)

    predictions = loaded_model.predict(img)
    score = tf.nn.softmax(predictions[0])
    temp = np.argmax(score)
    breed = dog_label[temp]
    return breed
