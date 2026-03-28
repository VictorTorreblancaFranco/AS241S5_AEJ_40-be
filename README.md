# AS241S5_AEJ_40-be


## Proyecto: Integración de APIs de Inteligencia Artificial con Spring WebFlux y MongoDB

Este proyecto consume dos APIs de IA para generar respuestas a prompts y almacena los resultados en una base de datos NoSQL (MongoDB Atlas) usando Spring WebFlux.

---

## APIs de IA utilizadas

1. **HuggingFace API**
   - Características: Permite generar respuestas basadas en modelos de lenguaje pre-entrenados (ej. GPT-2).
   - URL base: `https://api-inference.huggingface.co`
   - Método utilizado: POST
   - Tipo de respuesta: JSON con el texto generado.

2. **Cohere API**
   - Características: Generación de texto con modelos avanzados, permite configurar prompt y tokens.
   - URL base: `https://api.cohere.ai/v1/generate`
   - Método utilizado: POST
   - Tipo de respuesta: JSON con el texto generado.

---

## Herramientas y versiones utilizadas

- **Java 26**
- **Spring Boot 3.5.13**
- **Spring WebFlux**
- **MongoDB Atlas** (NoSQL)
- **Maven**
- **WebClient de Spring** para consumir APIs externas.

---

## Configuración

Todas las credenciales están en `src/main/resources/application.yml`:

spring:
  application:
    name: aej

  data:
    mongodb:
      uri: mongodb+srv://victortorreblancafranco_db_user:0tyygRJ8YqeUeAZA@clusteraej.i9r23v7.mongodb.net/aej

huggingface:
  api-key: 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

cohere:
  api-key: erILH5HXL8C95jETpPPoGRlfnwbyM0L43tUpKzQc
