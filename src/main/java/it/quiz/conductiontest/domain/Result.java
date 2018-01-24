package it.quiz.conductiontest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Result.
 */
@Entity
@Table(name = "result")
public class Result implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "obtained_marks")
    private String obtainedMarks;

    @Column(name = "percentage")
    private Double percentage;

    @Column(name = "appeared_on")
    private String appearedOn;

    @OneToOne(mappedBy = "result")
    @JsonIgnore
    private Quiz quiz;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObtainedMarks() {
        return obtainedMarks;
    }

    public Result obtainedMarks(String obtainedMarks) {
        this.obtainedMarks = obtainedMarks;
        return this;
    }

    public void setObtainedMarks(String obtainedMarks) {
        this.obtainedMarks = obtainedMarks;
    }

    public Double getPercentage() {
        return percentage;
    }

    public Result percentage(Double percentage) {
        this.percentage = percentage;
        return this;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public String getAppearedOn() {
        return appearedOn;
    }

    public Result appearedOn(String appearedOn) {
        this.appearedOn = appearedOn;
        return this;
    }

    public void setAppearedOn(String appearedOn) {
        this.appearedOn = appearedOn;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public Result quiz(Quiz quiz) {
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
        Result result = (Result) o;
        if (result.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), result.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Result{" +
            "id=" + getId() +
            ", obtainedMarks='" + getObtainedMarks() + "'" +
            ", percentage=" + getPercentage() +
            ", appearedOn='" + getAppearedOn() + "'" +
            "}";
    }
}
