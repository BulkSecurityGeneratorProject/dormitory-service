import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dic-student-group.reducer';
import { IDicStudentGroup } from 'app/shared/model/dic-student-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDicStudentGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DicStudentGroupDetail extends React.Component<IDicStudentGroupDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dicStudentGroupEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dormitoryServiceApp.dicStudentGroup.detail.title">DicStudentGroup</Translate> [<b>
              {dicStudentGroupEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">
                <Translate contentKey="dormitoryServiceApp.dicStudentGroup.description">Description</Translate>
              </span>
            </dt>
            <dd>{dicStudentGroupEntity.description}</dd>
            <dt>
              <Translate contentKey="dormitoryServiceApp.dicStudentGroup.dicFaculty">Dic Faculty</Translate>
            </dt>
            <dd>{dicStudentGroupEntity.dicFaculty ? dicStudentGroupEntity.dicFaculty.id : ''}</dd>
            <dt>
              <Translate contentKey="dormitoryServiceApp.dicStudentGroup.jhiUser">Jhi User</Translate>
            </dt>
            <dd>{dicStudentGroupEntity.jhiUser ? dicStudentGroupEntity.jhiUser.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/dic-student-group" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/dic-student-group/${dicStudentGroupEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ dicStudentGroup }: IRootState) => ({
  dicStudentGroupEntity: dicStudentGroup.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicStudentGroupDetail);
