import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dic-dormitory.reducer';
import { IDicDormitory } from 'app/shared/model/dic-dormitory.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDicDormitoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DicDormitoryDetail extends React.Component<IDicDormitoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dicDormitoryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dormitoryServiceApp.dicDormitory.detail.title">DicDormitory</Translate> [<b>{dicDormitoryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">
                <Translate contentKey="dormitoryServiceApp.dicDormitory.description">Description</Translate>
              </span>
            </dt>
            <dd>{dicDormitoryEntity.description}</dd>
            <dt>
              <span id="floorAmount">
                <Translate contentKey="dormitoryServiceApp.dicDormitory.floorAmount">Floor Amount</Translate>
              </span>
            </dt>
            <dd>{dicDormitoryEntity.floorAmount}</dd>
            <dt>
              <Translate contentKey="dormitoryServiceApp.dicDormitory.jhiUser">Jhi User</Translate>
            </dt>
            <dd>{dicDormitoryEntity.jhiUser ? dicDormitoryEntity.jhiUser.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/dic-dormitory" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/dic-dormitory/${dicDormitoryEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dicDormitory }: IRootState) => ({
  dicDormitoryEntity: dicDormitory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicDormitoryDetail);
