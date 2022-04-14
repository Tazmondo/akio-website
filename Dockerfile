FROM python:3.10.4-slim-bullseye

EXPOSE 8080

WORKDIR /home/akio-website

COPY requirements.txt run_server.py ./
RUN pip install -r requirements.txt
COPY flask_server ./flask_server

CMD ["python", "run_server.py"]
