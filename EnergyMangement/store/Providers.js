import React, { createContext, useReducer, useContext } from 'react';
import { ADD_SITES } from './actionTypes';
import { FilterDetails } from '../../../../App';
import { filterReducer, filterInitialState } from './FiltersReducer';
import { reducer, initialState } from './FilterOptionReducer';
import useFetch from '../hooks/useFetch';

const FilterOptionContext = createContext();
const ActiveFilterContext = createContext();

export const useFilterOption = () => useContext(FilterOptionContext);
export const useActiveFilter = () => useContext(ActiveFilterContext);

const Providers = (props) => {
  const [filterOptions, dispatch] = useReducer(reducer, initialState);
  const [activeFilter, filterDispatcher] = useReducer(filterReducer, filterInitialState);

  const siteFetchHelper = useFetch({
    method: 'GET', url: '_config/sites/_list', success(data) {
      dispatch({ type: ADD_SITES, payload: data, filterDispatcher, init: FilterDetails });
    },
    error(err) {
      dispatch({ type: ADD_SITES, payload: [], filterDispatcher });
    }
  });
  
  const plantFetchHelper = useFetch({ method: 'GET', url: '' });
  const productionFetchHelper = useFetch({ method: 'GET', url: '' });
  const functionFetchHelper = useFetch({ method: 'GET', url: '' });

  const fetchHelpers = {
    siteFetchHelper, plantFetchHelper, functionFetchHelper, productionFetchHelper
  }

  return (
    <FilterOptionContext.Provider value={[filterOptions, fetchHelpers, dispatch]}>
      <ActiveFilterContext.Provider value={[activeFilter, filterDispatcher]}>
        {props.children}
      </ActiveFilterContext.Provider>
    </FilterOptionContext.Provider>
  )
}

export default Providers;