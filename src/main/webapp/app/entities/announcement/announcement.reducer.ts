import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAnnouncement, defaultValue } from 'app/shared/model/announcement.model';

export const ACTION_TYPES = {
  FETCH_ANNOUNCEMENT_LIST: 'announcement/FETCH_ANNOUNCEMENT_LIST',
  FETCH_ANNOUNCEMENT: 'announcement/FETCH_ANNOUNCEMENT',
  CREATE_ANNOUNCEMENT: 'announcement/CREATE_ANNOUNCEMENT',
  UPDATE_ANNOUNCEMENT: 'announcement/UPDATE_ANNOUNCEMENT',
  DELETE_ANNOUNCEMENT: 'announcement/DELETE_ANNOUNCEMENT',
  RESET: 'announcement/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAnnouncement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AnnouncementState = Readonly<typeof initialState>;

// Reducer

export default (state: AnnouncementState = initialState, action): AnnouncementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ANNOUNCEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ANNOUNCEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ANNOUNCEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ANNOUNCEMENT):
    case REQUEST(ACTION_TYPES.DELETE_ANNOUNCEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ANNOUNCEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ANNOUNCEMENT):
    case FAILURE(ACTION_TYPES.CREATE_ANNOUNCEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ANNOUNCEMENT):
    case FAILURE(ACTION_TYPES.DELETE_ANNOUNCEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANNOUNCEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANNOUNCEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ANNOUNCEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ANNOUNCEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ANNOUNCEMENT):
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

const apiUrl = 'api/announcements';

// Actions

export const getEntities: ICrudGetAllAction<IAnnouncement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ANNOUNCEMENT_LIST,
  payload: axios.get<IAnnouncement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAnnouncement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ANNOUNCEMENT,
    payload: axios.get<IAnnouncement>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAnnouncement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ANNOUNCEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAnnouncement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ANNOUNCEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAnnouncement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ANNOUNCEMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
