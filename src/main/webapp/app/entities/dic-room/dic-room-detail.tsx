import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dic-room.reducer';
import { IDicRoom } from 'app/shared/model/dic-room.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDicRoomDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DicRoomDetail extends React.Component<IDicRoomDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dicRoomEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dormitoryServiceApp.dicRoom.detail.title">DicRoom</Translate> [<b>{dicRoomEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">
                <Translate contentKey="dormitoryServiceApp.dicRoom.description">Description</Translate>
              </span>
            </dt>
            <dd>{dicRoomEntity.description}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="dormitoryServiceApp.dicRoom.number">Number</Translate>
              </span>
            </dt>
            <dd>{dicRoomEntity.number}</dd>
            <dt>
              <span id="floor">
                <Translate contentKey="dormitoryServiceApp.dicRoom.floor">Floor</Translate>
              </span>
            </dt>
            <dd>{dicRoomEntity.floor}</dd>
            <dt>
              <Translate contentKey="dormitoryServiceApp.dicRoom.jhiUser">Jhi User</Translate>
            </dt>
            <dd>{dicRoomEntity.jhiUser ? dicRoomEntity.jhiUser.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/dic-room" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/dic-room/${dicRoomEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dicRoom }: IRootState) => ({
  dicRoomEntity: dicRoom.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicRoomDetail);
