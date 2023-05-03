from flask import Flask, request, jsonify, make_response
from ultralytics import YOLO
import cv2
import numpy as np
import urllib
from PIL import Image
import shutil
import os

app = Flask(__name__)
imgs_url = './imgs'
project = 'detectified'
name = 'prediction'
predicted_file_name_part = "_pred"

model = YOLO("models/yolov8x.pt")


def get_img_from_url(url):
    req = urllib.request.urlopen(imgs_url + url)
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    return cv2.imdecode(arr, -1)


def get_img_from_path(path):
    return cv2.imread(path)


def save_webp(from_path, save_path):
    with Image.open(from_path) as im:
        im.save(save_path, 'webp', quality=80)


def get_image_predictions(image, uuid):
    result = model.predict(image, save=True, save_txt=True, project=project, name=name)[0]
    image_path = f"{project}/{name}/{result.path}"
    original_img_path = f"{imgs_url}/{uuid}.webp"
    save_path = f"{imgs_url}/{uuid}{predicted_file_name_part}.webp"

    predictions = [{'label': result.names[result.boxes.cls[x].item()], 'score': result.boxes.conf[x].item()}
                   for x in range(len(result.boxes.cls))]
    summary = {}

    for pred in predictions:
        summary[pred['label']] = summary[pred['label']] + 1 if pred['label'] in summary else 1

    save_webp(image_path, save_path)

    return {"path": save_path, "org_path": original_img_path, "results": predictions, "counts": summary}


@app.route('/predict', methods=['POST'])
def predict():
    image_url = request.json.get('image_url')
    uuid = request.json.get('uuid')
    img = get_img_from_path(image_url)
    result = get_image_predictions(img, uuid)

    response = make_response(jsonify(result))

    response.close()
    return response


if __name__ == '__main__':
    if (os.path.isdir(f'{project}/{name}')):
        shutil.rmtree(f'{project}/{name}')
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
