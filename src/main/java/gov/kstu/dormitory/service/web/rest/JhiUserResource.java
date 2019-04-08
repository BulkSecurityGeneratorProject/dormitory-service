package gov.kstu.dormitory.service.web.rest;
import gov.kstu.dormitory.service.domain.JhiUser;
import gov.kstu.dormitory.service.repository.JhiUserRepository;
import gov.kstu.dormitory.service.web.rest.errors.BadRequestAlertException;
import gov.kstu.dormitory.service.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JhiUser.
 */
@RestController
@RequestMapping("/api")
public class JhiUserResource {

    private final Logger log = LoggerFactory.getLogger(JhiUserResource.class);

    private static final String ENTITY_NAME = "jhiUser";

    private final JhiUserRepository jhiUserRepository;

    public JhiUserResource(JhiUserRepository jhiUserRepository) {
        this.jhiUserRepository = jhiUserRepository;
    }

    /**
     * POST  /jhi-users : Create a new jhiUser.
     *
     * @param jhiUser the jhiUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jhiUser, or with status 400 (Bad Request) if the jhiUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jhi-users")
    public ResponseEntity<JhiUser> createJhiUser(@RequestBody JhiUser jhiUser) throws URISyntaxException {
        log.debug("REST request to save JhiUser : {}", jhiUser);
        if (jhiUser.getId() != null) {
            throw new BadRequestAlertException("A new jhiUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JhiUser result = jhiUserRepository.save(jhiUser);
        return ResponseEntity.created(new URI("/api/jhi-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jhi-users : Updates an existing jhiUser.
     *
     * @param jhiUser the jhiUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jhiUser,
     * or with status 400 (Bad Request) if the jhiUser is not valid,
     * or with status 500 (Internal Server Error) if the jhiUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jhi-users")
    public ResponseEntity<JhiUser> updateJhiUser(@RequestBody JhiUser jhiUser) throws URISyntaxException {
        log.debug("REST request to update JhiUser : {}", jhiUser);
        if (jhiUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JhiUser result = jhiUserRepository.save(jhiUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jhiUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jhi-users : get all the jhiUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jhiUsers in body
     */
    @GetMapping("/jhi-users")
    public List<JhiUser> getAllJhiUsers() {
        log.debug("REST request to get all JhiUsers");
        return jhiUserRepository.findAll();
    }

    /**
     * GET  /jhi-users/:id : get the "id" jhiUser.
     *
     * @param id the id of the jhiUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jhiUser, or with status 404 (Not Found)
     */
    @GetMapping("/jhi-users/{id}")
    public ResponseEntity<JhiUser> getJhiUser(@PathVariable Long id) {
        log.debug("REST request to get JhiUser : {}", id);
        Optional<JhiUser> jhiUser = jhiUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jhiUser);
    }

    /**
     * DELETE  /jhi-users/:id : delete the "id" jhiUser.
     *
     * @param id the id of the jhiUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jhi-users/{id}")
    public ResponseEntity<Void> deleteJhiUser(@PathVariable Long id) {
        log.debug("REST request to delete JhiUser : {}", id);
        jhiUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
