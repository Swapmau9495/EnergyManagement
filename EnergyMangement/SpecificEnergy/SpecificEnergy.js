import React, { Fragment, useEffect } from 'react'
import Chart from './Chart/Chart'
import Matrics from './Metrics/Metrics'
import SubNav from './SubMenu/SubNav/SubNav'
import useFetch from '../hooks/useFetch';
import ConsumptionTrendAPI from './ConsumptionTrend/ConsumptionTrendAPI';
const SpecificEnergy = ({ Refresh, setHidedropdown, setUpdatemetrics, setRefreshdisable, setFunctionName, setAssetName, setPlantbreacrumb }) => {
  useEffect(() => {
    //useState to hide/unhide filters based on requirement
    // setHidecombobox(true)
    setHidedropdown(false)
    //useState for clearning breadcrumb names 
    setFunctionName('')
    setAssetName('')
    setPlantbreacrumb('')
  }, [])

  //UseFetch for API calls
  const metricsFetchHelper = useFetch({ method: "GET", url: '' });
  const EPchartFetchHelper = useFetch({ method: "GET", url: '' });
  const FunctiontabFetchHelper = useFetch({ method: "GET", url: '' });
  const AssettabFetchHelper = useFetch({ method: "GET", url: '' });
  const counsumptiontrendFetchHelper = useFetch({ method: "GET", url: '' });
  return <Fragment>
    <Matrics setRefreshdisable={setRefreshdisable} setUpdatemetrics={setUpdatemetrics} metricsFetchHelper={metricsFetchHelper} Refresh={Refresh} />
    <ConsumptionTrendAPI setRefreshdisable={setRefreshdisable} counsumptiontrendFetchHelper={counsumptiontrendFetchHelper} Refresh={Refresh} />
    <Chart setRefreshdisable={setRefreshdisable} EPchartFetchHelper={EPchartFetchHelper} Refresh={Refresh} />
    <SubNav setRefreshdisable={setRefreshdisable} FunctiontabFetchHelper={FunctiontabFetchHelper} AssettabFetchHelper={AssettabFetchHelper} Refresh={Refresh} />
  </Fragment>
}

export default SpecificEnergy;
