import { IJhiUser } from 'app/shared/model/jhi-user.model';

export interface IDicDormitory {
  id?: number;
  description?: string;
  floorAmount?: number;
  jhiUser?: IJhiUser;
}

export const defaultValue: Readonly<IDicDormitory> = {};
