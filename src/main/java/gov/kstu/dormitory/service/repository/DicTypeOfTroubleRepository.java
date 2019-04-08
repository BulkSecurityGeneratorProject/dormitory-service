package gov.kstu.dormitory.service.repository;

import gov.kstu.dormitory.service.domain.DicTypeOfTrouble;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DicTypeOfTrouble entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DicTypeOfTroubleRepository extends JpaRepository<DicTypeOfTrouble, Long> {

}
