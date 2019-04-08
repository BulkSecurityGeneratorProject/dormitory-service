package gov.kstu.dormitory.service.repository;

import gov.kstu.dormitory.service.domain.DicRoom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DicRoom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DicRoomRepository extends JpaRepository<DicRoom, Long> {

}
