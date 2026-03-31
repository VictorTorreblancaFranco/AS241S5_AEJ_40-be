package AS241S5_AEJ_40_be.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TextToImageRequest {
    private String prompt;
    private Integer styleId;
    private String size;
    private String negativePrompt;
    private Integer numImages;
}