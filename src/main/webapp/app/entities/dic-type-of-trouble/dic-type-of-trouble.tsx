import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dic-type-of-trouble.reducer';
import { IDicTypeOfTrouble } from 'app/shared/model/dic-type-of-trouble.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDicTypeOfTroubleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DicTypeOfTrouble extends React.Component<IDicTypeOfTroubleProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dicTypeOfTroubleList, match } = this.props;
    return (
      <div>
        <h2 id="dic-type-of-trouble-heading">
          <Translate contentKey="dormitoryServiceApp.dicTypeOfTrouble.home.title">Dic Type Of Troubles</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="dormitoryServiceApp.dicTypeOfTrouble.home.createLabel">Create new Dic Type Of Trouble</Translate>
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
                  <Translate contentKey="dormitoryServiceApp.dicTypeOfTrouble.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dicTypeOfTroubleList.map((dicTypeOfTrouble, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dicTypeOfTrouble.id}`} color="link" size="sm">
                      {dicTypeOfTrouble.id}
                    </Button>
                  </td>
                  <td>{dicTypeOfTrouble.description}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dicTypeOfTrouble.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dicTypeOfTrouble.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dicTypeOfTrouble.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ dicTypeOfTrouble }: IRootState) => ({
  dicTypeOfTroubleList: dicTypeOfTrouble.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicTypeOfTrouble);
