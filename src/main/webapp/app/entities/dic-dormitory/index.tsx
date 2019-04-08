import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DicDormitory from './dic-dormitory';
import DicDormitoryDetail from './dic-dormitory-detail';
import DicDormitoryUpdate from './dic-dormitory-update';
import DicDormitoryDeleteDialog from './dic-dormitory-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DicDormitoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DicDormitoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DicDormitoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={DicDormitory} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DicDormitoryDeleteDialog} />
  </>
);

export default Routes;
