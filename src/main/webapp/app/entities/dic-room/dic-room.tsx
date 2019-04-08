import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dic-room.reducer';
import { IDicRoom } from 'app/shared/model/dic-room.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDicRoomProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DicRoom extends React.Component<IDicRoomProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dicRoomList, match } = this.props;
    return (
      <div>
        <h2 id="dic-room-heading">
          <Translate contentKey="dormitoryServiceApp.dicRoom.home.title">Dic Rooms</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="dormitoryServiceApp.dicRoom.home.createLabel">Create new Dic Room</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.dicRoom.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.dicRoom.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.dicRoom.floor">Floor</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.dicRoom.jhiUser">Jhi User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dicRoomList.map((dicRoom, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dicRoom.id}`} color="link" size="sm">
                      {dicRoom.id}
                    </Button>
                  </td>
                  <td>{dicRoom.description}</td>
                  <td>{dicRoom.number}</td>
                  <td>{dicRoom.floor}</td>
                  <td>{dicRoom.jhiUser ? <Link to={`jhi-user/${dicRoom.jhiUser.id}`}>{dicRoom.jhiUser.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dicRoom.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dicRoom.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dicRoom.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dicRoom }: IRootState) => ({
  dicRoomList: dicRoom.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicRoom);
