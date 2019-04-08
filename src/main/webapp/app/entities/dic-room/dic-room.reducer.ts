import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDicRoom, defaultValue } from 'app/shared/model/dic-room.model';

export const ACTION_TYPES = {
  FETCH_DICROOM_LIST: 'dicRoom/FETCH_DICROOM_LIST',
  FETCH_DICROOM: 'dicRoom/FETCH_DICROOM',
  CREATE_DICROOM: 'dicRoom/CREATE_DICROOM',
  UPDATE_DICROOM: 'dicRoom/UPDATE_DICROOM',
  DELETE_DICROOM: 'dicRoom/DELETE_DICROOM',
  RESET: 'dicRoom/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDicRoom>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DicRoomState = Readonly<typeof initialState>;

// Reducer

export default (state: DicRoomState = initialState, action): DicRoomState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DICROOM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DICROOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DICROOM):
    case REQUEST(ACTION_TYPES.UPDATE_DICROOM):
    case REQUEST(ACTION_TYPES.DELETE_DICROOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DICROOM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DICROOM):
    case FAILURE(ACTION_TYPES.CREATE_DICROOM):
    case FAILURE(ACTION_TYPES.UPDATE_DICROOM):
    case FAILURE(ACTION_TYPES.DELETE_DICROOM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICROOM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICROOM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DICROOM):
    case SUCCESS(ACTION_TYPES.UPDATE_DICROOM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DICROOM):
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

const apiUrl = 'api/dic-rooms';

// Actions

export const getEntities: ICrudGetAllAction<IDicRoom> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DICROOM_LIST,
  payload: axios.get<IDicRoom>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDicRoom> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DICROOM,
    payload: axios.get<IDicRoom>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDicRoom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DICROOM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDicRoom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DICROOM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDicRoom> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DICROOM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
