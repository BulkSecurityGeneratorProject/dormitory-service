import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJhiUser } from 'app/shared/model/jhi-user.model';
import { getEntities as getJhiUsers } from 'app/entities/jhi-user/jhi-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './announcement.reducer';
import { IAnnouncement } from 'app/shared/model/announcement.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAnnouncementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAnnouncementUpdateState {
  isNew: boolean;
  jhiUserId: string;
}

export class AnnouncementUpdate extends React.Component<IAnnouncementUpdateProps, IAnnouncementUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      jhiUserId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getJhiUsers();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.finishDate = convertDateTimeToServer(values.finishDate);

    if (errors.length === 0) {
      const { announcementEntity } = this.props;
      const entity = {
        ...announcementEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/announcement');
  };

  render() {
    const { announcementEntity, jhiUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dormitoryServiceApp.announcement.home.createOrEditLabel">
              <Translate contentKey="dormitoryServiceApp.announcement.home.createOrEditLabel">Create or edit a Announcement</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : announcementEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="announcement-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="dormitoryServiceApp.announcement.description">Description</Translate>
                  </Label>
                  <AvField id="announcement-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="dormitoryServiceApp.announcement.title">Title</Translate>
                  </Label>
                  <AvField id="announcement-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    <Translate contentKey="dormitoryServiceApp.announcement.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="announcement-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.announcementEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="finishDateLabel" for="finishDate">
                    <Translate contentKey="dormitoryServiceApp.announcement.finishDate">Finish Date</Translate>
                  </Label>
                  <AvInput
                    id="announcement-finishDate"
                    type="datetime-local"
                    className="form-control"
                    name="finishDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.announcementEntity.finishDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="jhiUser.id">
                    <Translate contentKey="dormitoryServiceApp.announcement.jhiUser">Jhi User</Translate>
                  </Label>
                  <AvInput id="announcement-jhiUser" type="select" className="form-control" name="jhiUser.id">
                    <option value="" key="0" />
                    {jhiUsers
                      ? jhiUsers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/announcement" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  jhiUsers: storeState.jhiUser.entities,
  announcementEntity: storeState.announcement.entity,
  loading: storeState.announcement.loading,
  updating: storeState.announcement.updating,
  updateSuccess: storeState.announcement.updateSuccess
});

const mapDispatchToProps = {
  getJhiUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouncementUpdate);
