import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDicFaculty } from 'app/shared/model/dic-faculty.model';
import { getEntities as getDicFaculties } from 'app/entities/dic-faculty/dic-faculty.reducer';
import { IJhiUser } from 'app/shared/model/jhi-user.model';
import { getEntities as getJhiUsers } from 'app/entities/jhi-user/jhi-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './dic-student-group.reducer';
import { IDicStudentGroup } from 'app/shared/model/dic-student-group.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDicStudentGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDicStudentGroupUpdateState {
  isNew: boolean;
  dicFacultyId: string;
  jhiUserId: string;
}

export class DicStudentGroupUpdate extends React.Component<IDicStudentGroupUpdateProps, IDicStudentGroupUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      dicFacultyId: '0',
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

    this.props.getDicFaculties();
    this.props.getJhiUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { dicStudentGroupEntity } = this.props;
      const entity = {
        ...dicStudentGroupEntity,
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
    this.props.history.push('/entity/dic-student-group');
  };

  render() {
    const { dicStudentGroupEntity, dicFaculties, jhiUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dormitoryServiceApp.dicStudentGroup.home.createOrEditLabel">
              <Translate contentKey="dormitoryServiceApp.dicStudentGroup.home.createOrEditLabel">
                Create or edit a DicStudentGroup
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dicStudentGroupEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="dic-student-group-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="dormitoryServiceApp.dicStudentGroup.description">Description</Translate>
                  </Label>
                  <AvField id="dic-student-group-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="dicFaculty.id">
                    <Translate contentKey="dormitoryServiceApp.dicStudentGroup.dicFaculty">Dic Faculty</Translate>
                  </Label>
                  <AvInput id="dic-student-group-dicFaculty" type="select" className="form-control" name="dicFaculty.id">
                    <option value="" key="0" />
                    {dicFaculties
                      ? dicFaculties.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="jhiUser.id">
                    <Translate contentKey="dormitoryServiceApp.dicStudentGroup.jhiUser">Jhi User</Translate>
                  </Label>
                  <AvInput id="dic-student-group-jhiUser" type="select" className="form-control" name="jhiUser.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/dic-student-group" replace color="info">
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
  dicFaculties: storeState.dicFaculty.entities,
  jhiUsers: storeState.jhiUser.entities,
  dicStudentGroupEntity: storeState.dicStudentGroup.entity,
  loading: storeState.dicStudentGroup.loading,
  updating: storeState.dicStudentGroup.updating,
  updateSuccess: storeState.dicStudentGroup.updateSuccess
});

const mapDispatchToProps = {
  getDicFaculties,
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
)(DicStudentGroupUpdate);
