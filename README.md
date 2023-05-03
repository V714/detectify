# Detectify
Fullstack App for detecting objects on pictures (based on YOLOv8)

simply run:
***docker-compose up --build***

or use ***-d*** flag to run in background

it should run on http://localhost:4203/



## To run separately:

#### Requirements:


(versions on which the project is guaranteed to work)

docker: 23.0.5

npm: 8.11.0, node: v16.15.1, ng: 15.2.7

mvn: 3.6.3, java-19-openjdk

python: 3.10



#### Settings:

you have to change **imgs** path to parent directory in those files (just add one more dot at the beginning of path): 

***./pytorch/server.py:11***, 

***./spring/src/main/resources/application.properties:8*** 



Set your postgresql database and AI API address in ***./spring/src/main/resources/application.properties*** 
(if running outside the docker it should be: **spring.datasource.url=jdbc:postgresql://localhost:5432/postgres** and **detectify.constant.ai.api.predict=http://localhost:5000/predict**)

## Run:

Frontend: go to **./angular** directory and run ***npm install -g @angular/cli@15.2.7; npm install; ng serve***

Backend: go to **./spring** and use ***mvn clean install; mvn spring-boot run***

AI API: (using separated environment is recommended but not necessary) install modules ***pip install -r requirements.txt***, clone files from repo https://github.com/ultralytics/ultralytics.git into **./pytorch**, create **./pytorch/models** directory and put this (https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8x.pt) file inside, start server in **./pytorch** by ***python server.py*** command

Database: download **postgres** docker image and run ***docker run --name detectify-postgres -e POSTGRES_PASSWORD=sect3rP@ss -d -p 5432:5432 postgres***
