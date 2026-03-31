package AS241S5_AEJ_40_be.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TextToImageResponse {
    private boolean success;
    private List<String> images;
    private String message;
    private String requestId;
    private Integer code;
}