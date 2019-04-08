package gov.kstu.dormitory.service.web.rest;
import gov.kstu.dormitory.service.domain.DicTypeOfTrouble;
import gov.kstu.dormitory.service.repository.DicTypeOfTroubleRepository;
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
 * REST controller for managing DicTypeOfTrouble.
 */
@RestController
@RequestMapping("/api")
public class DicTypeOfTroubleResource {

    private final Logger log = LoggerFactory.getLogger(DicTypeOfTroubleResource.class);

    private static final String ENTITY_NAME = "dicTypeOfTrouble";

    private final DicTypeOfTroubleRepository dicTypeOfTroubleRepository;

    public DicTypeOfTroubleResource(DicTypeOfTroubleRepository dicTypeOfTroubleRepository) {
        this.dicTypeOfTroubleRepository = dicTypeOfTroubleRepository;
    }

    /**
     * POST  /dic-type-of-troubles : Create a new dicTypeOfTrouble.
     *
     * @param dicTypeOfTrouble the dicTypeOfTrouble to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dicTypeOfTrouble, or with status 400 (Bad Request) if the dicTypeOfTrouble has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dic-type-of-troubles")
    public ResponseEntity<DicTypeOfTrouble> createDicTypeOfTrouble(@RequestBody DicTypeOfTrouble dicTypeOfTrouble) throws URISyntaxException {
        log.debug("REST request to save DicTypeOfTrouble : {}", dicTypeOfTrouble);
        if (dicTypeOfTrouble.getId() != null) {
            throw new BadRequestAlertException("A new dicTypeOfTrouble cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DicTypeOfTrouble result = dicTypeOfTroubleRepository.save(dicTypeOfTrouble);
        return ResponseEntity.created(new URI("/api/dic-type-of-troubles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dic-type-of-troubles : Updates an existing dicTypeOfTrouble.
     *
     * @param dicTypeOfTrouble the dicTypeOfTrouble to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dicTypeOfTrouble,
     * or with status 400 (Bad Request) if the dicTypeOfTrouble is not valid,
     * or with status 500 (Internal Server Error) if the dicTypeOfTrouble couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dic-type-of-troubles")
    public ResponseEntity<DicTypeOfTrouble> updateDicTypeOfTrouble(@RequestBody DicTypeOfTrouble dicTypeOfTrouble) throws URISyntaxException {
        log.debug("REST request to update DicTypeOfTrouble : {}", dicTypeOfTrouble);
        if (dicTypeOfTrouble.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DicTypeOfTrouble result = dicTypeOfTroubleRepository.save(dicTypeOfTrouble);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dicTypeOfTrouble.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dic-type-of-troubles : get all the dicTypeOfTroubles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dicTypeOfTroubles in body
     */
    @GetMapping("/dic-type-of-troubles")
    public List<DicTypeOfTrouble> getAllDicTypeOfTroubles() {
        log.debug("REST request to get all DicTypeOfTroubles");
        return dicTypeOfTroubleRepository.findAll();
    }

    /**
     * GET  /dic-type-of-troubles/:id : get the "id" dicTypeOfTrouble.
     *
     * @param id the id of the dicTypeOfTrouble to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dicTypeOfTrouble, or with status 404 (Not Found)
     */
    @GetMapping("/dic-type-of-troubles/{id}")
    public ResponseEntity<DicTypeOfTrouble> getDicTypeOfTrouble(@PathVariable Long id) {
        log.debug("REST request to get DicTypeOfTrouble : {}", id);
        Optional<DicTypeOfTrouble> dicTypeOfTrouble = dicTypeOfTroubleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dicTypeOfTrouble);
    }

    /**
     * DELETE  /dic-type-of-troubles/:id : delete the "id" dicTypeOfTrouble.
     *
     * @param id the id of the dicTypeOfTrouble to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dic-type-of-troubles/{id}")
    public ResponseEntity<Void> deleteDicTypeOfTrouble(@PathVariable Long id) {
        log.debug("REST request to delete DicTypeOfTrouble : {}", id);
        dicTypeOfTroubleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
