package gov.kstu.dormitory.service.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DicDormitory.
 */
@Entity
@Table(name = "dic_dormitory")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DicDormitory implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "floor_amount")
    private Integer floorAmount;

    @ManyToOne
    @JsonIgnoreProperties("dicDormitories")
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

    public DicDormitory description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getFloorAmount() {
        return floorAmount;
    }

    public DicDormitory floorAmount(Integer floorAmount) {
        this.floorAmount = floorAmount;
        return this;
    }

    public void setFloorAmount(Integer floorAmount) {
        this.floorAmount = floorAmount;
    }

    public JhiUser getJhiUser() {
        return jhiUser;
    }

    public DicDormitory jhiUser(JhiUser jhiUser) {
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
        DicDormitory dicDormitory = (DicDormitory) o;
        if (dicDormitory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dicDormitory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DicDormitory{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", floorAmount=" + getFloorAmount() +
            "}";
    }
}
