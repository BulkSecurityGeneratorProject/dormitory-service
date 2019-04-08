package gov.kstu.dormitory.service.repository;

import gov.kstu.dormitory.service.domain.DicStudentGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DicStudentGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DicStudentGroupRepository extends JpaRepository<DicStudentGroup, Long> {

}
