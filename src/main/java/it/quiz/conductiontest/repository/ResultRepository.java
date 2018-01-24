package it.quiz.conductiontest.repository;

import org.springframework.stereotype.Repository;

import it.quiz.conductiontest.domain.Result;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Result entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

}
