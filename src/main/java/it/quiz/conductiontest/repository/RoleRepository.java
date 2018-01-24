package it.quiz.conductiontest.repository;

import org.springframework.stereotype.Repository;

import it.quiz.conductiontest.domain.Role;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
