package gov.kstu.dormitory.service.repository;

import gov.kstu.dormitory.service.domain.JhiUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JhiUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JhiUserRepository extends JpaRepository<JhiUser, Long> {

}
