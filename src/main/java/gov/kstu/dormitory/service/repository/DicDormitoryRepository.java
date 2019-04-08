package gov.kstu.dormitory.service.repository;

import gov.kstu.dormitory.service.domain.DicDormitory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DicDormitory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DicDormitoryRepository extends JpaRepository<DicDormitory, Long> {

}
