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
import { getEntity, updateEntity, createEntity, reset } from './dic-room.reducer';
import { IDicRoom } from 'app/shared/model/dic-room.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDicRoomUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDicRoomUpdateState {
  isNew: boolean;
  jhiUserId: string;
}

export class DicRoomUpdate extends React.Component<IDicRoomUpdateProps, IDicRoomUpdateState> {
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
    if (errors.length === 0) {
      const { dicRoomEntity } = this.props;
      const entity = {
        ...dicRoomEntity,
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
    this.props.history.push('/entity/dic-room');
  };

  render() {
    const { dicRoomEntity, jhiUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dormitoryServiceApp.dicRoom.home.createOrEditLabel">
              <Translate contentKey="dormitoryServiceApp.dicRoom.home.createOrEditLabel">Create or edit a DicRoom</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dicRoomEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="dic-room-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="dormitoryServiceApp.dicRoom.description">Description</Translate>
                  </Label>
                  <AvField id="dic-room-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="numberLabel" for="number">
                    <Translate contentKey="dormitoryServiceApp.dicRoom.number">Number</Translate>
                  </Label>
                  <AvField id="dic-room-number" type="string" className="form-control" name="number" />
                </AvGroup>
                <AvGroup>
                  <Label id="floorLabel" for="floor">
                    <Translate contentKey="dormitoryServiceApp.dicRoom.floor">Floor</Translate>
                  </Label>
                  <AvField id="dic-room-floor" type="string" className="form-control" name="floor" />
                </AvGroup>
                <AvGroup>
                  <Label for="jhiUser.id">
                    <Translate contentKey="dormitoryServiceApp.dicRoom.jhiUser">Jhi User</Translate>
                  </Label>
                  <AvInput id="dic-room-jhiUser" type="select" className="form-control" name="jhiUser.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/dic-room" replace color="info">
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
  dicRoomEntity: storeState.dicRoom.entity,
  loading: storeState.dicRoom.loading,
  updating: storeState.dicRoom.updating,
  updateSuccess: storeState.dicRoom.updateSuccess
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
)(DicRoomUpdate);
