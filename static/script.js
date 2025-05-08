const userId = crypto.randomUUID();
let image = new Image();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function loadImage() {
    const file = document.getElementById('imageFile').files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        }
        image.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function uploadModel() {
    const file = document.getElementById('modelFile').files[0];
    const formData = new FormData();
    formData.append('model', file);

    fetch("http://127.0.0.1:5000/upload_model?user_id=" + userId, {
        method: 'POST',
        body: formData
    })

        .then(res => res.json())
        .then(data => alert(data.message))
        .catch(err => alert('Model upload failed.'));
}

function predictImage() {
    const file = document.getElementById('imageFile').files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch("http://127.0.0.1:5000/predict?user_id=" + userId, {
        method: 'POST',
        body: formData
    })

        .then(res => res.json())
        .then(data => {
            drawBoxes(data.detections);
            showResults(data.detections);
        })
        .catch(err => alert('Prediction failed.'));
}

function drawBoxes(detections) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 3;
    ctx.font = '18px Arial';
    ctx.fillStyle = 'lime';

    detections.forEach(det => {
        const [x1, y1, x2, y2] = det.bbox;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx.fillText(`Class ${det.class} (${(det.confidence * 100).toFixed(1)}%)`, x1, y1 - 5);
    });
}

function showResults(detections) {
    const list = document.getElementById('resultList');
    list.innerHTML = '';
    if (detections.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No objects detected.';
        li.classList.add('centered-text');
        list.appendChild(li);
    } else {
        detections.forEach((det, index) => {
            const li = document.createElement('li');
            li.innerHTML = `#${index + 1}:<br>
            Class: ${det.class}<br>
            Confidence: ${(det.confidence * 100).toFixed(1)}%`;
            list.appendChild(li);
        });
    }
}
