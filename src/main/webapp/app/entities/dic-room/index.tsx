import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DicRoom from './dic-room';
import DicRoomDetail from './dic-room-detail';
import DicRoomUpdate from './dic-room-update';
import DicRoomDeleteDialog from './dic-room-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DicRoomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DicRoomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DicRoomDetail} />
      <ErrorBoundaryRoute path={match.url} component={DicRoom} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DicRoomDeleteDialog} />
  </>
);

export default Routes;
