FROM diko316/alnode-firefox:firefox-v1.4

EXPOSE 8000

COPY . $PROJECT_ROOT

RUN npm install -d -y


