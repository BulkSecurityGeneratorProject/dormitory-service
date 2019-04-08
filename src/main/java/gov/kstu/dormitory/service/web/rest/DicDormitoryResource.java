package gov.kstu.dormitory.service.web.rest;
import gov.kstu.dormitory.service.domain.DicDormitory;
import gov.kstu.dormitory.service.repository.DicDormitoryRepository;
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
 * REST controller for managing DicDormitory.
 */
@RestController
@RequestMapping("/api")
public class DicDormitoryResource {

    private final Logger log = LoggerFactory.getLogger(DicDormitoryResource.class);

    private static final String ENTITY_NAME = "dicDormitory";

    private final DicDormitoryRepository dicDormitoryRepository;

    public DicDormitoryResource(DicDormitoryRepository dicDormitoryRepository) {
        this.dicDormitoryRepository = dicDormitoryRepository;
    }

    /**
     * POST  /dic-dormitories : Create a new dicDormitory.
     *
     * @param dicDormitory the dicDormitory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dicDormitory, or with status 400 (Bad Request) if the dicDormitory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dic-dormitories")
    public ResponseEntity<DicDormitory> createDicDormitory(@RequestBody DicDormitory dicDormitory) throws URISyntaxException {
        log.debug("REST request to save DicDormitory : {}", dicDormitory);
        if (dicDormitory.getId() != null) {
            throw new BadRequestAlertException("A new dicDormitory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DicDormitory result = dicDormitoryRepository.save(dicDormitory);
        return ResponseEntity.created(new URI("/api/dic-dormitories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dic-dormitories : Updates an existing dicDormitory.
     *
     * @param dicDormitory the dicDormitory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dicDormitory,
     * or with status 400 (Bad Request) if the dicDormitory is not valid,
     * or with status 500 (Internal Server Error) if the dicDormitory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dic-dormitories")
    public ResponseEntity<DicDormitory> updateDicDormitory(@RequestBody DicDormitory dicDormitory) throws URISyntaxException {
        log.debug("REST request to update DicDormitory : {}", dicDormitory);
        if (dicDormitory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DicDormitory result = dicDormitoryRepository.save(dicDormitory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dicDormitory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dic-dormitories : get all the dicDormitories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dicDormitories in body
     */
    @GetMapping("/dic-dormitories")
    public List<DicDormitory> getAllDicDormitories() {
        log.debug("REST request to get all DicDormitories");
        return dicDormitoryRepository.findAll();
    }

    /**
     * GET  /dic-dormitories/:id : get the "id" dicDormitory.
     *
     * @param id the id of the dicDormitory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dicDormitory, or with status 404 (Not Found)
     */
    @GetMapping("/dic-dormitories/{id}")
    public ResponseEntity<DicDormitory> getDicDormitory(@PathVariable Long id) {
        log.debug("REST request to get DicDormitory : {}", id);
        Optional<DicDormitory> dicDormitory = dicDormitoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dicDormitory);
    }

    /**
     * DELETE  /dic-dormitories/:id : delete the "id" dicDormitory.
     *
     * @param id the id of the dicDormitory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dic-dormitories/{id}")
    public ResponseEntity<Void> deleteDicDormitory(@PathVariable Long id) {
        log.debug("REST request to delete DicDormitory : {}", id);
        dicDormitoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
