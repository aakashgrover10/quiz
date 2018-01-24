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
import it.quiz.conductiontest.domain.Result;
import it.quiz.conductiontest.repository.ResultRepository;
import it.quiz.conductiontest.web.rest.ResultResource;
import it.quiz.conductiontest.web.rest.errors.ExceptionTranslator;

import javax.persistence.EntityManager;
import java.util.List;

import static it.quiz.conductiontest.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ResultResource REST controller.
 *
 * @see ResultResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConductionTestsApp.class)
public class ResultResourceIntTest {

    private static final String DEFAULT_OBTAINED_MARKS = "AAAAAAAAAA";
    private static final String UPDATED_OBTAINED_MARKS = "BBBBBBBBBB";

    private static final Double DEFAULT_PERCENTAGE = 1D;
    private static final Double UPDATED_PERCENTAGE = 2D;

    private static final String DEFAULT_APPEARED_ON = "AAAAAAAAAA";
    private static final String UPDATED_APPEARED_ON = "BBBBBBBBBB";

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restResultMockMvc;

    private Result result;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ResultResource resultResource = new ResultResource(resultRepository);
        this.restResultMockMvc = MockMvcBuilders.standaloneSetup(resultResource)
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
    public static Result createEntity(EntityManager em) {
        Result result = new Result()
            .obtainedMarks(DEFAULT_OBTAINED_MARKS)
            .percentage(DEFAULT_PERCENTAGE)
            .appearedOn(DEFAULT_APPEARED_ON);
        return result;
    }

    @Before
    public void initTest() {
        result = createEntity(em);
    }

    @Test
    @Transactional
    public void createResult() throws Exception {
        int databaseSizeBeforeCreate = resultRepository.findAll().size();

        // Create the Result
        restResultMockMvc.perform(post("/api/results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(result)))
            .andExpect(status().isCreated());

        // Validate the Result in the database
        List<Result> resultList = resultRepository.findAll();
        assertThat(resultList).hasSize(databaseSizeBeforeCreate + 1);
        Result testResult = resultList.get(resultList.size() - 1);
        assertThat(testResult.getObtainedMarks()).isEqualTo(DEFAULT_OBTAINED_MARKS);
        assertThat(testResult.getPercentage()).isEqualTo(DEFAULT_PERCENTAGE);
        assertThat(testResult.getAppearedOn()).isEqualTo(DEFAULT_APPEARED_ON);
    }

    @Test
    @Transactional
    public void createResultWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resultRepository.findAll().size();

        // Create the Result with an existing ID
        result.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResultMockMvc.perform(post("/api/results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(result)))
            .andExpect(status().isBadRequest());

        // Validate the Result in the database
        List<Result> resultList = resultRepository.findAll();
        assertThat(resultList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllResults() throws Exception {
        // Initialize the database
        resultRepository.saveAndFlush(result);

        // Get all the resultList
        restResultMockMvc.perform(get("/api/results?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(result.getId().intValue())))
            .andExpect(jsonPath("$.[*].obtainedMarks").value(hasItem(DEFAULT_OBTAINED_MARKS.toString())))
            .andExpect(jsonPath("$.[*].percentage").value(hasItem(DEFAULT_PERCENTAGE.doubleValue())))
            .andExpect(jsonPath("$.[*].appearedOn").value(hasItem(DEFAULT_APPEARED_ON.toString())));
    }

    @Test
    @Transactional
    public void getResult() throws Exception {
        // Initialize the database
        resultRepository.saveAndFlush(result);

        // Get the result
        restResultMockMvc.perform(get("/api/results/{id}", result.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(result.getId().intValue()))
            .andExpect(jsonPath("$.obtainedMarks").value(DEFAULT_OBTAINED_MARKS.toString()))
            .andExpect(jsonPath("$.percentage").value(DEFAULT_PERCENTAGE.doubleValue()))
            .andExpect(jsonPath("$.appearedOn").value(DEFAULT_APPEARED_ON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingResult() throws Exception {
        // Get the result
        restResultMockMvc.perform(get("/api/results/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResult() throws Exception {
        // Initialize the database
        resultRepository.saveAndFlush(result);
        int databaseSizeBeforeUpdate = resultRepository.findAll().size();

        // Update the result
        Result updatedResult = resultRepository.findOne(result.getId());
        // Disconnect from session so that the updates on updatedResult are not directly saved in db
        em.detach(updatedResult);
        updatedResult
            .obtainedMarks(UPDATED_OBTAINED_MARKS)
            .percentage(UPDATED_PERCENTAGE)
            .appearedOn(UPDATED_APPEARED_ON);

        restResultMockMvc.perform(put("/api/results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedResult)))
            .andExpect(status().isOk());

        // Validate the Result in the database
        List<Result> resultList = resultRepository.findAll();
        assertThat(resultList).hasSize(databaseSizeBeforeUpdate);
        Result testResult = resultList.get(resultList.size() - 1);
        assertThat(testResult.getObtainedMarks()).isEqualTo(UPDATED_OBTAINED_MARKS);
        assertThat(testResult.getPercentage()).isEqualTo(UPDATED_PERCENTAGE);
        assertThat(testResult.getAppearedOn()).isEqualTo(UPDATED_APPEARED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingResult() throws Exception {
        int databaseSizeBeforeUpdate = resultRepository.findAll().size();

        // Create the Result

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restResultMockMvc.perform(put("/api/results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(result)))
            .andExpect(status().isCreated());

        // Validate the Result in the database
        List<Result> resultList = resultRepository.findAll();
        assertThat(resultList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteResult() throws Exception {
        // Initialize the database
        resultRepository.saveAndFlush(result);
        int databaseSizeBeforeDelete = resultRepository.findAll().size();

        // Get the result
        restResultMockMvc.perform(delete("/api/results/{id}", result.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Result> resultList = resultRepository.findAll();
        assertThat(resultList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Result.class);
        Result result1 = new Result();
        result1.setId(1L);
        Result result2 = new Result();
        result2.setId(result1.getId());
        assertThat(result1).isEqualTo(result2);
        result2.setId(2L);
        assertThat(result1).isNotEqualTo(result2);
        result1.setId(null);
        assertThat(result1).isNotEqualTo(result2);
    }
}
