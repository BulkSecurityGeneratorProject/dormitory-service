package gov.kstu.dormitory.service.web.rest;

import gov.kstu.dormitory.service.DormitoryServiceApp;

import gov.kstu.dormitory.service.domain.DicDormitory;
import gov.kstu.dormitory.service.repository.DicDormitoryRepository;
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
 * Test class for the DicDormitoryResource REST controller.
 *
 * @see DicDormitoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DormitoryServiceApp.class)
public class DicDormitoryResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_FLOOR_AMOUNT = 1;
    private static final Integer UPDATED_FLOOR_AMOUNT = 2;

    @Autowired
    private DicDormitoryRepository dicDormitoryRepository;

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

    private MockMvc restDicDormitoryMockMvc;

    private DicDormitory dicDormitory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DicDormitoryResource dicDormitoryResource = new DicDormitoryResource(dicDormitoryRepository);
        this.restDicDormitoryMockMvc = MockMvcBuilders.standaloneSetup(dicDormitoryResource)
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
    public static DicDormitory createEntity(EntityManager em) {
        DicDormitory dicDormitory = new DicDormitory()
            .description(DEFAULT_DESCRIPTION)
            .floorAmount(DEFAULT_FLOOR_AMOUNT);
        return dicDormitory;
    }

    @Before
    public void initTest() {
        dicDormitory = createEntity(em);
    }

    @Test
    @Transactional
    public void createDicDormitory() throws Exception {
        int databaseSizeBeforeCreate = dicDormitoryRepository.findAll().size();

        // Create the DicDormitory
        restDicDormitoryMockMvc.perform(post("/api/dic-dormitories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicDormitory)))
            .andExpect(status().isCreated());

        // Validate the DicDormitory in the database
        List<DicDormitory> dicDormitoryList = dicDormitoryRepository.findAll();
        assertThat(dicDormitoryList).hasSize(databaseSizeBeforeCreate + 1);
        DicDormitory testDicDormitory = dicDormitoryList.get(dicDormitoryList.size() - 1);
        assertThat(testDicDormitory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDicDormitory.getFloorAmount()).isEqualTo(DEFAULT_FLOOR_AMOUNT);
    }

    @Test
    @Transactional
    public void createDicDormitoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dicDormitoryRepository.findAll().size();

        // Create the DicDormitory with an existing ID
        dicDormitory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDicDormitoryMockMvc.perform(post("/api/dic-dormitories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicDormitory)))
            .andExpect(status().isBadRequest());

        // Validate the DicDormitory in the database
        List<DicDormitory> dicDormitoryList = dicDormitoryRepository.findAll();
        assertThat(dicDormitoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDicDormitories() throws Exception {
        // Initialize the database
        dicDormitoryRepository.saveAndFlush(dicDormitory);

        // Get all the dicDormitoryList
        restDicDormitoryMockMvc.perform(get("/api/dic-dormitories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dicDormitory.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].floorAmount").value(hasItem(DEFAULT_FLOOR_AMOUNT)));
    }
    
    @Test
    @Transactional
    public void getDicDormitory() throws Exception {
        // Initialize the database
        dicDormitoryRepository.saveAndFlush(dicDormitory);

        // Get the dicDormitory
        restDicDormitoryMockMvc.perform(get("/api/dic-dormitories/{id}", dicDormitory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dicDormitory.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.floorAmount").value(DEFAULT_FLOOR_AMOUNT));
    }

    @Test
    @Transactional
    public void getNonExistingDicDormitory() throws Exception {
        // Get the dicDormitory
        restDicDormitoryMockMvc.perform(get("/api/dic-dormitories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDicDormitory() throws Exception {
        // Initialize the database
        dicDormitoryRepository.saveAndFlush(dicDormitory);

        int databaseSizeBeforeUpdate = dicDormitoryRepository.findAll().size();

        // Update the dicDormitory
        DicDormitory updatedDicDormitory = dicDormitoryRepository.findById(dicDormitory.getId()).get();
        // Disconnect from session so that the updates on updatedDicDormitory are not directly saved in db
        em.detach(updatedDicDormitory);
        updatedDicDormitory
            .description(UPDATED_DESCRIPTION)
            .floorAmount(UPDATED_FLOOR_AMOUNT);

        restDicDormitoryMockMvc.perform(put("/api/dic-dormitories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDicDormitory)))
            .andExpect(status().isOk());

        // Validate the DicDormitory in the database
        List<DicDormitory> dicDormitoryList = dicDormitoryRepository.findAll();
        assertThat(dicDormitoryList).hasSize(databaseSizeBeforeUpdate);
        DicDormitory testDicDormitory = dicDormitoryList.get(dicDormitoryList.size() - 1);
        assertThat(testDicDormitory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDicDormitory.getFloorAmount()).isEqualTo(UPDATED_FLOOR_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingDicDormitory() throws Exception {
        int databaseSizeBeforeUpdate = dicDormitoryRepository.findAll().size();

        // Create the DicDormitory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDicDormitoryMockMvc.perform(put("/api/dic-dormitories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicDormitory)))
            .andExpect(status().isBadRequest());

        // Validate the DicDormitory in the database
        List<DicDormitory> dicDormitoryList = dicDormitoryRepository.findAll();
        assertThat(dicDormitoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDicDormitory() throws Exception {
        // Initialize the database
        dicDormitoryRepository.saveAndFlush(dicDormitory);

        int databaseSizeBeforeDelete = dicDormitoryRepository.findAll().size();

        // Delete the dicDormitory
        restDicDormitoryMockMvc.perform(delete("/api/dic-dormitories/{id}", dicDormitory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DicDormitory> dicDormitoryList = dicDormitoryRepository.findAll();
        assertThat(dicDormitoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DicDormitory.class);
        DicDormitory dicDormitory1 = new DicDormitory();
        dicDormitory1.setId(1L);
        DicDormitory dicDormitory2 = new DicDormitory();
        dicDormitory2.setId(dicDormitory1.getId());
        assertThat(dicDormitory1).isEqualTo(dicDormitory2);
        dicDormitory2.setId(2L);
        assertThat(dicDormitory1).isNotEqualTo(dicDormitory2);
        dicDormitory1.setId(null);
        assertThat(dicDormitory1).isNotEqualTo(dicDormitory2);
    }
}
