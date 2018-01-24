package it.quiz.conductiontest.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "section")
    private String section;

    @Column(name = "description")
    private String description;

    @Column(name = "option_a")
    private String optionA;

    @Column(name = "option_b")
    private String optionB;

    @Column(name = "option_c")
    private String optionC;

    @Column(name = "option_d")
    private String optionD;

    @Column(name = "answer")
    private String answer;

    @Column(name = "marks")
    private String marks;

    @Column(name = "status")
    private String status;

    @Column(name = "complexity")
    private String complexity;

    @ManyToOne
    private Quiz quiz;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSection() {
        return section;
    }

    public Question section(String section) {
        this.section = section;
        return this;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getDescription() {
        return description;
    }

    public Question description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOptionA() {
        return optionA;
    }

    public Question optionA(String optionA) {
        this.optionA = optionA;
        return this;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public Question optionB(String optionB) {
        this.optionB = optionB;
        return this;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public Question optionC(String optionC) {
        this.optionC = optionC;
        return this;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public Question optionD(String optionD) {
        this.optionD = optionD;
        return this;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public String getAnswer() {
        return answer;
    }

    public Question answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getMarks() {
        return marks;
    }

    public Question marks(String marks) {
        this.marks = marks;
        return this;
    }

    public void setMarks(String marks) {
        this.marks = marks;
    }

    public String getStatus() {
        return status;
    }

    public Question status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComplexity() {
        return complexity;
    }

    public Question complexity(String complexity) {
        this.complexity = complexity;
        return this;
    }

    public void setComplexity(String complexity) {
        this.complexity = complexity;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public Question quiz(Quiz quiz) {
        this.quiz = quiz;
        return this;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
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
        Question question = (Question) o;
        if (question.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), question.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", section='" + getSection() + "'" +
            ", description='" + getDescription() + "'" +
            ", optionA='" + getOptionA() + "'" +
            ", optionB='" + getOptionB() + "'" +
            ", optionC='" + getOptionC() + "'" +
            ", optionD='" + getOptionD() + "'" +
            ", answer='" + getAnswer() + "'" +
            ", marks='" + getMarks() + "'" +
            ", status='" + getStatus() + "'" +
            ", complexity='" + getComplexity() + "'" +
            "}";
    }
}
