import { ADD_SITES, ADD_PLANTS, ADD_PRODUCTION, ADD_STARTDATE, ADD_FUNCTIONS, ADD_ENDDATE, ADD_DRILLDOWNDATA } from './actionTypes';
const raw = { value: '', inputDisplay: '' }
const filterInitialState = {
  _function: raw,
  site: raw,
  plant: raw,
  production: [],
  functiondata: {},
  assetdata: {}
}

const filterReducer = (state, action) => {
  switch (action.type) {
    case ADD_SITES:
      return {
        ...state,
        site: action.payload || filterInitialState.site,
        ...!action.payload && {
          plant: filterInitialState.plant
        }
      }
    case ADD_PLANTS:
      return {
        ...state,
        plant: action.payload || filterInitialState.plant,
        ...!action.payload && { production: filterInitialState.production },
      }
    case ADD_FUNCTIONS:
      return {
        ...state,
        _function: action.payload || filterInitialState._function,
      }
    case ADD_PRODUCTION:
      return {
        ...state,
        production: action.payload || filterInitialState.production,
      }
    case ADD_STARTDATE:
      return {
        ...state,
        start_date: action.payload || '',
      }
    case ADD_ENDDATE:
      return {
        ...state,
        end_date: action.payload || '',
      }
    case ADD_DRILLDOWNDATA:
      return {
        ...state,
        drilldowndata: action.payload || filterInitialState.drilldowndata
      }

    // default: throw Error(`${type} is not an ACTION`)

  }
}

export {
  filterReducer,
  filterInitialState
}