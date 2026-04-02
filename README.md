# AS241S5_AEJ_40-be

## Proyecto: Integración de APIs de Inteligencia Artificial con Spring WebFlux y MongoDB

Este proyecto implementa el consumo de dos APIs de Inteligencia Artificial a través de RapidAPI, utilizando Spring WebFlux para manejo reactivo y almacenamiento de datos en MongoDB Atlas (NoSQL).

Se realizan solicitudes a las APIs, se procesan las respuestas y se almacenan los resultados en la base de datos en la nube.

---

## 1. APIs de Inteligencia Artificial

### RapidAPI - Text to Image Generator
- Genera imágenes a partir de texto (prompt).
- Permite crear contenido visual automáticamente usando IA.
- Método: POST
- Respuesta: datos o URL de la imagen generada.

### RapidAPI - Instagram Video Transcript
- Transcribe el contenido de videos de Instagram.
- Convierte audio a texto automáticamente.
- Método: POST
- Respuesta: texto transcrito en formato JSON.

---

## 2. Tecnologías Utilizadas

- Java (JDK 17 / 19)
- Spring Boot
- Spring WebFlux
- MongoDB Atlas (NoSQL)
- Maven
- WebClient (para consumo de APIs)

---

## 3. Base de Datos

- MongoDB Atlas (Base de datos en la nube)
- Modelo orientado a documentos (JSON)
- Integración reactiva con Spring Data MongoDB

---

## 4. Dependencias

### Spring WebFlux + MongoDB

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId>
</dependency>

<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-test</artifactId>
    <scope>test</scope>
</dependency>
