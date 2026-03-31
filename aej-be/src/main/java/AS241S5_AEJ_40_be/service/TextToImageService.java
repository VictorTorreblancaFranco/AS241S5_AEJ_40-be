package AS241S5_AEJ_40_be.service;

import AS241S5_AEJ_40_be.model.TextToImageRequest;
import AS241S5_AEJ_40_be.model.TextToImageResponse;
import AS241S5_AEJ_40_be.model.ApiCallLog;
import AS241S5_AEJ_40_be.repository.ApiCallLogRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TextToImageService {

    private final WebClient webClient;
    private final ApiCallLogRepository logRepository;
    private final ObjectMapper objectMapper;

    @Value("${api.rapidapi.text-to-image.url}")
    private String textToImageUrl;

    @Value("${api.rapidapi.text-to-image.host}")
    private String textToImageHost;

    public Mono<TextToImageResponse> generateImage(TextToImageRequest request) {
        log.info("Generating image with prompt: {}", request.getPrompt());

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("prompt", request.getPrompt());

        if (request.getStyleId() != null) {
            requestBody.put("style_id", request.getStyleId());
        }
        if (request.getSize() != null && !request.getSize().isEmpty()) {
            requestBody.put("size", request.getSize());
        }

        log.info("Calling RapidAPI URL: {}", textToImageUrl);

        return webClient.post()
                .uri(textToImageUrl)
                .header("x-rapidapi-host", textToImageHost)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    TextToImageResponse imageResponse = new TextToImageResponse();
                    imageResponse.setSuccess(true);
                    imageResponse.setMessage("Image generated successfully");
                    imageResponse.setCode(200);

                    List<String> imageUrls = new ArrayList<>();
                    if (response.containsKey("final_result")) {
                        List<Map<String, Object>> finalResult = (List<Map<String, Object>>) response.get("final_result");
                        for (Map<String, Object> item : finalResult) {
                            String imageUrl = (String) item.get("origin");
                            if (imageUrl != null && !imageUrl.isEmpty()) {
                                imageUrls.add(imageUrl);
                            }
                        }
                    }
                    imageResponse.setImages(imageUrls);
                    imageResponse.setRequestId(String.valueOf(System.currentTimeMillis()));

                    log.info("Image generated successfully, found {} images", imageUrls.size());
                    return imageResponse;
                })
                .doOnNext(response -> saveLog(request, response, "SUCCESS", null))
                .doOnError(error -> {
                    log.error("Error generating image: {}", error.getMessage());
                    saveLog(request, null, "ERROR", error.getMessage());
                });
    }

    private void saveLog(TextToImageRequest request, TextToImageResponse response,
                         String status, String errorMessage) {
        try {
            ApiCallLog log = new ApiCallLog();
            log.setApiName("Text to Image Generator");
            log.setRequestData(objectMapper.writeValueAsString(request));
            log.setResponseData(response != null ? objectMapper.writeValueAsString(response) : "");
            log.setCallTime(LocalDateTime.now());
            log.setStatus(status);
            log.setErrorMessage(errorMessage);

            logRepository.save(log).subscribe();
        } catch (Exception e) {
            log.error("Error saving log: {}", e.getMessage());
        }
    }
}