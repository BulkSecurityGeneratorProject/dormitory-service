import { IRequest } from 'app/shared/model/request.model';

export interface IDicTypeOfTrouble {
  id?: number;
  description?: string;
  requests?: IRequest[];
}

export const defaultValue: Readonly<IDicTypeOfTrouble> = {};
