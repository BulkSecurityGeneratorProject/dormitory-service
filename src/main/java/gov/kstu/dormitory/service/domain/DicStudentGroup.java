package gov.kstu.dormitory.service.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DicStudentGroup.
 */
@Entity
@Table(name = "dic_student_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DicStudentGroup implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("dicStudentGroups")
    private DicFaculty dicFaculty;

    @ManyToOne
    @JsonIgnoreProperties("dicStudentGroups")
    private JhiUser jhiUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public DicStudentGroup description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DicFaculty getDicFaculty() {
        return dicFaculty;
    }

    public DicStudentGroup dicFaculty(DicFaculty dicFaculty) {
        this.dicFaculty = dicFaculty;
        return this;
    }

    public void setDicFaculty(DicFaculty dicFaculty) {
        this.dicFaculty = dicFaculty;
    }

    public JhiUser getJhiUser() {
        return jhiUser;
    }

    public DicStudentGroup jhiUser(JhiUser jhiUser) {
        this.jhiUser = jhiUser;
        return this;
    }

    public void setJhiUser(JhiUser jhiUser) {
        this.jhiUser = jhiUser;
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
        DicStudentGroup dicStudentGroup = (DicStudentGroup) o;
        if (dicStudentGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dicStudentGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DicStudentGroup{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
