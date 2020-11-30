FROM node:12

RUN apt-get update && apt-get -y install postgresql-client

RUN useradd --create-home apiuser
ADD ./api /home/apiuser/api
RUN chmod +x /home/apiuser/api/wait-for-db.sh
ADD ./httpTypes ./home/apiuser/httpTypes
RUN chown apiuser /home/apiuser -R
USER apiuser


WORKDIR /home/apiuser/api
RUN npm install
RUN npm run build

CMD ["npm", "run", "start:dev"]