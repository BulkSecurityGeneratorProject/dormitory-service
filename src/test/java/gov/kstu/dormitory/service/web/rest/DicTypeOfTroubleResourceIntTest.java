package gov.kstu.dormitory.service.web.rest;

import gov.kstu.dormitory.service.DormitoryServiceApp;

import gov.kstu.dormitory.service.domain.DicTypeOfTrouble;
import gov.kstu.dormitory.service.repository.DicTypeOfTroubleRepository;
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
 * Test class for the DicTypeOfTroubleResource REST controller.
 *
 * @see DicTypeOfTroubleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DormitoryServiceApp.class)
public class DicTypeOfTroubleResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DicTypeOfTroubleRepository dicTypeOfTroubleRepository;

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

    private MockMvc restDicTypeOfTroubleMockMvc;

    private DicTypeOfTrouble dicTypeOfTrouble;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DicTypeOfTroubleResource dicTypeOfTroubleResource = new DicTypeOfTroubleResource(dicTypeOfTroubleRepository);
        this.restDicTypeOfTroubleMockMvc = MockMvcBuilders.standaloneSetup(dicTypeOfTroubleResource)
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
    public static DicTypeOfTrouble createEntity(EntityManager em) {
        DicTypeOfTrouble dicTypeOfTrouble = new DicTypeOfTrouble()
            .description(DEFAULT_DESCRIPTION);
        return dicTypeOfTrouble;
    }

    @Before
    public void initTest() {
        dicTypeOfTrouble = createEntity(em);
    }

    @Test
    @Transactional
    public void createDicTypeOfTrouble() throws Exception {
        int databaseSizeBeforeCreate = dicTypeOfTroubleRepository.findAll().size();

        // Create the DicTypeOfTrouble
        restDicTypeOfTroubleMockMvc.perform(post("/api/dic-type-of-troubles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicTypeOfTrouble)))
            .andExpect(status().isCreated());

        // Validate the DicTypeOfTrouble in the database
        List<DicTypeOfTrouble> dicTypeOfTroubleList = dicTypeOfTroubleRepository.findAll();
        assertThat(dicTypeOfTroubleList).hasSize(databaseSizeBeforeCreate + 1);
        DicTypeOfTrouble testDicTypeOfTrouble = dicTypeOfTroubleList.get(dicTypeOfTroubleList.size() - 1);
        assertThat(testDicTypeOfTrouble.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDicTypeOfTroubleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dicTypeOfTroubleRepository.findAll().size();

        // Create the DicTypeOfTrouble with an existing ID
        dicTypeOfTrouble.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDicTypeOfTroubleMockMvc.perform(post("/api/dic-type-of-troubles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicTypeOfTrouble)))
            .andExpect(status().isBadRequest());

        // Validate the DicTypeOfTrouble in the database
        List<DicTypeOfTrouble> dicTypeOfTroubleList = dicTypeOfTroubleRepository.findAll();
        assertThat(dicTypeOfTroubleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDicTypeOfTroubles() throws Exception {
        // Initialize the database
        dicTypeOfTroubleRepository.saveAndFlush(dicTypeOfTrouble);

        // Get all the dicTypeOfTroubleList
        restDicTypeOfTroubleMockMvc.perform(get("/api/dic-type-of-troubles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dicTypeOfTrouble.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getDicTypeOfTrouble() throws Exception {
        // Initialize the database
        dicTypeOfTroubleRepository.saveAndFlush(dicTypeOfTrouble);

        // Get the dicTypeOfTrouble
        restDicTypeOfTroubleMockMvc.perform(get("/api/dic-type-of-troubles/{id}", dicTypeOfTrouble.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dicTypeOfTrouble.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDicTypeOfTrouble() throws Exception {
        // Get the dicTypeOfTrouble
        restDicTypeOfTroubleMockMvc.perform(get("/api/dic-type-of-troubles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDicTypeOfTrouble() throws Exception {
        // Initialize the database
        dicTypeOfTroubleRepository.saveAndFlush(dicTypeOfTrouble);

        int databaseSizeBeforeUpdate = dicTypeOfTroubleRepository.findAll().size();

        // Update the dicTypeOfTrouble
        DicTypeOfTrouble updatedDicTypeOfTrouble = dicTypeOfTroubleRepository.findById(dicTypeOfTrouble.getId()).get();
        // Disconnect from session so that the updates on updatedDicTypeOfTrouble are not directly saved in db
        em.detach(updatedDicTypeOfTrouble);
        updatedDicTypeOfTrouble
            .description(UPDATED_DESCRIPTION);

        restDicTypeOfTroubleMockMvc.perform(put("/api/dic-type-of-troubles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDicTypeOfTrouble)))
            .andExpect(status().isOk());

        // Validate the DicTypeOfTrouble in the database
        List<DicTypeOfTrouble> dicTypeOfTroubleList = dicTypeOfTroubleRepository.findAll();
        assertThat(dicTypeOfTroubleList).hasSize(databaseSizeBeforeUpdate);
        DicTypeOfTrouble testDicTypeOfTrouble = dicTypeOfTroubleList.get(dicTypeOfTroubleList.size() - 1);
        assertThat(testDicTypeOfTrouble.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDicTypeOfTrouble() throws Exception {
        int databaseSizeBeforeUpdate = dicTypeOfTroubleRepository.findAll().size();

        // Create the DicTypeOfTrouble

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDicTypeOfTroubleMockMvc.perform(put("/api/dic-type-of-troubles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicTypeOfTrouble)))
            .andExpect(status().isBadRequest());

        // Validate the DicTypeOfTrouble in the database
        List<DicTypeOfTrouble> dicTypeOfTroubleList = dicTypeOfTroubleRepository.findAll();
        assertThat(dicTypeOfTroubleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDicTypeOfTrouble() throws Exception {
        // Initialize the database
        dicTypeOfTroubleRepository.saveAndFlush(dicTypeOfTrouble);

        int databaseSizeBeforeDelete = dicTypeOfTroubleRepository.findAll().size();

        // Delete the dicTypeOfTrouble
        restDicTypeOfTroubleMockMvc.perform(delete("/api/dic-type-of-troubles/{id}", dicTypeOfTrouble.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DicTypeOfTrouble> dicTypeOfTroubleList = dicTypeOfTroubleRepository.findAll();
        assertThat(dicTypeOfTroubleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DicTypeOfTrouble.class);
        DicTypeOfTrouble dicTypeOfTrouble1 = new DicTypeOfTrouble();
        dicTypeOfTrouble1.setId(1L);
        DicTypeOfTrouble dicTypeOfTrouble2 = new DicTypeOfTrouble();
        dicTypeOfTrouble2.setId(dicTypeOfTrouble1.getId());
        assertThat(dicTypeOfTrouble1).isEqualTo(dicTypeOfTrouble2);
        dicTypeOfTrouble2.setId(2L);
        assertThat(dicTypeOfTrouble1).isNotEqualTo(dicTypeOfTrouble2);
        dicTypeOfTrouble1.setId(null);
        assertThat(dicTypeOfTrouble1).isNotEqualTo(dicTypeOfTrouble2);
    }
}
