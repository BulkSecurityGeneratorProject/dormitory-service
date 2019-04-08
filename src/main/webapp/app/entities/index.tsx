import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Request from './request';
import DicTypeOfTrouble from './dic-type-of-trouble';
import DicStudentGroup from './dic-student-group';
import DicFaculty from './dic-faculty';
import DicRoom from './dic-room';
import DicDormitory from './dic-dormitory';
import Announcement from './announcement';
import JhiUser from './jhi-user';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/request`} component={Request} />
      <ErrorBoundaryRoute path={`${match.url}/dic-type-of-trouble`} component={DicTypeOfTrouble} />
      <ErrorBoundaryRoute path={`${match.url}/dic-student-group`} component={DicStudentGroup} />
      <ErrorBoundaryRoute path={`${match.url}/dic-faculty`} component={DicFaculty} />
      <ErrorBoundaryRoute path={`${match.url}/dic-room`} component={DicRoom} />
      <ErrorBoundaryRoute path={`${match.url}/dic-dormitory`} component={DicDormitory} />
      <ErrorBoundaryRoute path={`${match.url}/announcement`} component={Announcement} />
      <ErrorBoundaryRoute path={`${match.url}/jhi-user`} component={JhiUser} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
