package it.quiz.conductiontest.web.rest;

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

import it.quiz.conductiontest.ConductionTestsApp;
import it.quiz.conductiontest.domain.CustomUser;
import it.quiz.conductiontest.repository.CustomUserRepository;
import it.quiz.conductiontest.web.rest.CustomUserResource;
import it.quiz.conductiontest.web.rest.errors.ExceptionTranslator;

import javax.persistence.EntityManager;
import java.util.List;

import static it.quiz.conductiontest.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CustomUserResource REST controller.
 *
 * @see CustomUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConductionTestsApp.class)
public class CustomUserResourceIntTest {

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private CustomUserRepository customUserRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomUserMockMvc;

    private CustomUser customUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomUserResource customUserResource = new CustomUserResource(customUserRepository);
        this.restCustomUserMockMvc = MockMvcBuilders.standaloneSetup(customUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomUser createEntity(EntityManager em) {
        CustomUser customUser = new CustomUser()
            .password(DEFAULT_PASSWORD)
            .enabled(DEFAULT_ENABLED);
        return customUser;
    }

    @Before
    public void initTest() {
        customUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomUser() throws Exception {
        int databaseSizeBeforeCreate = customUserRepository.findAll().size();

        // Create the CustomUser
        restCustomUserMockMvc.perform(post("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isCreated());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeCreate + 1);
        CustomUser testCustomUser = customUserList.get(customUserList.size() - 1);
        assertThat(testCustomUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testCustomUser.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createCustomUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customUserRepository.findAll().size();

        // Create the CustomUser with an existing ID
        customUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomUserMockMvc.perform(post("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isBadRequest());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCustomUsers() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);

        // Get all the customUserList
        restCustomUserMockMvc.perform(get("/api/custom-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }

    @Test
    @Transactional
    public void getCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);

        // Get the customUser
        restCustomUserMockMvc.perform(get("/api/custom-users/{id}", customUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customUser.getId().intValue()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomUser() throws Exception {
        // Get the customUser
        restCustomUserMockMvc.perform(get("/api/custom-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);
        int databaseSizeBeforeUpdate = customUserRepository.findAll().size();

        // Update the customUser
        CustomUser updatedCustomUser = customUserRepository.findOne(customUser.getId());
        // Disconnect from session so that the updates on updatedCustomUser are not directly saved in db
        em.detach(updatedCustomUser);
        updatedCustomUser
            .password(UPDATED_PASSWORD)
            .enabled(UPDATED_ENABLED);

        restCustomUserMockMvc.perform(put("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomUser)))
            .andExpect(status().isOk());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeUpdate);
        CustomUser testCustomUser = customUserList.get(customUserList.size() - 1);
        assertThat(testCustomUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testCustomUser.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomUser() throws Exception {
        int databaseSizeBeforeUpdate = customUserRepository.findAll().size();

        // Create the CustomUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCustomUserMockMvc.perform(put("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isCreated());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);
        int databaseSizeBeforeDelete = customUserRepository.findAll().size();

        // Get the customUser
        restCustomUserMockMvc.perform(delete("/api/custom-users/{id}", customUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomUser.class);
        CustomUser customUser1 = new CustomUser();
        customUser1.setId(1L);
        CustomUser customUser2 = new CustomUser();
        customUser2.setId(customUser1.getId());
        assertThat(customUser1).isEqualTo(customUser2);
        customUser2.setId(2L);
        assertThat(customUser1).isNotEqualTo(customUser2);
        customUser1.setId(null);
        assertThat(customUser1).isNotEqualTo(customUser2);
    }
}
