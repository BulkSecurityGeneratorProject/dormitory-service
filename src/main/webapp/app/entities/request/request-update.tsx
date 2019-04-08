import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDicTypeOfTrouble } from 'app/shared/model/dic-type-of-trouble.model';
import { getEntities as getDicTypeOfTroubles } from 'app/entities/dic-type-of-trouble/dic-type-of-trouble.reducer';
import { IJhiUser } from 'app/shared/model/jhi-user.model';
import { getEntities as getJhiUsers } from 'app/entities/jhi-user/jhi-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRequestUpdateState {
  isNew: boolean;
  dicTypeOfTroubleId: string;
  jhiUserId: string;
}

export class RequestUpdate extends React.Component<IRequestUpdateProps, IRequestUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      dicTypeOfTroubleId: '0',
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

    this.props.getDicTypeOfTroubles();
    this.props.getJhiUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { requestEntity } = this.props;
      const entity = {
        ...requestEntity,
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
    this.props.history.push('/entity/request');
  };

  render() {
    const { requestEntity, dicTypeOfTroubles, jhiUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dormitoryServiceApp.request.home.createOrEditLabel">
              <Translate contentKey="dormitoryServiceApp.request.home.createOrEditLabel">Create or edit a Request</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : requestEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="request-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="dormitoryServiceApp.request.title">Title</Translate>
                  </Label>
                  <AvField id="request-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="dormitoryServiceApp.request.description">Description</Translate>
                  </Label>
                  <AvField id="request-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="photoUrlLabel" for="photoUrl">
                    <Translate contentKey="dormitoryServiceApp.request.photoUrl">Photo Url</Translate>
                  </Label>
                  <AvField id="request-photoUrl" type="text" name="photoUrl" />
                </AvGroup>
                <AvGroup>
                  <Label for="dicTypeOfTrouble.id">
                    <Translate contentKey="dormitoryServiceApp.request.dicTypeOfTrouble">Dic Type Of Trouble</Translate>
                  </Label>
                  <AvInput id="request-dicTypeOfTrouble" type="select" className="form-control" name="dicTypeOfTrouble.id">
                    <option value="" key="0" />
                    {dicTypeOfTroubles
                      ? dicTypeOfTroubles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="jhiUser.id">
                    <Translate contentKey="dormitoryServiceApp.request.jhiUser">Jhi User</Translate>
                  </Label>
                  <AvInput id="request-jhiUser" type="select" className="form-control" name="jhiUser.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/request" replace color="info">
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
  dicTypeOfTroubles: storeState.dicTypeOfTrouble.entities,
  jhiUsers: storeState.jhiUser.entities,
  requestEntity: storeState.request.entity,
  loading: storeState.request.loading,
  updating: storeState.request.updating,
  updateSuccess: storeState.request.updateSuccess
});

const mapDispatchToProps = {
  getDicTypeOfTroubles,
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
)(RequestUpdate);
