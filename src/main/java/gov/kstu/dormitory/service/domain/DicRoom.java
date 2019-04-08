package gov.kstu.dormitory.service.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DicRoom.
 */
@Entity
@Table(name = "dic_room")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DicRoom implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "jhi_number")
    private Long number;

    @Column(name = "floor")
    private Integer floor;

    @ManyToOne
    @JsonIgnoreProperties("dicRooms")
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

    public DicRoom description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getNumber() {
        return number;
    }

    public DicRoom number(Long number) {
        this.number = number;
        return this;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Integer getFloor() {
        return floor;
    }

    public DicRoom floor(Integer floor) {
        this.floor = floor;
        return this;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public JhiUser getJhiUser() {
        return jhiUser;
    }

    public DicRoom jhiUser(JhiUser jhiUser) {
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
        DicRoom dicRoom = (DicRoom) o;
        if (dicRoom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dicRoom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DicRoom{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", number=" + getNumber() +
            ", floor=" + getFloor() +
            "}";
    }
}
