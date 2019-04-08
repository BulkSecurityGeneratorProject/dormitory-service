package gov.kstu.dormitory.service.web.rest;
import gov.kstu.dormitory.service.domain.DicRoom;
import gov.kstu.dormitory.service.repository.DicRoomRepository;
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
 * REST controller for managing DicRoom.
 */
@RestController
@RequestMapping("/api")
public class DicRoomResource {

    private final Logger log = LoggerFactory.getLogger(DicRoomResource.class);

    private static final String ENTITY_NAME = "dicRoom";

    private final DicRoomRepository dicRoomRepository;

    public DicRoomResource(DicRoomRepository dicRoomRepository) {
        this.dicRoomRepository = dicRoomRepository;
    }

    /**
     * POST  /dic-rooms : Create a new dicRoom.
     *
     * @param dicRoom the dicRoom to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dicRoom, or with status 400 (Bad Request) if the dicRoom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dic-rooms")
    public ResponseEntity<DicRoom> createDicRoom(@RequestBody DicRoom dicRoom) throws URISyntaxException {
        log.debug("REST request to save DicRoom : {}", dicRoom);
        if (dicRoom.getId() != null) {
            throw new BadRequestAlertException("A new dicRoom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DicRoom result = dicRoomRepository.save(dicRoom);
        return ResponseEntity.created(new URI("/api/dic-rooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dic-rooms : Updates an existing dicRoom.
     *
     * @param dicRoom the dicRoom to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dicRoom,
     * or with status 400 (Bad Request) if the dicRoom is not valid,
     * or with status 500 (Internal Server Error) if the dicRoom couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dic-rooms")
    public ResponseEntity<DicRoom> updateDicRoom(@RequestBody DicRoom dicRoom) throws URISyntaxException {
        log.debug("REST request to update DicRoom : {}", dicRoom);
        if (dicRoom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DicRoom result = dicRoomRepository.save(dicRoom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dicRoom.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dic-rooms : get all the dicRooms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dicRooms in body
     */
    @GetMapping("/dic-rooms")
    public List<DicRoom> getAllDicRooms() {
        log.debug("REST request to get all DicRooms");
        return dicRoomRepository.findAll();
    }

    /**
     * GET  /dic-rooms/:id : get the "id" dicRoom.
     *
     * @param id the id of the dicRoom to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dicRoom, or with status 404 (Not Found)
     */
    @GetMapping("/dic-rooms/{id}")
    public ResponseEntity<DicRoom> getDicRoom(@PathVariable Long id) {
        log.debug("REST request to get DicRoom : {}", id);
        Optional<DicRoom> dicRoom = dicRoomRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dicRoom);
    }

    /**
     * DELETE  /dic-rooms/:id : delete the "id" dicRoom.
     *
     * @param id the id of the dicRoom to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dic-rooms/{id}")
    public ResponseEntity<Void> deleteDicRoom(@PathVariable Long id) {
        log.debug("REST request to delete DicRoom : {}", id);
        dicRoomRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
