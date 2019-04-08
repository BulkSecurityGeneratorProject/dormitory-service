package gov.kstu.dormitory.service.web.rest;

import gov.kstu.dormitory.service.DormitoryServiceApp;

import gov.kstu.dormitory.service.domain.DicStudentGroup;
import gov.kstu.dormitory.service.repository.DicStudentGroupRepository;
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
 * Test class for the DicStudentGroupResource REST controller.
 *
 * @see DicStudentGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DormitoryServiceApp.class)
public class DicStudentGroupResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DicStudentGroupRepository dicStudentGroupRepository;

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

    private MockMvc restDicStudentGroupMockMvc;

    private DicStudentGroup dicStudentGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DicStudentGroupResource dicStudentGroupResource = new DicStudentGroupResource(dicStudentGroupRepository);
        this.restDicStudentGroupMockMvc = MockMvcBuilders.standaloneSetup(dicStudentGroupResource)
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
    public static DicStudentGroup createEntity(EntityManager em) {
        DicStudentGroup dicStudentGroup = new DicStudentGroup()
            .description(DEFAULT_DESCRIPTION);
        return dicStudentGroup;
    }

    @Before
    public void initTest() {
        dicStudentGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createDicStudentGroup() throws Exception {
        int databaseSizeBeforeCreate = dicStudentGroupRepository.findAll().size();

        // Create the DicStudentGroup
        restDicStudentGroupMockMvc.perform(post("/api/dic-student-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicStudentGroup)))
            .andExpect(status().isCreated());

        // Validate the DicStudentGroup in the database
        List<DicStudentGroup> dicStudentGroupList = dicStudentGroupRepository.findAll();
        assertThat(dicStudentGroupList).hasSize(databaseSizeBeforeCreate + 1);
        DicStudentGroup testDicStudentGroup = dicStudentGroupList.get(dicStudentGroupList.size() - 1);
        assertThat(testDicStudentGroup.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDicStudentGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dicStudentGroupRepository.findAll().size();

        // Create the DicStudentGroup with an existing ID
        dicStudentGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDicStudentGroupMockMvc.perform(post("/api/dic-student-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicStudentGroup)))
            .andExpect(status().isBadRequest());

        // Validate the DicStudentGroup in the database
        List<DicStudentGroup> dicStudentGroupList = dicStudentGroupRepository.findAll();
        assertThat(dicStudentGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDicStudentGroups() throws Exception {
        // Initialize the database
        dicStudentGroupRepository.saveAndFlush(dicStudentGroup);

        // Get all the dicStudentGroupList
        restDicStudentGroupMockMvc.perform(get("/api/dic-student-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dicStudentGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getDicStudentGroup() throws Exception {
        // Initialize the database
        dicStudentGroupRepository.saveAndFlush(dicStudentGroup);

        // Get the dicStudentGroup
        restDicStudentGroupMockMvc.perform(get("/api/dic-student-groups/{id}", dicStudentGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dicStudentGroup.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDicStudentGroup() throws Exception {
        // Get the dicStudentGroup
        restDicStudentGroupMockMvc.perform(get("/api/dic-student-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDicStudentGroup() throws Exception {
        // Initialize the database
        dicStudentGroupRepository.saveAndFlush(dicStudentGroup);

        int databaseSizeBeforeUpdate = dicStudentGroupRepository.findAll().size();

        // Update the dicStudentGroup
        DicStudentGroup updatedDicStudentGroup = dicStudentGroupRepository.findById(dicStudentGroup.getId()).get();
        // Disconnect from session so that the updates on updatedDicStudentGroup are not directly saved in db
        em.detach(updatedDicStudentGroup);
        updatedDicStudentGroup
            .description(UPDATED_DESCRIPTION);

        restDicStudentGroupMockMvc.perform(put("/api/dic-student-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDicStudentGroup)))
            .andExpect(status().isOk());

        // Validate the DicStudentGroup in the database
        List<DicStudentGroup> dicStudentGroupList = dicStudentGroupRepository.findAll();
        assertThat(dicStudentGroupList).hasSize(databaseSizeBeforeUpdate);
        DicStudentGroup testDicStudentGroup = dicStudentGroupList.get(dicStudentGroupList.size() - 1);
        assertThat(testDicStudentGroup.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDicStudentGroup() throws Exception {
        int databaseSizeBeforeUpdate = dicStudentGroupRepository.findAll().size();

        // Create the DicStudentGroup

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDicStudentGroupMockMvc.perform(put("/api/dic-student-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dicStudentGroup)))
            .andExpect(status().isBadRequest());

        // Validate the DicStudentGroup in the database
        List<DicStudentGroup> dicStudentGroupList = dicStudentGroupRepository.findAll();
        assertThat(dicStudentGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDicStudentGroup() throws Exception {
        // Initialize the database
        dicStudentGroupRepository.saveAndFlush(dicStudentGroup);

        int databaseSizeBeforeDelete = dicStudentGroupRepository.findAll().size();

        // Delete the dicStudentGroup
        restDicStudentGroupMockMvc.perform(delete("/api/dic-student-groups/{id}", dicStudentGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DicStudentGroup> dicStudentGroupList = dicStudentGroupRepository.findAll();
        assertThat(dicStudentGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DicStudentGroup.class);
        DicStudentGroup dicStudentGroup1 = new DicStudentGroup();
        dicStudentGroup1.setId(1L);
        DicStudentGroup dicStudentGroup2 = new DicStudentGroup();
        dicStudentGroup2.setId(dicStudentGroup1.getId());
        assertThat(dicStudentGroup1).isEqualTo(dicStudentGroup2);
        dicStudentGroup2.setId(2L);
        assertThat(dicStudentGroup1).isNotEqualTo(dicStudentGroup2);
        dicStudentGroup1.setId(null);
        assertThat(dicStudentGroup1).isNotEqualTo(dicStudentGroup2);
    }
}
