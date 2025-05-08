# 🧠 YOLO Inference Web App

Bu proje, kullanıcıların tarayıcı üzerinden kendi YOLOv8 modellerini yükleyerek görüntü üzerinde nesne tespiti yapmasını sağlayan bir Flask tabanlı web uygulamasıdır.

---

  Özellikler

- Model Yükleme (YOLOv8 `.pt` formatında)
- Görsel Yükleyerek Anında Tahmin
- Kullanıcıya özel inference işlemi
- Tarayıcıda görsel ve sonuç gösterimi (Canvas + Liste)
- Kullanıcı bazlı model izolasyonu

---

  NASIL KULLANILIR
  
-GitHub’dan projeyi bilgisayarınıza indirin veya klonlayın.

-Python ortamı oluşturup bağımlılıkları yükleyin.

-Flask uygulamasını çalıştırın.

-Web arayüzü üzerinden model ve görsel yükleyerek tahmin alın.

  KURULUM ADIMLARI

-Proje klasörüne gidin:
cd yolo-inference-app

-Gerekli kütüphaneleri yükleyin:
pip install -r requirements.txt

-Uygulamayı başlatın:
python app.py

-Tarayıcınızda şu adresi açın:
http://127.0.0.1:5000

   DOSYA YAPISI

-app.py → Flask sunucu uygulaması

-templates/index.html → Ana HTML dosyası

-static/style.css → Stil dosyası

-static/script.js → Görüntü yükleme ve tahmin işlemleri

-models/ → Kullanıcıların yüklediği modellerin tutulduğu dizin

-requirements.txt → Proje bağımlılıkları

-yolov8n.pt → Örnek model (varsa)

   TEKNOLOJİLER
   
-Python 3

-Flask

-JavaScript

-HTML / CSS

-Ultralytics YOLOv8
