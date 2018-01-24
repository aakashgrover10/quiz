package it.quiz.conductiontest.web.rest;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import it.quiz.conductiontest.domain.CustomUser;
import it.quiz.conductiontest.repository.CustomUserRepository;
import it.quiz.conductiontest.web.rest.errors.BadRequestAlertException;
import it.quiz.conductiontest.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomUser.
 */
@RestController
@RequestMapping("/api")
public class CustomUserResource {

    private final Logger log = LoggerFactory.getLogger(CustomUserResource.class);

    private static final String ENTITY_NAME = "customUser";

    private final CustomUserRepository customUserRepository;

    public CustomUserResource(CustomUserRepository customUserRepository) {
        this.customUserRepository = customUserRepository;
    }

    /**
     * POST  /custom-users : Create a new customUser.
     *
     * @param customUser the customUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customUser, or with status 400 (Bad Request) if the customUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/custom-users")
    @Timed
    public ResponseEntity<CustomUser> createCustomUser(@RequestBody CustomUser customUser) throws URISyntaxException {
        log.debug("REST request to save CustomUser : {}", customUser);
        if (customUser.getId() != null) {
            throw new BadRequestAlertException("A new customUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomUser result = customUserRepository.save(customUser);
        return ResponseEntity.created(new URI("/api/custom-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /custom-users : Updates an existing customUser.
     *
     * @param customUser the customUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customUser,
     * or with status 400 (Bad Request) if the customUser is not valid,
     * or with status 500 (Internal Server Error) if the customUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/custom-users")
    @Timed
    public ResponseEntity<CustomUser> updateCustomUser(@RequestBody CustomUser customUser) throws URISyntaxException {
        log.debug("REST request to update CustomUser : {}", customUser);
        if (customUser.getId() == null) {
            return createCustomUser(customUser);
        }
        CustomUser result = customUserRepository.save(customUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /custom-users : get all the customUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customUsers in body
     */
    @GetMapping("/custom-users")
    @Timed
    public List<CustomUser> getAllCustomUsers() {
        log.debug("REST request to get all CustomUsers");
        return customUserRepository.findAll();
        }

    /**
     * GET  /custom-users/:id : get the "id" customUser.
     *
     * @param id the id of the customUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customUser, or with status 404 (Not Found)
     */
    @GetMapping("/custom-users/{id}")
    @Timed
    public ResponseEntity<CustomUser> getCustomUser(@PathVariable Long id) {
        log.debug("REST request to get CustomUser : {}", id);
        CustomUser customUser = customUserRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customUser));
    }

    /**
     * DELETE  /custom-users/:id : delete the "id" customUser.
     *
     * @param id the id of the customUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/custom-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomUser(@PathVariable Long id) {
        log.debug("REST request to delete CustomUser : {}", id);
        customUserRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
