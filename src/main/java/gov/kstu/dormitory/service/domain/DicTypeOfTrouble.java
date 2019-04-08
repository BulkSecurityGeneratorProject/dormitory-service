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
 * A DicTypeOfTrouble.
 */
@Entity
@Table(name = "dic_type_of_trouble")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DicTypeOfTrouble implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "dicTypeOfTrouble")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Request> requests = new HashSet<>();
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

    public DicTypeOfTrouble description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Request> getRequests() {
        return requests;
    }

    public DicTypeOfTrouble requests(Set<Request> requests) {
        this.requests = requests;
        return this;
    }

    public DicTypeOfTrouble addRequest(Request request) {
        this.requests.add(request);
        request.setDicTypeOfTrouble(this);
        return this;
    }

    public DicTypeOfTrouble removeRequest(Request request) {
        this.requests.remove(request);
        request.setDicTypeOfTrouble(null);
        return this;
    }

    public void setRequests(Set<Request> requests) {
        this.requests = requests;
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
        DicTypeOfTrouble dicTypeOfTrouble = (DicTypeOfTrouble) o;
        if (dicTypeOfTrouble.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dicTypeOfTrouble.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DicTypeOfTrouble{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
