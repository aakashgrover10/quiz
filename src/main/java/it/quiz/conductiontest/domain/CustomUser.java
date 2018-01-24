package it.quiz.conductiontest.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CustomUser.
 */
@Entity
@Table(name = "custom_user")
public class CustomUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_password")
    private String password;

    @Column(name = "enabled")
    private Boolean enabled;

    @OneToOne
    @JoinColumn(unique = true)
    private UserProfile userProfile;

    @ManyToOne
    private Position position;

    @ManyToOne
    private Role role;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public CustomUser password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public CustomUser enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public CustomUser userProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
        return this;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Position getPosition() {
        return position;
    }

    public CustomUser position(Position position) {
        this.position = position;
        return this;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Role getRole() {
        return role;
    }

    public CustomUser role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
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
        CustomUser customUser = (CustomUser) o;
        if (customUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomUser{" +
            "id=" + getId() +
            ", password='" + getPassword() + "'" +
            ", enabled='" + isEnabled() + "'" +
            "}";
    }
}
