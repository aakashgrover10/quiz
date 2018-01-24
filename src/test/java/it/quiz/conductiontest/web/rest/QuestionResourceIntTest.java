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
import it.quiz.conductiontest.domain.Question;
import it.quiz.conductiontest.repository.QuestionRepository;
import it.quiz.conductiontest.web.rest.QuestionResource;
import it.quiz.conductiontest.web.rest.errors.ExceptionTranslator;

import javax.persistence.EntityManager;
import java.util.List;

import static it.quiz.conductiontest.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the QuestionResource REST controller.
 *
 * @see QuestionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConductionTestsApp.class)
public class QuestionResourceIntTest {

    private static final String DEFAULT_SECTION = "AAAAAAAAAA";
    private static final String UPDATED_SECTION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_OPTION_A = "AAAAAAAAAA";
    private static final String UPDATED_OPTION_A = "BBBBBBBBBB";

    private static final String DEFAULT_OPTION_B = "AAAAAAAAAA";
    private static final String UPDATED_OPTION_B = "BBBBBBBBBB";

    private static final String DEFAULT_OPTION_C = "AAAAAAAAAA";
    private static final String UPDATED_OPTION_C = "BBBBBBBBBB";

    private static final String DEFAULT_OPTION_D = "AAAAAAAAAA";
    private static final String UPDATED_OPTION_D = "BBBBBBBBBB";

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    private static final String DEFAULT_MARKS = "AAAAAAAAAA";
    private static final String UPDATED_MARKS = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_COMPLEXITY = "AAAAAAAAAA";
    private static final String UPDATED_COMPLEXITY = "BBBBBBBBBB";

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restQuestionMockMvc;

    private Question question;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuestionResource questionResource = new QuestionResource(questionRepository);
        this.restQuestionMockMvc = MockMvcBuilders.standaloneSetup(questionResource)
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
    public static Question createEntity(EntityManager em) {
        Question question = new Question()
            .section(DEFAULT_SECTION)
            .description(DEFAULT_DESCRIPTION)
            .optionA(DEFAULT_OPTION_A)
            .optionB(DEFAULT_OPTION_B)
            .optionC(DEFAULT_OPTION_C)
            .optionD(DEFAULT_OPTION_D)
            .answer(DEFAULT_ANSWER)
            .marks(DEFAULT_MARKS)
            .status(DEFAULT_STATUS)
            .complexity(DEFAULT_COMPLEXITY);
        return question;
    }

    @Before
    public void initTest() {
        question = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestion() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isCreated());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate + 1);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getSection()).isEqualTo(DEFAULT_SECTION);
        assertThat(testQuestion.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testQuestion.getOptionA()).isEqualTo(DEFAULT_OPTION_A);
        assertThat(testQuestion.getOptionB()).isEqualTo(DEFAULT_OPTION_B);
        assertThat(testQuestion.getOptionC()).isEqualTo(DEFAULT_OPTION_C);
        assertThat(testQuestion.getOptionD()).isEqualTo(DEFAULT_OPTION_D);
        assertThat(testQuestion.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testQuestion.getMarks()).isEqualTo(DEFAULT_MARKS);
        assertThat(testQuestion.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testQuestion.getComplexity()).isEqualTo(DEFAULT_COMPLEXITY);
    }

    @Test
    @Transactional
    public void createQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question with an existing ID
        question.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isBadRequest());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllQuestions() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList
        restQuestionMockMvc.perform(get("/api/questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(question.getId().intValue())))
            .andExpect(jsonPath("$.[*].section").value(hasItem(DEFAULT_SECTION.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].optionA").value(hasItem(DEFAULT_OPTION_A.toString())))
            .andExpect(jsonPath("$.[*].optionB").value(hasItem(DEFAULT_OPTION_B.toString())))
            .andExpect(jsonPath("$.[*].optionC").value(hasItem(DEFAULT_OPTION_C.toString())))
            .andExpect(jsonPath("$.[*].optionD").value(hasItem(DEFAULT_OPTION_D.toString())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].marks").value(hasItem(DEFAULT_MARKS.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].complexity").value(hasItem(DEFAULT_COMPLEXITY.toString())));
    }

    @Test
    @Transactional
    public void getQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", question.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(question.getId().intValue()))
            .andExpect(jsonPath("$.section").value(DEFAULT_SECTION.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.optionA").value(DEFAULT_OPTION_A.toString()))
            .andExpect(jsonPath("$.optionB").value(DEFAULT_OPTION_B.toString()))
            .andExpect(jsonPath("$.optionC").value(DEFAULT_OPTION_C.toString()))
            .andExpect(jsonPath("$.optionD").value(DEFAULT_OPTION_D.toString()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.toString()))
            .andExpect(jsonPath("$.marks").value(DEFAULT_MARKS.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.complexity").value(DEFAULT_COMPLEXITY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQuestion() throws Exception {
        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);
        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Update the question
        Question updatedQuestion = questionRepository.findOne(question.getId());
        // Disconnect from session so that the updates on updatedQuestion are not directly saved in db
        em.detach(updatedQuestion);
        updatedQuestion
            .section(UPDATED_SECTION)
            .description(UPDATED_DESCRIPTION)
            .optionA(UPDATED_OPTION_A)
            .optionB(UPDATED_OPTION_B)
            .optionC(UPDATED_OPTION_C)
            .optionD(UPDATED_OPTION_D)
            .answer(UPDATED_ANSWER)
            .marks(UPDATED_MARKS)
            .status(UPDATED_STATUS)
            .complexity(UPDATED_COMPLEXITY);

        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestion)))
            .andExpect(status().isOk());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getSection()).isEqualTo(UPDATED_SECTION);
        assertThat(testQuestion.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testQuestion.getOptionA()).isEqualTo(UPDATED_OPTION_A);
        assertThat(testQuestion.getOptionB()).isEqualTo(UPDATED_OPTION_B);
        assertThat(testQuestion.getOptionC()).isEqualTo(UPDATED_OPTION_C);
        assertThat(testQuestion.getOptionD()).isEqualTo(UPDATED_OPTION_D);
        assertThat(testQuestion.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testQuestion.getMarks()).isEqualTo(UPDATED_MARKS);
        assertThat(testQuestion.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testQuestion.getComplexity()).isEqualTo(UPDATED_COMPLEXITY);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestion() throws Exception {
        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Create the Question

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isCreated());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);
        int databaseSizeBeforeDelete = questionRepository.findAll().size();

        // Get the question
        restQuestionMockMvc.perform(delete("/api/questions/{id}", question.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Question.class);
        Question question1 = new Question();
        question1.setId(1L);
        Question question2 = new Question();
        question2.setId(question1.getId());
        assertThat(question1).isEqualTo(question2);
        question2.setId(2L);
        assertThat(question1).isNotEqualTo(question2);
        question1.setId(null);
        assertThat(question1).isNotEqualTo(question2);
    }
}
