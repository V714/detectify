FROM python:3.10-slim

WORKDIR /app
RUN apt-get update && apt-get install -y gcc g++ libglib2.0-0 ffmpeg libsm6 libxext6 curl git
RUN git clone https://github.com/ultralytics/ultralytics.git
RUN rm ultralytics/README.md ultralytics/requirements.txt
RUN mv ultralytics yolov8
RUN mv yolov8/* .

COPY . .

RUN mkdir models
RUN curl -o /app/models https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8x.pt
RUN pip install numpy
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu


RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "server.py"]