package it.quiz.conductiontest.repository;

import org.springframework.stereotype.Repository;

import it.quiz.conductiontest.domain.UserProfile;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

}
