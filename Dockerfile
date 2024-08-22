FROM openjdk:17-jdk-alpine
EXPOSE 8080
ADD target/weighbridge-app.jar weighbridge-app.jar
ENTRYPOINT [ "java","-jar" ,"/weighbridge-app.jar"]


 
