import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DicStudentGroup from './dic-student-group';
import DicStudentGroupDetail from './dic-student-group-detail';
import DicStudentGroupUpdate from './dic-student-group-update';
import DicStudentGroupDeleteDialog from './dic-student-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DicStudentGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DicStudentGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DicStudentGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={DicStudentGroup} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DicStudentGroupDeleteDialog} />
  </>
);

export default Routes;
