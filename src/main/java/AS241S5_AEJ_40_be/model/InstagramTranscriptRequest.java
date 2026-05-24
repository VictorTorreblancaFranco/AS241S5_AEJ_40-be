package AS241S5_AEJ_40_be.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstagramTranscriptRequest {
    private String videoUrl;
    private String language;
}