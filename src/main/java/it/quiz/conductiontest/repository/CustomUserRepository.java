package it.quiz.conductiontest.repository;

import org.springframework.stereotype.Repository;

import it.quiz.conductiontest.domain.CustomUser;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CustomUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomUserRepository extends JpaRepository<CustomUser, Long> {

}
