import React, { Fragment, useState, useEffect } from 'react'
import Chart from './Gaugechart/GaugeChart'
import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiText } from '@elastic/eui';
// import '../../../../GaugeLoader.css';
import { useFilterOption } from '../../../../store/Providers';

const GaugeChart = ({ setRefreshdisable, previousPageData, Refresh, gaugeFetchHelper }) => {
  const [avgcurrentvalue, setAvgcurrentvalue] = useState(0)
  const [avgPowervalue, setAvgPowervalue] = useState(0)
  const [unit, setUnit] = useState('')
  const [powerunit, setPowerunit] = useState('')
  const [filterOptions] = useFilterOption();
  const { start_date,end_date } = filterOptions;
  const {  isloading, error, execute } = gaugeFetchHelper;
  useEffect(()=>{
   //condition to disable/enable Datepicker
    if(isloading){
        setRefreshdisable(true)
    }else{
        setRefreshdisable(false)
    }
},[isloading])


  useEffect(() => {
    //Set Guage values to 0 initially
    setAvgcurrentvalue(0)
    setAvgPowervalue(0)
    setUnit('')
    setPowerunit('')
    start_date && end_date &&  execute({
      url: `_ems/asset/${filterOptions.drilldowndata.Assetid}`, data: {
        from: start_date,
        to: end_date,
        plant_id: filterOptions.drilldowndata.Plantid,
        function_id: filterOptions.drilldowndata.Functionid
      },
      success: function (data) {
          setUnit(data?.current_unit)
          setAvgcurrentvalue(data.avg_current ? data?.avg_current : 0)
          setPowerunit(data?.power_unit)
          setAvgPowervalue(data.avg_power ? data?.avg_power : 0)
      }
    });
  }, [start_date, end_date, Refresh]);

  return (
    <Fragment>
      <EuiFlexGroup gutterSize='m' style={{
        padding: "0.9em", paddingTop: '0.45em'
      }} >
        <EuiFlexItem >
          <EuiPanel    >
            <EuiText style={{ fontWeight: 'bold', }}>Avg Current</EuiText>
            {
              isloading ?
                <EuiFlexGroup justifyContent='center' alignItems='center' style={{ height: '280px' }}>
                  <EuiFlexItem grow={false}>
                    {/* <EuiLoadingChart size="l" /> */}
                    {/* <span>Loading...</span> */}
                    <div className="gauge-loader"></div>
                  </EuiFlexItem>
                </EuiFlexGroup>
                : error ?
                  <EuiFlexGroup justifyContent='center' alignItems='center' style={{ height: '280px' }}>
                    <EuiFlexItem grow={false}>
                      <EuiText>There is no data available for selected time period</EuiText>
                    </EuiFlexItem>
                  </EuiFlexGroup> :
                  <Chart
                    // isChartLoading={isChartLoading}
                    // onLoadChange={setChartLoadingHandler}
                    avgcurrentvalue={avgcurrentvalue}
                    unit={unit}
                    // avgPowervalue={avgPowervalue}
                    // powerunit={powerunit}
                    Refresh={Refresh}
                    // previousPageData={previousPageData}
                    fromDate={start_date}
                    toDate={end_date}
                    id='Avg_Current'
                  />}


          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem >
          <EuiPanel  >
            <EuiText style={{ fontWeight: 'bold', }}>Avg Power</EuiText>
            {
              isloading ?
                <EuiFlexGroup justifyContent='center' alignItems='center' style={{ height: '280px' }}>
                  <EuiFlexItem grow={false}>
                    {/* <EuiLoadingChart size="l" /> */}
                    {/* <span>Loading...</span> */}
                    <div className="gauge-loader"></div>
                  </EuiFlexItem>
                </EuiFlexGroup>
                : error ?
                  <EuiFlexGroup justifyContent='center' alignItems='center' style={{ height: '280px' }}>
                    <EuiFlexItem grow={false}>
                      <EuiText>There is no data available for selected time period</EuiText>
                    </EuiFlexItem>
                  </EuiFlexGroup> :
                  <Chart
                    // isChartLoading={isChartLoading}
                    // onLoadChange={setChartLoadingHandler}
                    // avgcurrentvalue={avgcurrentvalue}
                    // unit={unit}
                    avgPowervalue={avgPowervalue}
                    powerunit={powerunit}
                    Refresh={Refresh}
                    // previousPageData={previousPageData}
                    fromDate={start_date}
                    toDate={end_date}
                    id='Avg_Power'
                  />}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup >
    </Fragment>
  )
}
export default GaugeChart