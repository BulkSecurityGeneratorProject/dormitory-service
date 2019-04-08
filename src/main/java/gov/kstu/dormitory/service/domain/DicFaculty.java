package gov.kstu.dormitory.service.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DicFaculty.
 */
@Entity
@Table(name = "dic_faculty")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DicFaculty implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "dicFaculty")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DicStudentGroup> dicStudentGroups = new HashSet<>();
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

    public DicFaculty description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<DicStudentGroup> getDicStudentGroups() {
        return dicStudentGroups;
    }

    public DicFaculty dicStudentGroups(Set<DicStudentGroup> dicStudentGroups) {
        this.dicStudentGroups = dicStudentGroups;
        return this;
    }

    public DicFaculty addDicStudentGroup(DicStudentGroup dicStudentGroup) {
        this.dicStudentGroups.add(dicStudentGroup);
        dicStudentGroup.setDicFaculty(this);
        return this;
    }

    public DicFaculty removeDicStudentGroup(DicStudentGroup dicStudentGroup) {
        this.dicStudentGroups.remove(dicStudentGroup);
        dicStudentGroup.setDicFaculty(null);
        return this;
    }

    public void setDicStudentGroups(Set<DicStudentGroup> dicStudentGroups) {
        this.dicStudentGroups = dicStudentGroups;
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
        DicFaculty dicFaculty = (DicFaculty) o;
        if (dicFaculty.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dicFaculty.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DicFaculty{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
