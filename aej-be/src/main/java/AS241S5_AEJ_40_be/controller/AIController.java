package AS241S5_AEJ_40_be.controller;

import AS241S5_AEJ_40_be.dto.ApiResponse;
import AS241S5_AEJ_40_be.model.TextToImageRequest;
import AS241S5_AEJ_40_be.model.TextToImageResponse;
import AS241S5_AEJ_40_be.model.InstagramTranscriptRequest;
import AS241S5_AEJ_40_be.model.InstagramTranscriptResponse;
import AS241S5_AEJ_40_be.repository.ApiCallLogRepository;
import AS241S5_AEJ_40_be.service.TextToImageService;
import AS241S5_AEJ_40_be.service.InstagramTranscriptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AIController {

    private final TextToImageService textToImageService;
    private final InstagramTranscriptService instagramTranscriptService;
    private final ApiCallLogRepository logRepository;

    @PostMapping("/generate-image")
    public Mono<ResponseEntity<ApiResponse<TextToImageResponse>>> generateImage(
            @RequestBody TextToImageRequest request) {
        log.info("Received request to generate image with prompt: {}", request.getPrompt());

        return textToImageService.generateImage(request)
                .map(response -> ResponseEntity.ok(
                        ApiResponse.<TextToImageResponse>builder()
                                .success(true)
                                .message("Image generated successfully")
                                .data(response)
                                .timestamp(System.currentTimeMillis())
                                .build()
                ))
                .onErrorResume(error -> {
                    log.error("Error in generateImage endpoint: {}", error.getMessage());
                    return Mono.just(ResponseEntity
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(ApiResponse.<TextToImageResponse>builder()
                                    .success(false)
                                    .message("Failed to generate image")
                                    .error(error.getMessage())
                                    .timestamp(System.currentTimeMillis())
                                    .build()));
                });
    }

    @PostMapping("/instagram-transcript")
    public Mono<ResponseEntity<ApiResponse<InstagramTranscriptResponse>>> getInstagramTranscript(
            @RequestBody InstagramTranscriptRequest request) {
        log.info("Received request to get transcript for video: {}", request.getVideoUrl());

        return instagramTranscriptService.getTranscript(request)
                .map(response -> ResponseEntity.ok(
                        ApiResponse.<InstagramTranscriptResponse>builder()
                                .success(true)
                                .message("Transcript retrieved successfully")
                                .data(response)
                                .timestamp(System.currentTimeMillis())
                                .build()
                ))
                .onErrorResume(error -> {
                    log.error("Error in instagramTranscript endpoint: {}", error.getMessage());
                    return Mono.just(ResponseEntity
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(ApiResponse.<InstagramTranscriptResponse>builder()
                                    .success(false)
                                    .message("Failed to get transcript")
                                    .error(error.getMessage())
                                    .timestamp(System.currentTimeMillis())
                                    .build()));
                });
    }

    @GetMapping("/logs")
    public Mono<ResponseEntity<ApiResponse<Object>>> getAllLogs() {
        return logRepository.findAll()
                .collectList()
                .map(logs -> ResponseEntity.ok(
                        ApiResponse.builder()
                                .success(true)
                                .message("Logs retrieved successfully")
                                .data(logs)
                                .timestamp(System.currentTimeMillis())
                                .build()
                ));
    }

    @GetMapping("/logs/{apiName}")
    public Mono<ResponseEntity<ApiResponse<Object>>> getLogsByApiName(@PathVariable String apiName) {
        return logRepository.findByApiName(apiName)
                .collectList()
                .map(logs -> ResponseEntity.ok(
                        ApiResponse.builder()
                                .success(true)
                                .message("Logs retrieved successfully for API: " + apiName)
                                .data(logs)
                                .timestamp(System.currentTimeMillis())
                                .build()
                ));
    }
}
// Agregar @CrossOrigin antes de @RestController
