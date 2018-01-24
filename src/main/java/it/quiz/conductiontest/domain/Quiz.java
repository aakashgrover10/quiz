package it.quiz.conductiontest.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Quiz.
 */
@Entity
@Table(name = "quiz")
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "status")
    private String status;

    @Column(name = "marks")
    private String marks;

    @Column(name = "questions_number")
    private Integer questionsNumber;

    @Column(name = "complexity")
    private String complexity;

    @ManyToOne
    private Position position;

    @OneToOne
    @JoinColumn(unique = true)
    private Result result;

    @ManyToMany
    @JoinTable(name = "quiz_questions",
               joinColumns = @JoinColumn(name="quizzes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="questions_id", referencedColumnName="id"))
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Quiz startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Quiz endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public Quiz status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMarks() {
        return marks;
    }

    public Quiz marks(String marks) {
        this.marks = marks;
        return this;
    }

    public void setMarks(String marks) {
        this.marks = marks;
    }

    public Integer getQuestionsNumber() {
        return questionsNumber;
    }

    public Quiz questionsNumber(Integer questionsNumber) {
        this.questionsNumber = questionsNumber;
        return this;
    }

    public void setQuestionsNumber(Integer questionsNumber) {
        this.questionsNumber = questionsNumber;
    }

    public String getComplexity() {
        return complexity;
    }

    public Quiz complexity(String complexity) {
        this.complexity = complexity;
        return this;
    }

    public void setComplexity(String complexity) {
        this.complexity = complexity;
    }

    public Position getPosition() {
        return position;
    }

    public Quiz position(Position position) {
        this.position = position;
        return this;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Result getResult() {
        return result;
    }

    public Quiz result(Result result) {
        this.result = result;
        return this;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Quiz questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Quiz addQuestions(Question question) {
        this.questions.add(question);
        return this;
    }

    public Quiz removeQuestions(Question question) {
        this.questions.remove(question);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Quiz quiz = (Quiz) o;
        if (quiz.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quiz.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Quiz{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", marks='" + getMarks() + "'" +
            ", questionsNumber=" + getQuestionsNumber() +
            ", complexity='" + getComplexity() + "'" +
            "}";
    }
}
