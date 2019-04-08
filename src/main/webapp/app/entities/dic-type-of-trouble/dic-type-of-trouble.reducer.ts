import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDicTypeOfTrouble, defaultValue } from 'app/shared/model/dic-type-of-trouble.model';

export const ACTION_TYPES = {
  FETCH_DICTYPEOFTROUBLE_LIST: 'dicTypeOfTrouble/FETCH_DICTYPEOFTROUBLE_LIST',
  FETCH_DICTYPEOFTROUBLE: 'dicTypeOfTrouble/FETCH_DICTYPEOFTROUBLE',
  CREATE_DICTYPEOFTROUBLE: 'dicTypeOfTrouble/CREATE_DICTYPEOFTROUBLE',
  UPDATE_DICTYPEOFTROUBLE: 'dicTypeOfTrouble/UPDATE_DICTYPEOFTROUBLE',
  DELETE_DICTYPEOFTROUBLE: 'dicTypeOfTrouble/DELETE_DICTYPEOFTROUBLE',
  RESET: 'dicTypeOfTrouble/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDicTypeOfTrouble>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DicTypeOfTroubleState = Readonly<typeof initialState>;

// Reducer

export default (state: DicTypeOfTroubleState = initialState, action): DicTypeOfTroubleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DICTYPEOFTROUBLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DICTYPEOFTROUBLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DICTYPEOFTROUBLE):
    case REQUEST(ACTION_TYPES.UPDATE_DICTYPEOFTROUBLE):
    case REQUEST(ACTION_TYPES.DELETE_DICTYPEOFTROUBLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DICTYPEOFTROUBLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DICTYPEOFTROUBLE):
    case FAILURE(ACTION_TYPES.CREATE_DICTYPEOFTROUBLE):
    case FAILURE(ACTION_TYPES.UPDATE_DICTYPEOFTROUBLE):
    case FAILURE(ACTION_TYPES.DELETE_DICTYPEOFTROUBLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICTYPEOFTROUBLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICTYPEOFTROUBLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DICTYPEOFTROUBLE):
    case SUCCESS(ACTION_TYPES.UPDATE_DICTYPEOFTROUBLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DICTYPEOFTROUBLE):
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

const apiUrl = 'api/dic-type-of-troubles';

// Actions

export const getEntities: ICrudGetAllAction<IDicTypeOfTrouble> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DICTYPEOFTROUBLE_LIST,
  payload: axios.get<IDicTypeOfTrouble>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDicTypeOfTrouble> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DICTYPEOFTROUBLE,
    payload: axios.get<IDicTypeOfTrouble>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDicTypeOfTrouble> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DICTYPEOFTROUBLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDicTypeOfTrouble> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DICTYPEOFTROUBLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDicTypeOfTrouble> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DICTYPEOFTROUBLE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
