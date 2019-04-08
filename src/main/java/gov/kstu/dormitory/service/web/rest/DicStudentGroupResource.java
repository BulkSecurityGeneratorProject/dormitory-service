package gov.kstu.dormitory.service.web.rest;
import gov.kstu.dormitory.service.domain.DicStudentGroup;
import gov.kstu.dormitory.service.repository.DicStudentGroupRepository;
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
 * REST controller for managing DicStudentGroup.
 */
@RestController
@RequestMapping("/api")
public class DicStudentGroupResource {

    private final Logger log = LoggerFactory.getLogger(DicStudentGroupResource.class);

    private static final String ENTITY_NAME = "dicStudentGroup";

    private final DicStudentGroupRepository dicStudentGroupRepository;

    public DicStudentGroupResource(DicStudentGroupRepository dicStudentGroupRepository) {
        this.dicStudentGroupRepository = dicStudentGroupRepository;
    }

    /**
     * POST  /dic-student-groups : Create a new dicStudentGroup.
     *
     * @param dicStudentGroup the dicStudentGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dicStudentGroup, or with status 400 (Bad Request) if the dicStudentGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dic-student-groups")
    public ResponseEntity<DicStudentGroup> createDicStudentGroup(@RequestBody DicStudentGroup dicStudentGroup) throws URISyntaxException {
        log.debug("REST request to save DicStudentGroup : {}", dicStudentGroup);
        if (dicStudentGroup.getId() != null) {
            throw new BadRequestAlertException("A new dicStudentGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DicStudentGroup result = dicStudentGroupRepository.save(dicStudentGroup);
        return ResponseEntity.created(new URI("/api/dic-student-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dic-student-groups : Updates an existing dicStudentGroup.
     *
     * @param dicStudentGroup the dicStudentGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dicStudentGroup,
     * or with status 400 (Bad Request) if the dicStudentGroup is not valid,
     * or with status 500 (Internal Server Error) if the dicStudentGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dic-student-groups")
    public ResponseEntity<DicStudentGroup> updateDicStudentGroup(@RequestBody DicStudentGroup dicStudentGroup) throws URISyntaxException {
        log.debug("REST request to update DicStudentGroup : {}", dicStudentGroup);
        if (dicStudentGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DicStudentGroup result = dicStudentGroupRepository.save(dicStudentGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dicStudentGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dic-student-groups : get all the dicStudentGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dicStudentGroups in body
     */
    @GetMapping("/dic-student-groups")
    public List<DicStudentGroup> getAllDicStudentGroups() {
        log.debug("REST request to get all DicStudentGroups");
        return dicStudentGroupRepository.findAll();
    }

    /**
     * GET  /dic-student-groups/:id : get the "id" dicStudentGroup.
     *
     * @param id the id of the dicStudentGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dicStudentGroup, or with status 404 (Not Found)
     */
    @GetMapping("/dic-student-groups/{id}")
    public ResponseEntity<DicStudentGroup> getDicStudentGroup(@PathVariable Long id) {
        log.debug("REST request to get DicStudentGroup : {}", id);
        Optional<DicStudentGroup> dicStudentGroup = dicStudentGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dicStudentGroup);
    }

    /**
     * DELETE  /dic-student-groups/:id : delete the "id" dicStudentGroup.
     *
     * @param id the id of the dicStudentGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dic-student-groups/{id}")
    public ResponseEntity<Void> deleteDicStudentGroup(@PathVariable Long id) {
        log.debug("REST request to delete DicStudentGroup : {}", id);
        dicStudentGroupRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
