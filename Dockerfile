FROM node:4.2.2

# Install Java/Google CC
RUN apt-get update; apt-get install -y default-jre wget unzip 
RUN mkdir -p /tmp /usr/ /usr/local /usr/local/lib /usr/local/lib/ /usr/local/lib 
RUN mkdir -p /usr/local/lib/closure-compiler /usr/local/lib/closure-compiler/build
RUN cd /tmp; wget http://dl.google.com/closure-compiler/compiler-latest.zip; unzip ./compiler-latest.zip;
RUN mv /tmp/compiler.jar /usr/local/lib/closure-compiler/build/

RUN mkdir /opt/app
COPY ./ /opt/app/

RUN cd /opt/app; npm install; 
# fix node-sass issue
#RUN /opt/app/node_modules/gulp-sass/node_modules/node-sass/scripts/build.js;
#
# build
RUN cd /opt/app; npm rebuild node-sass; npm run build;

EXPOSE 3000
CMD ["node", "/opt/app/index.js"]
