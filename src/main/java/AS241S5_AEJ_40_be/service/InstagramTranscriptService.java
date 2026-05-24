package AS241S5_AEJ_40_be.service;

import AS241S5_AEJ_40_be.model.InstagramTranscriptRequest;
import AS241S5_AEJ_40_be.model.InstagramTranscriptResponse;
import AS241S5_AEJ_40_be.model.ApiCallLog;
import AS241S5_AEJ_40_be.repository.ApiCallLogRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class InstagramTranscriptService {

    private final WebClient webClient;
    private final ApiCallLogRepository logRepository;
    private final ObjectMapper objectMapper;

    @Value("${api.rapidapi.instagram-transcript.url}")
    private String instagramTranscriptUrl;

    @Value("${api.rapidapi.instagram-transcript.host}")
    private String instagramTranscriptHost;

    public Mono<InstagramTranscriptResponse> getTranscript(InstagramTranscriptRequest request) {
        log.info("Getting transcript for video URL: {}", request.getVideoUrl());

        String formData = "url=" + request.getVideoUrl();
        if (request.getLanguage() != null && !request.getLanguage().isEmpty()) {
            formData += "&language=" + request.getLanguage();
        }

        log.info("Calling RapidAPI URL: {}", instagramTranscriptUrl);

        return webClient.post()
                .uri(instagramTranscriptUrl)
                .header("x-rapidapi-host", instagramTranscriptHost)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> {
                    InstagramTranscriptResponse transcriptResponse = new InstagramTranscriptResponse();
                    transcriptResponse.setSuccess(true);
                    transcriptResponse.setMessage("Transcript retrieved successfully");

                    try {
                        JsonNode root = objectMapper.readTree(response);
                        if (root.has("response")) {
                            JsonNode responseNode = root.get("response");
                            if (responseNode.has("text")) {
                                transcriptResponse.setTranscript(responseNode.get("text").asText());
                            }
                            if (responseNode.has("language")) {
                                transcriptResponse.setLanguage(responseNode.get("language").asText());
                            }
                            if (responseNode.has("segments")) {
                                transcriptResponse.setSegments(
                                        objectMapper.convertValue(
                                                responseNode.get("segments"),
                                                new com.fasterxml.jackson.core.type.TypeReference<java.util.List<String>>() {}
                                        )
                                );
                            }
                        }
                    } catch (Exception e) {
                        log.error("Error parsing response: {}", e.getMessage());
                        transcriptResponse.setTranscript(response);
                    }

                    return transcriptResponse;
                })
                .doOnNext(response -> saveLog(request, response, "SUCCESS", null))
                .doOnError(error -> {
                    log.error("Error getting transcript: {}", error.getMessage());
                    saveLog(request, null, "ERROR", error.getMessage());
                });
    }

    private void saveLog(InstagramTranscriptRequest request, InstagramTranscriptResponse response,
                         String status, String errorMessage) {
        try {
            ApiCallLog log = new ApiCallLog();
            log.setApiName("Instagram Video Transcript");
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