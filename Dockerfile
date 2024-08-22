#FROM openjdk:17-jdk-alpine
#EXPOSE 8080
#ADD target/weighbridge-app.jar weighbridge-app.jar
#ENTRYPOINT [ "java","-jar" ,"/weighbridge-app.jar"]


# Stage 1: Build the application
FROM openjdk:17-jdk-alpine as builder
WORKDIR /app
COPY target/weighbridge-app.jar .

# Stage 2: Create the final image
FROM openjdk:17-jdk-alpine
EXPOSE 8080
COPY --from=builder /app/weighbridge-app.jar weighbridge-app.jar
ENTRYPOINT [ "java","-jar","/weighbridge-app.jar" ]

