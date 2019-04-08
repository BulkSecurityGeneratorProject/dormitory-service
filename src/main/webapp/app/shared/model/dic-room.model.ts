import { IJhiUser } from 'app/shared/model/jhi-user.model';

export interface IDicRoom {
  id?: number;
  description?: string;
  number?: number;
  floor?: number;
  jhiUser?: IJhiUser;
}

export const defaultValue: Readonly<IDicRoom> = {};
