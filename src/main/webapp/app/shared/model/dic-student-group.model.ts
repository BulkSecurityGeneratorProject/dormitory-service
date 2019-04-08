import { IDicFaculty } from 'app/shared/model/dic-faculty.model';
import { IJhiUser } from 'app/shared/model/jhi-user.model';

export interface IDicStudentGroup {
  id?: number;
  description?: string;
  dicFaculty?: IDicFaculty;
  jhiUser?: IJhiUser;
}

export const defaultValue: Readonly<IDicStudentGroup> = {};
