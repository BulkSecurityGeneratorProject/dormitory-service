import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDicFaculty, defaultValue } from 'app/shared/model/dic-faculty.model';

export const ACTION_TYPES = {
  FETCH_DICFACULTY_LIST: 'dicFaculty/FETCH_DICFACULTY_LIST',
  FETCH_DICFACULTY: 'dicFaculty/FETCH_DICFACULTY',
  CREATE_DICFACULTY: 'dicFaculty/CREATE_DICFACULTY',
  UPDATE_DICFACULTY: 'dicFaculty/UPDATE_DICFACULTY',
  DELETE_DICFACULTY: 'dicFaculty/DELETE_DICFACULTY',
  RESET: 'dicFaculty/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDicFaculty>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DicFacultyState = Readonly<typeof initialState>;

// Reducer

export default (state: DicFacultyState = initialState, action): DicFacultyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DICFACULTY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DICFACULTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DICFACULTY):
    case REQUEST(ACTION_TYPES.UPDATE_DICFACULTY):
    case REQUEST(ACTION_TYPES.DELETE_DICFACULTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DICFACULTY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DICFACULTY):
    case FAILURE(ACTION_TYPES.CREATE_DICFACULTY):
    case FAILURE(ACTION_TYPES.UPDATE_DICFACULTY):
    case FAILURE(ACTION_TYPES.DELETE_DICFACULTY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICFACULTY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICFACULTY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DICFACULTY):
    case SUCCESS(ACTION_TYPES.UPDATE_DICFACULTY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DICFACULTY):
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

const apiUrl = 'api/dic-faculties';

// Actions

export const getEntities: ICrudGetAllAction<IDicFaculty> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DICFACULTY_LIST,
  payload: axios.get<IDicFaculty>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDicFaculty> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DICFACULTY,
    payload: axios.get<IDicFaculty>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDicFaculty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DICFACULTY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDicFaculty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DICFACULTY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDicFaculty> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DICFACULTY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
