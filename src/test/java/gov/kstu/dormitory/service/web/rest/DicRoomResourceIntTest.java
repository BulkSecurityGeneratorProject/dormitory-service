package gov.kstu.dormitory.service.web.rest;

import gov.kstu.dormitory.service.DormitoryServiceApp;

import gov.kstu.dormitory.service.domain.DicRoom;
import gov.kstu.dormitory.service.repository.DicRoomRepository;
import gov.kstu.dormitory.service.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static gov.kstu.dormitory.service.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DicRoomResource REST controller.
 *
 * @see DicRoomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DormitoryServiceApp.class)
public class DicRoomResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_NUMBER = 1L;
    private static final Long UPDATED_NUMBER = 2L;

    private static final Integer DEFAULT_FLOOR = 1;
    private static final Integer UPDATED_FLOOR = 2;

    @Autowired
    private DicRoomRepository dicRoomRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDicRoomMockMvc;

    private DicRoom dicRoom;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DicRoomResource dicRoomResource = new DicRoomResource(dicRoomRepository);
        this.restDicRoomMockMvc = MockMvcBuilders.standaloneSetup(dicRoomResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DicRoom createEntity(EntityManager em) {
        DicRoom dicRoom = new DicRoom()
            .description(DEFAULT_DESCRIPTION)
            .number(DEFAULT_NUMBER)
            .floor(DEFAULT_FLOOR);
        return dicRoom;
    }

    @Before
    public void initTest() {
        dicRoom = createEntity(em);
    }

    @Test
    @Transactional
    public void createDicRoom() throws Exception {
        int databaseSizeBeforeCreate = dicRoomRepository.findAll().size();

        // Create the DicRoom
        restDicRoomMockMvc.perform(post("/api/dic-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicRoom)))
            .andExpect(status().isCreated());

        // Validate the DicRoom in the database
        List<DicRoom> dicRoomList = dicRoomRepository.findAll();
        assertThat(dicRoomList).hasSize(databaseSizeBeforeCreate + 1);
        DicRoom testDicRoom = dicRoomList.get(dicRoomList.size() - 1);
        assertThat(testDicRoom.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDicRoom.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testDicRoom.getFloor()).isEqualTo(DEFAULT_FLOOR);
    }

    @Test
    @Transactional
    public void createDicRoomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dicRoomRepository.findAll().size();

        // Create the DicRoom with an existing ID
        dicRoom.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDicRoomMockMvc.perform(post("/api/dic-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicRoom)))
            .andExpect(status().isBadRequest());

        // Validate the DicRoom in the database
        List<DicRoom> dicRoomList = dicRoomRepository.findAll();
        assertThat(dicRoomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDicRooms() throws Exception {
        // Initialize the database
        dicRoomRepository.saveAndFlush(dicRoom);

        // Get all the dicRoomList
        restDicRoomMockMvc.perform(get("/api/dic-rooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dicRoom.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].floor").value(hasItem(DEFAULT_FLOOR)));
    }
    
    @Test
    @Transactional
    public void getDicRoom() throws Exception {
        // Initialize the database
        dicRoomRepository.saveAndFlush(dicRoom);

        // Get the dicRoom
        restDicRoomMockMvc.perform(get("/api/dic-rooms/{id}", dicRoom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dicRoom.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.intValue()))
            .andExpect(jsonPath("$.floor").value(DEFAULT_FLOOR));
    }

    @Test
    @Transactional
    public void getNonExistingDicRoom() throws Exception {
        // Get the dicRoom
        restDicRoomMockMvc.perform(get("/api/dic-rooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDicRoom() throws Exception {
        // Initialize the database
        dicRoomRepository.saveAndFlush(dicRoom);

        int databaseSizeBeforeUpdate = dicRoomRepository.findAll().size();

        // Update the dicRoom
        DicRoom updatedDicRoom = dicRoomRepository.findById(dicRoom.getId()).get();
        // Disconnect from session so that the updates on updatedDicRoom are not directly saved in db
        em.detach(updatedDicRoom);
        updatedDicRoom
            .description(UPDATED_DESCRIPTION)
            .number(UPDATED_NUMBER)
            .floor(UPDATED_FLOOR);

        restDicRoomMockMvc.perform(put("/api/dic-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDicRoom)))
            .andExpect(status().isOk());

        // Validate the DicRoom in the database
        List<DicRoom> dicRoomList = dicRoomRepository.findAll();
        assertThat(dicRoomList).hasSize(databaseSizeBeforeUpdate);
        DicRoom testDicRoom = dicRoomList.get(dicRoomList.size() - 1);
        assertThat(testDicRoom.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDicRoom.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testDicRoom.getFloor()).isEqualTo(UPDATED_FLOOR);
    }

    @Test
    @Transactional
    public void updateNonExistingDicRoom() throws Exception {
        int databaseSizeBeforeUpdate = dicRoomRepository.findAll().size();

        // Create the DicRoom

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDicRoomMockMvc.perform(put("/api/dic-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicRoom)))
            .andExpect(status().isBadRequest());

        // Validate the DicRoom in the database
        List<DicRoom> dicRoomList = dicRoomRepository.findAll();
        assertThat(dicRoomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDicRoom() throws Exception {
        // Initialize the database
        dicRoomRepository.saveAndFlush(dicRoom);

        int databaseSizeBeforeDelete = dicRoomRepository.findAll().size();

        // Delete the dicRoom
        restDicRoomMockMvc.perform(delete("/api/dic-rooms/{id}", dicRoom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DicRoom> dicRoomList = dicRoomRepository.findAll();
        assertThat(dicRoomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DicRoom.class);
        DicRoom dicRoom1 = new DicRoom();
        dicRoom1.setId(1L);
        DicRoom dicRoom2 = new DicRoom();
        dicRoom2.setId(dicRoom1.getId());
        assertThat(dicRoom1).isEqualTo(dicRoom2);
        dicRoom2.setId(2L);
        assertThat(dicRoom1).isNotEqualTo(dicRoom2);
        dicRoom1.setId(null);
        assertThat(dicRoom1).isNotEqualTo(dicRoom2);
    }
}
