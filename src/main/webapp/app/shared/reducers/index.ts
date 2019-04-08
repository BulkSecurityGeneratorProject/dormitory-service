import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import request, {
  RequestState
} from 'app/entities/request/request.reducer';
// prettier-ignore
import dicTypeOfTrouble, {
  DicTypeOfTroubleState
} from 'app/entities/dic-type-of-trouble/dic-type-of-trouble.reducer';
// prettier-ignore
import dicStudentGroup, {
  DicStudentGroupState
} from 'app/entities/dic-student-group/dic-student-group.reducer';
// prettier-ignore
import dicFaculty, {
  DicFacultyState
} from 'app/entities/dic-faculty/dic-faculty.reducer';
// prettier-ignore
import dicRoom, {
  DicRoomState
} from 'app/entities/dic-room/dic-room.reducer';
// prettier-ignore
import dicDormitory, {
  DicDormitoryState
} from 'app/entities/dic-dormitory/dic-dormitory.reducer';
// prettier-ignore
import announcement, {
  AnnouncementState
} from 'app/entities/announcement/announcement.reducer';
// prettier-ignore
import jhiUser, {
  JhiUserState
} from 'app/entities/jhi-user/jhi-user.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly request: RequestState;
  readonly dicTypeOfTrouble: DicTypeOfTroubleState;
  readonly dicStudentGroup: DicStudentGroupState;
  readonly dicFaculty: DicFacultyState;
  readonly dicRoom: DicRoomState;
  readonly dicDormitory: DicDormitoryState;
  readonly announcement: AnnouncementState;
  readonly jhiUser: JhiUserState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  request,
  dicTypeOfTrouble,
  dicStudentGroup,
  dicFaculty,
  dicRoom,
  dicDormitory,
  announcement,
  jhiUser,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
