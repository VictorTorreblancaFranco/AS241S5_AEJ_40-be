package AS241S5_AEJ_40_be.repository;

import AS241S5_AEJ_40_be.model.ApiCallLog;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ApiCallLogRepository extends ReactiveMongoRepository<ApiCallLog, String> {
    Flux<ApiCallLog> findByApiName(String apiName);
}