package AS241S5_AEJ_40_be.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "api_call_logs")
public class ApiCallLog {
    @Id
    private String id;
    private String apiName;
    private String requestData;
    private String responseData;
    private LocalDateTime callTime;
    private String status;
    private String errorMessage;
}