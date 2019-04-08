import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDicDormitory, defaultValue } from 'app/shared/model/dic-dormitory.model';

export const ACTION_TYPES = {
  FETCH_DICDORMITORY_LIST: 'dicDormitory/FETCH_DICDORMITORY_LIST',
  FETCH_DICDORMITORY: 'dicDormitory/FETCH_DICDORMITORY',
  CREATE_DICDORMITORY: 'dicDormitory/CREATE_DICDORMITORY',
  UPDATE_DICDORMITORY: 'dicDormitory/UPDATE_DICDORMITORY',
  DELETE_DICDORMITORY: 'dicDormitory/DELETE_DICDORMITORY',
  RESET: 'dicDormitory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDicDormitory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DicDormitoryState = Readonly<typeof initialState>;

// Reducer

export default (state: DicDormitoryState = initialState, action): DicDormitoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DICDORMITORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DICDORMITORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DICDORMITORY):
    case REQUEST(ACTION_TYPES.UPDATE_DICDORMITORY):
    case REQUEST(ACTION_TYPES.DELETE_DICDORMITORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DICDORMITORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DICDORMITORY):
    case FAILURE(ACTION_TYPES.CREATE_DICDORMITORY):
    case FAILURE(ACTION_TYPES.UPDATE_DICDORMITORY):
    case FAILURE(ACTION_TYPES.DELETE_DICDORMITORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICDORMITORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICDORMITORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DICDORMITORY):
    case SUCCESS(ACTION_TYPES.UPDATE_DICDORMITORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DICDORMITORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/dic-dormitories';

// Actions

export const getEntities: ICrudGetAllAction<IDicDormitory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DICDORMITORY_LIST,
  payload: axios.get<IDicDormitory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDicDormitory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DICDORMITORY,
    payload: axios.get<IDicDormitory>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDicDormitory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DICDORMITORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDicDormitory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DICDORMITORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDicDormitory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DICDORMITORY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
