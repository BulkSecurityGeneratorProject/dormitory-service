package gov.kstu.dormitory.service.web.rest;
import gov.kstu.dormitory.service.domain.DicFaculty;
import gov.kstu.dormitory.service.repository.DicFacultyRepository;
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
 * REST controller for managing DicFaculty.
 */
@RestController
@RequestMapping("/api")
public class DicFacultyResource {

    private final Logger log = LoggerFactory.getLogger(DicFacultyResource.class);

    private static final String ENTITY_NAME = "dicFaculty";

    private final DicFacultyRepository dicFacultyRepository;

    public DicFacultyResource(DicFacultyRepository dicFacultyRepository) {
        this.dicFacultyRepository = dicFacultyRepository;
    }

    /**
     * POST  /dic-faculties : Create a new dicFaculty.
     *
     * @param dicFaculty the dicFaculty to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dicFaculty, or with status 400 (Bad Request) if the dicFaculty has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dic-faculties")
    public ResponseEntity<DicFaculty> createDicFaculty(@RequestBody DicFaculty dicFaculty) throws URISyntaxException {
        log.debug("REST request to save DicFaculty : {}", dicFaculty);
        if (dicFaculty.getId() != null) {
            throw new BadRequestAlertException("A new dicFaculty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DicFaculty result = dicFacultyRepository.save(dicFaculty);
        return ResponseEntity.created(new URI("/api/dic-faculties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dic-faculties : Updates an existing dicFaculty.
     *
     * @param dicFaculty the dicFaculty to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dicFaculty,
     * or with status 400 (Bad Request) if the dicFaculty is not valid,
     * or with status 500 (Internal Server Error) if the dicFaculty couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dic-faculties")
    public ResponseEntity<DicFaculty> updateDicFaculty(@RequestBody DicFaculty dicFaculty) throws URISyntaxException {
        log.debug("REST request to update DicFaculty : {}", dicFaculty);
        if (dicFaculty.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DicFaculty result = dicFacultyRepository.save(dicFaculty);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dicFaculty.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dic-faculties : get all the dicFaculties.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dicFaculties in body
     */
    @GetMapping("/dic-faculties")
    public List<DicFaculty> getAllDicFaculties() {
        log.debug("REST request to get all DicFaculties");
        return dicFacultyRepository.findAll();
    }

    /**
     * GET  /dic-faculties/:id : get the "id" dicFaculty.
     *
     * @param id the id of the dicFaculty to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dicFaculty, or with status 404 (Not Found)
     */
    @GetMapping("/dic-faculties/{id}")
    public ResponseEntity<DicFaculty> getDicFaculty(@PathVariable Long id) {
        log.debug("REST request to get DicFaculty : {}", id);
        Optional<DicFaculty> dicFaculty = dicFacultyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dicFaculty);
    }

    /**
     * DELETE  /dic-faculties/:id : delete the "id" dicFaculty.
     *
     * @param id the id of the dicFaculty to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dic-faculties/{id}")
    public ResponseEntity<Void> deleteDicFaculty(@PathVariable Long id) {
        log.debug("REST request to delete DicFaculty : {}", id);
        dicFacultyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
