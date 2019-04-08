package gov.kstu.dormitory.service.web.rest;

import gov.kstu.dormitory.service.DormitoryServiceApp;

import gov.kstu.dormitory.service.domain.DicFaculty;
import gov.kstu.dormitory.service.repository.DicFacultyRepository;
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
 * Test class for the DicFacultyResource REST controller.
 *
 * @see DicFacultyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DormitoryServiceApp.class)
public class DicFacultyResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DicFacultyRepository dicFacultyRepository;

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

    private MockMvc restDicFacultyMockMvc;

    private DicFaculty dicFaculty;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DicFacultyResource dicFacultyResource = new DicFacultyResource(dicFacultyRepository);
        this.restDicFacultyMockMvc = MockMvcBuilders.standaloneSetup(dicFacultyResource)
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
    public static DicFaculty createEntity(EntityManager em) {
        DicFaculty dicFaculty = new DicFaculty()
            .description(DEFAULT_DESCRIPTION);
        return dicFaculty;
    }

    @Before
    public void initTest() {
        dicFaculty = createEntity(em);
    }

    @Test
    @Transactional
    public void createDicFaculty() throws Exception {
        int databaseSizeBeforeCreate = dicFacultyRepository.findAll().size();

        // Create the DicFaculty
        restDicFacultyMockMvc.perform(post("/api/dic-faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicFaculty)))
            .andExpect(status().isCreated());

        // Validate the DicFaculty in the database
        List<DicFaculty> dicFacultyList = dicFacultyRepository.findAll();
        assertThat(dicFacultyList).hasSize(databaseSizeBeforeCreate + 1);
        DicFaculty testDicFaculty = dicFacultyList.get(dicFacultyList.size() - 1);
        assertThat(testDicFaculty.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDicFacultyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dicFacultyRepository.findAll().size();

        // Create the DicFaculty with an existing ID
        dicFaculty.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDicFacultyMockMvc.perform(post("/api/dic-faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicFaculty)))
            .andExpect(status().isBadRequest());

        // Validate the DicFaculty in the database
        List<DicFaculty> dicFacultyList = dicFacultyRepository.findAll();
        assertThat(dicFacultyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDicFaculties() throws Exception {
        // Initialize the database
        dicFacultyRepository.saveAndFlush(dicFaculty);

        // Get all the dicFacultyList
        restDicFacultyMockMvc.perform(get("/api/dic-faculties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dicFaculty.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getDicFaculty() throws Exception {
        // Initialize the database
        dicFacultyRepository.saveAndFlush(dicFaculty);

        // Get the dicFaculty
        restDicFacultyMockMvc.perform(get("/api/dic-faculties/{id}", dicFaculty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dicFaculty.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDicFaculty() throws Exception {
        // Get the dicFaculty
        restDicFacultyMockMvc.perform(get("/api/dic-faculties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDicFaculty() throws Exception {
        // Initialize the database
        dicFacultyRepository.saveAndFlush(dicFaculty);

        int databaseSizeBeforeUpdate = dicFacultyRepository.findAll().size();

        // Update the dicFaculty
        DicFaculty updatedDicFaculty = dicFacultyRepository.findById(dicFaculty.getId()).get();
        // Disconnect from session so that the updates on updatedDicFaculty are not directly saved in db
        em.detach(updatedDicFaculty);
        updatedDicFaculty
            .description(UPDATED_DESCRIPTION);

        restDicFacultyMockMvc.perform(put("/api/dic-faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDicFaculty)))
            .andExpect(status().isOk());

        // Validate the DicFaculty in the database
        List<DicFaculty> dicFacultyList = dicFacultyRepository.findAll();
        assertThat(dicFacultyList).hasSize(databaseSizeBeforeUpdate);
        DicFaculty testDicFaculty = dicFacultyList.get(dicFacultyList.size() - 1);
        assertThat(testDicFaculty.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDicFaculty() throws Exception {
        int databaseSizeBeforeUpdate = dicFacultyRepository.findAll().size();

        // Create the DicFaculty

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDicFacultyMockMvc.perform(put("/api/dic-faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicFaculty)))
            .andExpect(status().isBadRequest());

        // Validate the DicFaculty in the database
        List<DicFaculty> dicFacultyList = dicFacultyRepository.findAll();
        assertThat(dicFacultyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDicFaculty() throws Exception {
        // Initialize the database
        dicFacultyRepository.saveAndFlush(dicFaculty);

        int databaseSizeBeforeDelete = dicFacultyRepository.findAll().size();

        // Delete the dicFaculty
        restDicFacultyMockMvc.perform(delete("/api/dic-faculties/{id}", dicFaculty.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DicFaculty> dicFacultyList = dicFacultyRepository.findAll();
        assertThat(dicFacultyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DicFaculty.class);
        DicFaculty dicFaculty1 = new DicFaculty();
        dicFaculty1.setId(1L);
        DicFaculty dicFaculty2 = new DicFaculty();
        dicFaculty2.setId(dicFaculty1.getId());
        assertThat(dicFaculty1).isEqualTo(dicFaculty2);
        dicFaculty2.setId(2L);
        assertThat(dicFaculty1).isNotEqualTo(dicFaculty2);
        dicFaculty1.setId(null);
        assertThat(dicFaculty1).isNotEqualTo(dicFaculty2);
    }
}
