package it.quiz.conductiontest.repository;

import org.springframework.stereotype.Repository;

import it.quiz.conductiontest.domain.Position;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Position entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {

}
