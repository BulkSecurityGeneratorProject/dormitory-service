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
import { getEntity, updateEntity, createEntity, reset } from './dic-dormitory.reducer';
import { IDicDormitory } from 'app/shared/model/dic-dormitory.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDicDormitoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDicDormitoryUpdateState {
  isNew: boolean;
  jhiUserId: string;
}

export class DicDormitoryUpdate extends React.Component<IDicDormitoryUpdateProps, IDicDormitoryUpdateState> {
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
      const { dicDormitoryEntity } = this.props;
      const entity = {
        ...dicDormitoryEntity,
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
    this.props.history.push('/entity/dic-dormitory');
  };

  render() {
    const { dicDormitoryEntity, jhiUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dormitoryServiceApp.dicDormitory.home.createOrEditLabel">
              <Translate contentKey="dormitoryServiceApp.dicDormitory.home.createOrEditLabel">Create or edit a DicDormitory</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dicDormitoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="dic-dormitory-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="dormitoryServiceApp.dicDormitory.description">Description</Translate>
                  </Label>
                  <AvField id="dic-dormitory-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="floorAmountLabel" for="floorAmount">
                    <Translate contentKey="dormitoryServiceApp.dicDormitory.floorAmount">Floor Amount</Translate>
                  </Label>
                  <AvField id="dic-dormitory-floorAmount" type="string" className="form-control" name="floorAmount" />
                </AvGroup>
                <AvGroup>
                  <Label for="jhiUser.id">
                    <Translate contentKey="dormitoryServiceApp.dicDormitory.jhiUser">Jhi User</Translate>
                  </Label>
                  <AvInput id="dic-dormitory-jhiUser" type="select" className="form-control" name="jhiUser.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/dic-dormitory" replace color="info">
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
  dicDormitoryEntity: storeState.dicDormitory.entity,
  loading: storeState.dicDormitory.loading,
  updating: storeState.dicDormitory.updating,
  updateSuccess: storeState.dicDormitory.updateSuccess
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
)(DicDormitoryUpdate);
