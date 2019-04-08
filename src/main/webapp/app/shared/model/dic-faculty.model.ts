import { IDicStudentGroup } from 'app/shared/model/dic-student-group.model';

export interface IDicFaculty {
  id?: number;
  description?: string;
  dicStudentGroups?: IDicStudentGroup[];
}

export const defaultValue: Readonly<IDicFaculty> = {};
