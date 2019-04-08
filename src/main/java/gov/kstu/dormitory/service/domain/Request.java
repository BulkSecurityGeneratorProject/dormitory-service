package gov.kstu.dormitory.service.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Request.
 */
@Entity
@Table(name = "request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "photo_url")
    private String photoUrl;

    @ManyToOne
    @JsonIgnoreProperties("requests")
    private DicTypeOfTrouble dicTypeOfTrouble;

    @ManyToOne
    @JsonIgnoreProperties("requests")
    private JhiUser jhiUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Request title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Request description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public Request photoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
        return this;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public DicTypeOfTrouble getDicTypeOfTrouble() {
        return dicTypeOfTrouble;
    }

    public Request dicTypeOfTrouble(DicTypeOfTrouble dicTypeOfTrouble) {
        this.dicTypeOfTrouble = dicTypeOfTrouble;
        return this;
    }

    public void setDicTypeOfTrouble(DicTypeOfTrouble dicTypeOfTrouble) {
        this.dicTypeOfTrouble = dicTypeOfTrouble;
    }

    public JhiUser getJhiUser() {
        return jhiUser;
    }

    public Request jhiUser(JhiUser jhiUser) {
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
        Request request = (Request) o;
        if (request.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), request.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Request{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", photoUrl='" + getPhotoUrl() + "'" +
            "}";
    }
}
