pipenv lock -r > requirements.txt

set BUILD_PATH=../flask_server/build
cd akio-website
call npm run build
cd ..

docker image build -t akio-website .
