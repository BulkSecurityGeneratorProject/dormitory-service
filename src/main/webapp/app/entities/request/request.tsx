import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Request extends React.Component<IRequestProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { requestList, match } = this.props;
    return (
      <div>
        <h2 id="request-heading">
          <Translate contentKey="dormitoryServiceApp.request.home.title">Requests</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="dormitoryServiceApp.request.home.createLabel">Create new Request</Translate>
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
                  <Translate contentKey="dormitoryServiceApp.request.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.request.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.request.photoUrl">Photo Url</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.request.dicTypeOfTrouble">Dic Type Of Trouble</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.request.jhiUser">Jhi User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {requestList.map((request, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${request.id}`} color="link" size="sm">
                      {request.id}
                    </Button>
                  </td>
                  <td>{request.title}</td>
                  <td>{request.description}</td>
                  <td>{request.photoUrl}</td>
                  <td>
                    {request.dicTypeOfTrouble ? (
                      <Link to={`dic-type-of-trouble/${request.dicTypeOfTrouble.id}`}>{request.dicTypeOfTrouble.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{request.jhiUser ? <Link to={`jhi-user/${request.jhiUser.id}`}>{request.jhiUser.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${request.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${request.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${request.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ request }: IRootState) => ({
  requestList: request.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request);
