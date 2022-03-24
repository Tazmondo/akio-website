FROM python:3.10

EXPOSE 8080

WORKDIR ./akio-website

COPY requirements.txt run_server.py ./
COPY flask_server ./flask_server

RUN pip install -r requirements.txt

CMD python run_server.py
