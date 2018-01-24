package it.quiz.conductiontest.repository;

import org.springframework.stereotype.Repository;

import it.quiz.conductiontest.domain.Quiz;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Quiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    @Query("select distinct quiz from Quiz quiz left join fetch quiz.questions")
    List<Quiz> findAllWithEagerRelationships();

    @Query("select quiz from Quiz quiz left join fetch quiz.questions where quiz.id =:id")
    Quiz findOneWithEagerRelationships(@Param("id") Long id);

}
