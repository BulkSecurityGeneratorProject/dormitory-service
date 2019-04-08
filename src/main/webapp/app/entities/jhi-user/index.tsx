import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JhiUser from './jhi-user';
import JhiUserDetail from './jhi-user-detail';
import JhiUserUpdate from './jhi-user-update';
import JhiUserDeleteDialog from './jhi-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JhiUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JhiUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JhiUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={JhiUser} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={JhiUserDeleteDialog} />
  </>
);

export default Routes;
