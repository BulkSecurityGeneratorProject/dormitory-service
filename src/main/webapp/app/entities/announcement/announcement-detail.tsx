import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './announcement.reducer';
import { IAnnouncement } from 'app/shared/model/announcement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnnouncementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AnnouncementDetail extends React.Component<IAnnouncementDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { announcementEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dormitoryServiceApp.announcement.detail.title">Announcement</Translate> [<b>{announcementEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">
                <Translate contentKey="dormitoryServiceApp.announcement.description">Description</Translate>
              </span>
            </dt>
            <dd>{announcementEntity.description}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="dormitoryServiceApp.announcement.title">Title</Translate>
              </span>
            </dt>
            <dd>{announcementEntity.title}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="dormitoryServiceApp.announcement.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={announcementEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="finishDate">
                <Translate contentKey="dormitoryServiceApp.announcement.finishDate">Finish Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={announcementEntity.finishDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="dormitoryServiceApp.announcement.jhiUser">Jhi User</Translate>
            </dt>
            <dd>{announcementEntity.jhiUser ? announcementEntity.jhiUser.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/announcement" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/announcement/${announcementEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ announcement }: IRootState) => ({
  announcementEntity: announcement.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouncementDetail);
