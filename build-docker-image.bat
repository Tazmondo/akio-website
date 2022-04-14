pipenv lock -r > requirements.txt

set BUILD_PATH=../flask_server/build
cd akio-website
call npm run build
cd ..

docker buildx build -t tazmondo/akio-website --platform linux/amd64,linux/arm64 --push .
docker pull tazmondo/akio-website
