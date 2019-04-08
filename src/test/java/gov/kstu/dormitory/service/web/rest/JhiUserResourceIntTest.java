package gov.kstu.dormitory.service.web.rest;

import gov.kstu.dormitory.service.DormitoryServiceApp;

import gov.kstu.dormitory.service.domain.JhiUser;
import gov.kstu.dormitory.service.repository.JhiUserRepository;
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
 * Test class for the JhiUserResource REST controller.
 *
 * @see JhiUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DormitoryServiceApp.class)
public class JhiUserResourceIntTest {

    @Autowired
    private JhiUserRepository jhiUserRepository;

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

    private MockMvc restJhiUserMockMvc;

    private JhiUser jhiUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JhiUserResource jhiUserResource = new JhiUserResource(jhiUserRepository);
        this.restJhiUserMockMvc = MockMvcBuilders.standaloneSetup(jhiUserResource)
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
    public static JhiUser createEntity(EntityManager em) {
        JhiUser jhiUser = new JhiUser();
        return jhiUser;
    }

    @Before
    public void initTest() {
        jhiUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createJhiUser() throws Exception {
        int databaseSizeBeforeCreate = jhiUserRepository.findAll().size();

        // Create the JhiUser
        restJhiUserMockMvc.perform(post("/api/jhi-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jhiUser)))
            .andExpect(status().isCreated());

        // Validate the JhiUser in the database
        List<JhiUser> jhiUserList = jhiUserRepository.findAll();
        assertThat(jhiUserList).hasSize(databaseSizeBeforeCreate + 1);
        JhiUser testJhiUser = jhiUserList.get(jhiUserList.size() - 1);
    }

    @Test
    @Transactional
    public void createJhiUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jhiUserRepository.findAll().size();

        // Create the JhiUser with an existing ID
        jhiUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJhiUserMockMvc.perform(post("/api/jhi-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jhiUser)))
            .andExpect(status().isBadRequest());

        // Validate the JhiUser in the database
        List<JhiUser> jhiUserList = jhiUserRepository.findAll();
        assertThat(jhiUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJhiUsers() throws Exception {
        // Initialize the database
        jhiUserRepository.saveAndFlush(jhiUser);

        // Get all the jhiUserList
        restJhiUserMockMvc.perform(get("/api/jhi-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jhiUser.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getJhiUser() throws Exception {
        // Initialize the database
        jhiUserRepository.saveAndFlush(jhiUser);

        // Get the jhiUser
        restJhiUserMockMvc.perform(get("/api/jhi-users/{id}", jhiUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jhiUser.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingJhiUser() throws Exception {
        // Get the jhiUser
        restJhiUserMockMvc.perform(get("/api/jhi-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJhiUser() throws Exception {
        // Initialize the database
        jhiUserRepository.saveAndFlush(jhiUser);

        int databaseSizeBeforeUpdate = jhiUserRepository.findAll().size();

        // Update the jhiUser
        JhiUser updatedJhiUser = jhiUserRepository.findById(jhiUser.getId()).get();
        // Disconnect from session so that the updates on updatedJhiUser are not directly saved in db
        em.detach(updatedJhiUser);

        restJhiUserMockMvc.perform(put("/api/jhi-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJhiUser)))
            .andExpect(status().isOk());

        // Validate the JhiUser in the database
        List<JhiUser> jhiUserList = jhiUserRepository.findAll();
        assertThat(jhiUserList).hasSize(databaseSizeBeforeUpdate);
        JhiUser testJhiUser = jhiUserList.get(jhiUserList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingJhiUser() throws Exception {
        int databaseSizeBeforeUpdate = jhiUserRepository.findAll().size();

        // Create the JhiUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJhiUserMockMvc.perform(put("/api/jhi-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jhiUser)))
            .andExpect(status().isBadRequest());

        // Validate the JhiUser in the database
        List<JhiUser> jhiUserList = jhiUserRepository.findAll();
        assertThat(jhiUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJhiUser() throws Exception {
        // Initialize the database
        jhiUserRepository.saveAndFlush(jhiUser);

        int databaseSizeBeforeDelete = jhiUserRepository.findAll().size();

        // Delete the jhiUser
        restJhiUserMockMvc.perform(delete("/api/jhi-users/{id}", jhiUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JhiUser> jhiUserList = jhiUserRepository.findAll();
        assertThat(jhiUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JhiUser.class);
        JhiUser jhiUser1 = new JhiUser();
        jhiUser1.setId(1L);
        JhiUser jhiUser2 = new JhiUser();
        jhiUser2.setId(jhiUser1.getId());
        assertThat(jhiUser1).isEqualTo(jhiUser2);
        jhiUser2.setId(2L);
        assertThat(jhiUser1).isNotEqualTo(jhiUser2);
        jhiUser1.setId(null);
        assertThat(jhiUser1).isNotEqualTo(jhiUser2);
    }
}
