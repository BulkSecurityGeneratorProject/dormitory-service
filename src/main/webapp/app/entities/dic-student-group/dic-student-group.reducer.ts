import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDicStudentGroup, defaultValue } from 'app/shared/model/dic-student-group.model';

export const ACTION_TYPES = {
  FETCH_DICSTUDENTGROUP_LIST: 'dicStudentGroup/FETCH_DICSTUDENTGROUP_LIST',
  FETCH_DICSTUDENTGROUP: 'dicStudentGroup/FETCH_DICSTUDENTGROUP',
  CREATE_DICSTUDENTGROUP: 'dicStudentGroup/CREATE_DICSTUDENTGROUP',
  UPDATE_DICSTUDENTGROUP: 'dicStudentGroup/UPDATE_DICSTUDENTGROUP',
  DELETE_DICSTUDENTGROUP: 'dicStudentGroup/DELETE_DICSTUDENTGROUP',
  RESET: 'dicStudentGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDicStudentGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DicStudentGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: DicStudentGroupState = initialState, action): DicStudentGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DICSTUDENTGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DICSTUDENTGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DICSTUDENTGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_DICSTUDENTGROUP):
    case REQUEST(ACTION_TYPES.DELETE_DICSTUDENTGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DICSTUDENTGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DICSTUDENTGROUP):
    case FAILURE(ACTION_TYPES.CREATE_DICSTUDENTGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_DICSTUDENTGROUP):
    case FAILURE(ACTION_TYPES.DELETE_DICSTUDENTGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICSTUDENTGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DICSTUDENTGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DICSTUDENTGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_DICSTUDENTGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DICSTUDENTGROUP):
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

const apiUrl = 'api/dic-student-groups';

// Actions

export const getEntities: ICrudGetAllAction<IDicStudentGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DICSTUDENTGROUP_LIST,
  payload: axios.get<IDicStudentGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDicStudentGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DICSTUDENTGROUP,
    payload: axios.get<IDicStudentGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDicStudentGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DICSTUDENTGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDicStudentGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DICSTUDENTGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDicStudentGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DICSTUDENTGROUP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
