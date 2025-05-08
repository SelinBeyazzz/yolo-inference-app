from flask import Flask, request, jsonify, render_template

import os
from ultralytics import YOLO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MODELS_DIR = 'models'
os.makedirs(MODELS_DIR, exist_ok=True)

user_models = {}

@app.route('/')
def index():
    return render_template('index.html') 

@app.route('/upload_model', methods=['POST'])
def upload_model():
    user_id = request.args.get('user_id')
    if 'model' not in request.files:
        return jsonify({'error': 'No model file provided'}), 400

    model_file = request.files['model']
    user_model_dir = os.path.join(MODELS_DIR, user_id)
    os.makedirs(user_model_dir, exist_ok=True) 
    model_path = os.path.join(user_model_dir, 'best.pt')
    model_file.save(model_path)

    model = YOLO(model_path)
    user_models[user_id] = model

    return jsonify({'message': f'Model uploaded for user {user_id}'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    user_id = request.args.get('user_id')
    if user_id not in user_models:
        return jsonify({'error': 'No model loaded for this user'}), 400

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    image_path = os.path.join(MODELS_DIR, user_id, 'input.jpg')
    image_file.save(image_path)

    model = user_models[user_id]
    results = model.predict(image_path)

    detections = []
    for box in results[0].boxes:
        cls = int(box.cls)
        conf = float(box.conf)
        xyxy = box.xyxy.tolist()[0]
        detections.append({
            'class': cls,
            'confidence': conf,
            'bbox': xyxy
        })

    return jsonify({'detections': detections})

if __name__ == '__main__':
    app.run(debug=True)
