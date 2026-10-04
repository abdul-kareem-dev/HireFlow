FROM eclipse-temurin:27-jdk

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE 10000

CMD ["sh", "-c", "java -jar target/HireFlow-0.0.1-SNAPSHOT.jar"]