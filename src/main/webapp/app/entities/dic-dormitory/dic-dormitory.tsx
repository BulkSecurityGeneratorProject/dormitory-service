import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dic-dormitory.reducer';
import { IDicDormitory } from 'app/shared/model/dic-dormitory.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDicDormitoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DicDormitory extends React.Component<IDicDormitoryProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dicDormitoryList, match } = this.props;
    return (
      <div>
        <h2 id="dic-dormitory-heading">
          <Translate contentKey="dormitoryServiceApp.dicDormitory.home.title">Dic Dormitories</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="dormitoryServiceApp.dicDormitory.home.createLabel">Create new Dic Dormitory</Translate>
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
                  <Translate contentKey="dormitoryServiceApp.dicDormitory.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.dicDormitory.floorAmount">Floor Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.dicDormitory.jhiUser">Jhi User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dicDormitoryList.map((dicDormitory, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dicDormitory.id}`} color="link" size="sm">
                      {dicDormitory.id}
                    </Button>
                  </td>
                  <td>{dicDormitory.description}</td>
                  <td>{dicDormitory.floorAmount}</td>
                  <td>{dicDormitory.jhiUser ? <Link to={`jhi-user/${dicDormitory.jhiUser.id}`}>{dicDormitory.jhiUser.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dicDormitory.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dicDormitory.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dicDormitory.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ dicDormitory }: IRootState) => ({
  dicDormitoryList: dicDormitory.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicDormitory);
