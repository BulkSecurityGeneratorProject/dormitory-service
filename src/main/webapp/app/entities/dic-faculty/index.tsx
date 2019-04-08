import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DicFaculty from './dic-faculty';
import DicFacultyDetail from './dic-faculty-detail';
import DicFacultyUpdate from './dic-faculty-update';
import DicFacultyDeleteDialog from './dic-faculty-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DicFacultyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DicFacultyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DicFacultyDetail} />
      <ErrorBoundaryRoute path={match.url} component={DicFaculty} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DicFacultyDeleteDialog} />
  </>
);

export default Routes;
