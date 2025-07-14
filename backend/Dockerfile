FROM maven:3.8.6-openjdk-18-slim
WORKDIR /app
COPY . /app
RUN mvn -f /app/pom.xml clean package

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
ENV SPRING_PROFILES_ACTIVE=default
ENTRYPOINT ["java", "-jar", "app.jar"]
