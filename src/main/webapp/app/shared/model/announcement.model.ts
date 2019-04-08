import { Moment } from 'moment';
import { IJhiUser } from 'app/shared/model/jhi-user.model';

export interface IAnnouncement {
  id?: number;
  description?: string;
  title?: string;
  startDate?: Moment;
  finishDate?: Moment;
  jhiUser?: IJhiUser;
}

export const defaultValue: Readonly<IAnnouncement> = {};
