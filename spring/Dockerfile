FROM maven:3.6.3-openjdk-17-slim

WORKDIR /app

COPY . .
RUN mvn clean install

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]