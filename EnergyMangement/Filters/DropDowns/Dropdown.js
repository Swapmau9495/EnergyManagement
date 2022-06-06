import React, { Fragment, useEffect } from 'react'
import CommonSuperSelect from '../../../CommonComponents/CommonSuperSelect';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import { ADD_SITES, ADD_PLANTS, ADD_FUNCTIONS } from '../../store/actionTypes';
import { useActiveFilter, useFilterOption } from '../../store/Providers';
import useFetch from '../../hooks/useFetch';

// import { cacheFilter } from '../utils';

function Dropdown({ isFunctionDropdownactive }) {
  const [filterOptions, fetchHelpers, dispatch] = useFilterOption();
  const [activeFilter, filterDispatcher] = useActiveFilter();
  const { siteFetchHelper, plantFetchHelper } = fetchHelpers;
  const { isloading: siteLoading } = siteFetchHelper;
  const { isloading: plantLoading, execute } = plantFetchHelper;
  const { isloading: functionLoading, execute: functionexecute } = useFetch({ method: 'GET', url: '' });


  useEffect(() => {
    activeFilter.site.value && execute({
      url: `_config/plants/_list`, data: { site_id: activeFilter.site.value }, success(data) {
        dispatch({ type: ADD_PLANTS, payload: data, filterDispatcher });
      },
      error(err) {
        dispatch({ type: ADD_PLANTS, payload: [], filterDispatcher });
      }
    })
  }, [activeFilter.site.value])

  useEffect(() => {

    activeFilter.plant.value && functionexecute({
      url: `_config/functions/_list`, data: { plant_id: activeFilter.plant.value }, success(data) {
        dispatch({ type: ADD_FUNCTIONS, payload: data, filterDispatcher });
      },
      error(err) {
        dispatch({ type: ADD_FUNCTIONS, payload: [], filterDispatcher });
      }
    })
  }, [activeFilter.plant.value])

  return (
    <Fragment>
      <EuiFlexGroup gutterSize="l">
        <EuiFlexItem grow={false}>
          <CommonSuperSelect
            prepend="Site"
            valueOfSelected={activeFilter.site.value}
            isLoading={siteLoading}
            onChange={(value) => filterDispatcher({
              type: ADD_SITES,
              payload: filterOptions.site.find(e => e.value === value)
            })}
            options={filterOptions.site}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <CommonSuperSelect
            prepend="Plant"
            valueOfSelected={activeFilter.plant.value}
            isLoading={plantLoading}
            onChange={(value) => filterDispatcher({
              type: ADD_PLANTS,
              payload: filterOptions.plant.find(e => e.value === value)
            })}
            options={filterOptions.plant}
          />
        </EuiFlexItem>
        {

          isFunctionDropdownactive && <EuiFlexItem grow={false}>
            <CommonSuperSelect
              prepend="Function"
              valueOfSelected={activeFilter._function.value}
              isLoading={functionLoading}
              onChange={(value) => filterDispatcher({
                type: ADD_FUNCTIONS,
                payload: filterOptions._function.find(e => e.value === value)
              })}
              options={filterOptions._function}
            />
          </EuiFlexItem>
        }
      </EuiFlexGroup>
    </Fragment>
  )
}
export default Dropdown