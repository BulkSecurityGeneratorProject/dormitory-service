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
 * A JhiUser.
 */
@Entity
@Table(name = "jhi_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JhiUser implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "jhiUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Request> requests = new HashSet<>();
    @OneToMany(mappedBy = "jhiUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DicDormitory> dicDormitories = new HashSet<>();
    @OneToMany(mappedBy = "jhiUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DicRoom> dicRooms = new HashSet<>();
    @OneToMany(mappedBy = "jhiUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Announcement> announcements = new HashSet<>();
    @OneToMany(mappedBy = "jhiUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DicStudentGroup> dicStudentGroups = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Request> getRequests() {
        return requests;
    }

    public JhiUser requests(Set<Request> requests) {
        this.requests = requests;
        return this;
    }

    public JhiUser addRequest(Request request) {
        this.requests.add(request);
        request.setJhiUser(this);
        return this;
    }

    public JhiUser removeRequest(Request request) {
        this.requests.remove(request);
        request.setJhiUser(null);
        return this;
    }

    public void setRequests(Set<Request> requests) {
        this.requests = requests;
    }

    public Set<DicDormitory> getDicDormitories() {
        return dicDormitories;
    }

    public JhiUser dicDormitories(Set<DicDormitory> dicDormitories) {
        this.dicDormitories = dicDormitories;
        return this;
    }

    public JhiUser addDicDormitory(DicDormitory dicDormitory) {
        this.dicDormitories.add(dicDormitory);
        dicDormitory.setJhiUser(this);
        return this;
    }

    public JhiUser removeDicDormitory(DicDormitory dicDormitory) {
        this.dicDormitories.remove(dicDormitory);
        dicDormitory.setJhiUser(null);
        return this;
    }

    public void setDicDormitories(Set<DicDormitory> dicDormitories) {
        this.dicDormitories = dicDormitories;
    }

    public Set<DicRoom> getDicRooms() {
        return dicRooms;
    }

    public JhiUser dicRooms(Set<DicRoom> dicRooms) {
        this.dicRooms = dicRooms;
        return this;
    }

    public JhiUser addDicRoom(DicRoom dicRoom) {
        this.dicRooms.add(dicRoom);
        dicRoom.setJhiUser(this);
        return this;
    }

    public JhiUser removeDicRoom(DicRoom dicRoom) {
        this.dicRooms.remove(dicRoom);
        dicRoom.setJhiUser(null);
        return this;
    }

    public void setDicRooms(Set<DicRoom> dicRooms) {
        this.dicRooms = dicRooms;
    }

    public Set<Announcement> getAnnouncements() {
        return announcements;
    }

    public JhiUser announcements(Set<Announcement> announcements) {
        this.announcements = announcements;
        return this;
    }

    public JhiUser addAnnouncement(Announcement announcement) {
        this.announcements.add(announcement);
        announcement.setJhiUser(this);
        return this;
    }

    public JhiUser removeAnnouncement(Announcement announcement) {
        this.announcements.remove(announcement);
        announcement.setJhiUser(null);
        return this;
    }

    public void setAnnouncements(Set<Announcement> announcements) {
        this.announcements = announcements;
    }

    public Set<DicStudentGroup> getDicStudentGroups() {
        return dicStudentGroups;
    }

    public JhiUser dicStudentGroups(Set<DicStudentGroup> dicStudentGroups) {
        this.dicStudentGroups = dicStudentGroups;
        return this;
    }

    public JhiUser addDicStudentGroup(DicStudentGroup dicStudentGroup) {
        this.dicStudentGroups.add(dicStudentGroup);
        dicStudentGroup.setJhiUser(this);
        return this;
    }

    public JhiUser removeDicStudentGroup(DicStudentGroup dicStudentGroup) {
        this.dicStudentGroups.remove(dicStudentGroup);
        dicStudentGroup.setJhiUser(null);
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
        JhiUser jhiUser = (JhiUser) o;
        if (jhiUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jhiUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JhiUser{" +
            "id=" + getId() +
            "}";
    }
}
