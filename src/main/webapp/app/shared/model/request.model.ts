import { IDicTypeOfTrouble } from 'app/shared/model/dic-type-of-trouble.model';
import { IJhiUser } from 'app/shared/model/jhi-user.model';

export interface IRequest {
  id?: number;
  title?: string;
  description?: string;
  photoUrl?: string;
  dicTypeOfTrouble?: IDicTypeOfTrouble;
  jhiUser?: IJhiUser;
}

export const defaultValue: Readonly<IRequest> = {};
