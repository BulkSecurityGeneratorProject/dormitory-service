import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dic-type-of-trouble.reducer';
import { IDicTypeOfTrouble } from 'app/shared/model/dic-type-of-trouble.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDicTypeOfTroubleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DicTypeOfTroubleDetail extends React.Component<IDicTypeOfTroubleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dicTypeOfTroubleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dormitoryServiceApp.dicTypeOfTrouble.detail.title">DicTypeOfTrouble</Translate> [<b>
              {dicTypeOfTroubleEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">
                <Translate contentKey="dormitoryServiceApp.dicTypeOfTrouble.description">Description</Translate>
              </span>
            </dt>
            <dd>{dicTypeOfTroubleEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/dic-type-of-trouble" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/dic-type-of-trouble/${dicTypeOfTroubleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dicTypeOfTrouble }: IRootState) => ({
  dicTypeOfTroubleEntity: dicTypeOfTrouble.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicTypeOfTroubleDetail);
