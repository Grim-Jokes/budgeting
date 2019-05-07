FROM node:12

RUN useradd --create-home apiuser
ADD . /home/apiuser/api
RUN chown apiuser /home/apiuser -R
USER apiuser

WORKDIR /home/apiuser/api
RUN npm install
RUN npm run build

CMD ["npm", "start"]