import { IRequest } from 'app/shared/model/request.model';
import { IDicDormitory } from 'app/shared/model/dic-dormitory.model';
import { IDicRoom } from 'app/shared/model/dic-room.model';
import { IAnnouncement } from 'app/shared/model/announcement.model';
import { IDicStudentGroup } from 'app/shared/model/dic-student-group.model';

export interface IJhiUser {
  id?: number;
  requests?: IRequest[];
  dicDormitories?: IDicDormitory[];
  dicRooms?: IDicRoom[];
  announcements?: IAnnouncement[];
  dicStudentGroups?: IDicStudentGroup[];
}

export const defaultValue: Readonly<IJhiUser> = {};
