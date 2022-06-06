import { ADD_SITES, ADD_PLANTS,ADD_PRODUCTION,ADD_FUNCTIONS, ADD_STARTDATE,ADD_ENDDATE,ADD_DRILLDOWNDATA } from './actionTypes';

const initialState = {
  site: [],
  plant: [],
  _function:[],
  production: [],
  drilldowndata:{},
}

const reducer = (state, action) => {
  const { type, init = {}, payload, filterDispatcher } = action;
  switch (type) {
    case ADD_SITES:
      const List = {
        ...state,
        site: payload.map(site => ({ value: site[0], inputDisplay: site[1] })),
        plant: [],
      
      }
      if (init.site && init.site?.value) {
        filterDispatcher({ type: ADD_SITES, payload: init.site });
        delete init.site
      } else
        filterDispatcher({ type: ADD_SITES, payload: List.site[0] });
      return List;

    case ADD_PLANTS: {
      const List = {
        ...state,
        plant: payload.map(plant => {
          const { plant_id, plant_name } = plant;
          return { value: plant_id, inputDisplay: plant_name };
        }),
        ...!payload[0]
      }
      if (init.plant && init.plant?.value) {
        filterDispatcher({ type: ADD_PLANTS, payload: init.plant });
        delete init.plant
      } else
        filterDispatcher({ type: ADD_PLANTS, payload: List.plant[0] });
      return List;
    }
    case ADD_FUNCTIONS: {
      const List = {
        ...state,
        _function: payload.map(_function => {
          const { function_id, function_name } = _function;
          return { value: function_id, inputDisplay: function_name };
        }),
        ...!payload[0]
      }
      if (init._function && init._function?.value) {
        filterDispatcher({ type: ADD_FUNCTIONS, payload: init._function });
        delete init._function
      } else
        filterDispatcher({ type: ADD_FUNCTIONS, payload: List._function[0] });
      return List;
    }
    case ADD_PRODUCTION: {
      const List = {
        ...state,
        production: payload.map(production => {
          console.log(production)
          // const {  production_name } = production;
          return { label:production}
        }),
        ...!payload[0]
      }
      if (init.production && init.production?.label) {
        filterDispatcher({ type: ADD_PRODUCTION, payload: init.production });
        delete init.production
      } else
        filterDispatcher({ type: ADD_PRODUCTION, payload: List.production });
      return List;
    }
    case ADD_STARTDATE: {
      const List = {
        ...state,
        start_date: payload
      }
      filterDispatcher({ type: ADD_STARTDATE, payload: List.start_date });
      return List;
    }
    case ADD_ENDDATE: {
      const List = {
        ...state,
        end_date: payload
      }
      filterDispatcher({ type: ADD_ENDDATE, payload: List.end_date });
      return List;
    }
    case ADD_DRILLDOWNDATA: {
      const List = {
        ...state,
        drilldowndata: payload
      }
      return List;
    }

    default: throw Error(`${type} is not an ACTION`)
  }
}


export {
  reducer,
  initialState
}