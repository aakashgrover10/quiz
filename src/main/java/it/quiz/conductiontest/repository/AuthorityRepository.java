package it.quiz.conductiontest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.quiz.conductiontest.domain.Authority;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
