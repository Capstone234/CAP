FROM npetrovsky/docker-android-sdk-ndk
WORKDIR /app
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install build-essential -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN npm install -g yarn
RUN apt-get install git -y
RUN apt-get install gradle -y
RUN npm install -g eas-cli
RUN touch startup.sh
ENV BULD_PROFILE "NOT SPECIFIED"
ENV EXPO_TOKEN "NOT SPECIFIED"
RUN echo '#!/bin/bash\necho "Starting build process ($BUILD_PROFILE): npm ci"\nnpm ci\neas build --platform android --profile $BUILD_PROFILE --non-interactive --local\nmv *.apk android.apk' > /startup.sh
RUN chmod +x /startup.sh
COPY . .
CMD ["bash", "-c", "/startup.sh"]
# requires the following ENV variables: EXPO_TOKEN and BUILD_PROFILE