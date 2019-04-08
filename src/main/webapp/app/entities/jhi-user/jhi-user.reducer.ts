import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJhiUser, defaultValue } from 'app/shared/model/jhi-user.model';

export const ACTION_TYPES = {
  FETCH_JHIUSER_LIST: 'jhiUser/FETCH_JHIUSER_LIST',
  FETCH_JHIUSER: 'jhiUser/FETCH_JHIUSER',
  CREATE_JHIUSER: 'jhiUser/CREATE_JHIUSER',
  UPDATE_JHIUSER: 'jhiUser/UPDATE_JHIUSER',
  DELETE_JHIUSER: 'jhiUser/DELETE_JHIUSER',
  RESET: 'jhiUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJhiUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type JhiUserState = Readonly<typeof initialState>;

// Reducer

export default (state: JhiUserState = initialState, action): JhiUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JHIUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JHIUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JHIUSER):
    case REQUEST(ACTION_TYPES.UPDATE_JHIUSER):
    case REQUEST(ACTION_TYPES.DELETE_JHIUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JHIUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JHIUSER):
    case FAILURE(ACTION_TYPES.CREATE_JHIUSER):
    case FAILURE(ACTION_TYPES.UPDATE_JHIUSER):
    case FAILURE(ACTION_TYPES.DELETE_JHIUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JHIUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_JHIUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JHIUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_JHIUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JHIUSER):
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

const apiUrl = 'api/jhi-users';

// Actions

export const getEntities: ICrudGetAllAction<IJhiUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_JHIUSER_LIST,
  payload: axios.get<IJhiUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IJhiUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JHIUSER,
    payload: axios.get<IJhiUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJhiUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JHIUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJhiUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JHIUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJhiUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JHIUSER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
