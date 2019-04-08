import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './announcement.reducer';
import { IAnnouncement } from 'app/shared/model/announcement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnnouncementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Announcement extends React.Component<IAnnouncementProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { announcementList, match } = this.props;
    return (
      <div>
        <h2 id="announcement-heading">
          <Translate contentKey="dormitoryServiceApp.announcement.home.title">Announcements</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="dormitoryServiceApp.announcement.home.createLabel">Create new Announcement</Translate>
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
                  <Translate contentKey="dormitoryServiceApp.announcement.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.announcement.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.announcement.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.announcement.finishDate">Finish Date</Translate>
                </th>
                <th>
                  <Translate contentKey="dormitoryServiceApp.announcement.jhiUser">Jhi User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {announcementList.map((announcement, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${announcement.id}`} color="link" size="sm">
                      {announcement.id}
                    </Button>
                  </td>
                  <td>{announcement.description}</td>
                  <td>{announcement.title}</td>
                  <td>
                    <TextFormat type="date" value={announcement.startDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={announcement.finishDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{announcement.jhiUser ? <Link to={`jhi-user/${announcement.jhiUser.id}`}>{announcement.jhiUser.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${announcement.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${announcement.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${announcement.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ announcement }: IRootState) => ({
  announcementList: announcement.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Announcement);
