package AS241S5_AEJ_40_be.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstagramTranscriptResponse {
    private boolean success;
    private String transcript;
    private String language;
    private List<String> segments;
    private String message;
}