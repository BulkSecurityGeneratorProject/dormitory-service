package gov.kstu.dormitory.service.repository;

import gov.kstu.dormitory.service.domain.DicFaculty;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DicFaculty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DicFacultyRepository extends JpaRepository<DicFaculty, Long> {

}
