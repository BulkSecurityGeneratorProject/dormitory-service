import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dic-student-group.reducer';
import { IDicStudentGroup } from 'app/shared/model/dic-student-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDicStudentGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DicStudentGroup extends React.Component<IDicStudentGroupProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dicStudentGroupList, match } = this.props;
    return (
      <div>
        <h2 id="dic-student-group-heading">
          <Translate contentKey="dormitoryServiceApp.dicStudentGroup.home.title">Dic Student Groups</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="dormitoryServiceApp.dicStudentGroup.home.createLabel">Create new Dic Student Group</Translate>
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
                  <Translate contentKey="dormitoryServiceApp.dicStudentGroup.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.dicStudentGroup.dicFaculty">Dic Faculty</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.dicStudentGroup.jhiUser">Jhi User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dicStudentGroupList.map((dicStudentGroup, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dicStudentGroup.id}`} color="link" size="sm">
                      {dicStudentGroup.id}
                    </Button>
                  </td>
                  <td>{dicStudentGroup.description}</td>
                  <td>
                    {dicStudentGroup.dicFaculty ? (
                      <Link to={`dic-faculty/${dicStudentGroup.dicFaculty.id}`}>{dicStudentGroup.dicFaculty.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {dicStudentGroup.jhiUser ? <Link to={`jhi-user/${dicStudentGroup.jhiUser.id}`}>{dicStudentGroup.jhiUser.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dicStudentGroup.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dicStudentGroup.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dicStudentGroup.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ dicStudentGroup }: IRootState) => ({
  dicStudentGroupList: dicStudentGroup.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicStudentGroup);
