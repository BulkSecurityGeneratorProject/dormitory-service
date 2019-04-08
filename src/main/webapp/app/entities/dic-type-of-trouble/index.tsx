import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DicTypeOfTrouble from './dic-type-of-trouble';
import DicTypeOfTroubleDetail from './dic-type-of-trouble-detail';
import DicTypeOfTroubleUpdate from './dic-type-of-trouble-update';
import DicTypeOfTroubleDeleteDialog from './dic-type-of-trouble-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DicTypeOfTroubleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DicTypeOfTroubleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DicTypeOfTroubleDetail} />
      <ErrorBoundaryRoute path={match.url} component={DicTypeOfTrouble} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DicTypeOfTroubleDeleteDialog} />
  </>
);

export default Routes;
