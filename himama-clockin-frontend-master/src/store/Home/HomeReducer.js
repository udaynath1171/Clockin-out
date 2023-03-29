import http from '../../api';

export const ACTIONS = {
  LIST_RECORD: 'HOME_LIST_CLOCKIN',
  SAVE_RECORD: 'HOME_SAVE_CLOCKIN',
  REMOVE_RECORD: 'HOME_REMOVE_CLOCKIN',
  UPDATE_RECORD: 'HOME_UPDATE_CLOCKIN',
  RESET: 'HOME_RESET'
}

const INITIAL_STATE = {
  err: '',
  records: [],
  meta: {}
}

export const HomeReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ACTIONS.RESET:
      return {...state, err: INITIAL_STATE.err }
    case ACTIONS.LIST_RECORD:
      return {...state, records: action.records, err: action.err, meta: action.meta}
    case ACTIONS.SAVE_RECORD:
      if (action.err !== INITIAL_STATE.err) {
        return {
          ...state,
          err: action.err
        }
      }

      let records = [...state.records, action.record]
      records.sort((a, b) => { return b.id - a.id })
      return {...state, records: records, meta: (state.meta.count + 1) }
    case ACTIONS.UPDATE_RECORD:
      if (action.err !== INITIAL_STATE.err) {
        return {
          ...state,
          err: action.err
        }
      }

      const updatedList = [...state.records]
      updatedList.forEach(record => {
        if (record.attributes.id === action.record.id) {
          record.attributes.register_type = action.record.register_type
          record.attributes.register_date = action.record.register_date
        }
      })

      return {...state, records: updatedList }
    case ACTIONS.REMOVE_RECORD:
      return {
        ...state,
        records: state.records.filter(record => record.id !== action.id),
        err: action.err
      }
    default:
      return {...state}
  }
}

export const list = (params = '') => {
  return dispatch => {
    http.get(`/clockin_records${params}`)
      .then( response => {
        dispatch({
          type: ACTIONS.LIST_RECORD,
          records: response.data.data,
          meta: response.data.meta,
          err: INITIAL_STATE.err
        })
      })
      .catch( response => {
        dispatch({
          type: ACTIONS.LIST_RECORD,
          err: response.data
        })
      })
  }
}

export const save = (record) => {
  return dispatch => {
    http.post('/clockin_records', record)
      .then( response => {
        dispatch({
          type: ACTIONS.SAVE_RECORD,
          record: response.data.data,
          err: INITIAL_STATE.err
        })
      })
      .catch( error => {
        dispatch({
          type: ACTIONS.SAVE_RECORD,
          err: error.response.data.errors[0]
        })
      })
  }
}

export const update = (record, id) => {
  return dispatch => {
    http.put(`/clockin_records/${id}`, record)
      .then( response => {
        dispatch({
          type: ACTIONS.UPDATE_RECORD,
          record: response.data.data.attributes,
          err: INITIAL_STATE.err
        })
      })
      .catch( error => {
        dispatch({
          type: ACTIONS.UPDATE_RECORD,
          err: error.response.data.errors[0]
        })
      })
  }
}

export const remove = (id) => {
  return dispatch => {
    http.delete(`/clockin_records/${id}`)
      .then( response => {
        dispatch({
          type: ACTIONS.REMOVE_RECORD,
          id: id,
          err: INITIAL_STATE.err
        })
      })
      .catch( error => {
        dispatch({
          type: ACTIONS.REMOVE_RECORD,
          err: error.response.data.errors[0]
        })
      })
  }
}

export const resetErrors = () => {
  return {
    type: ACTIONS.RESET
  }
}
