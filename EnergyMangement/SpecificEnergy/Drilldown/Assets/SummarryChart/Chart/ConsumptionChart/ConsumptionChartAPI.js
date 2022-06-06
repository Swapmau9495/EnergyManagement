import React, { useEffect } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingChart,
  EuiPanel,
  EuiTitle,
  EuiText,
  EuiSpacer
} from "@elastic/eui";
import ConsumptionChart from "./ConsumptionChart"
import { useFilterOption } from '../../../../../../store/Providers';

//component to fetch API for shop chart 
const ConsumptionChartAPI = ({ setRefreshdisable, Refresh, energycounsumptionFetchHelper }) => {

  const [filterOptions] = useFilterOption();
  const { start_date, end_date } = filterOptions;
  const { response, isloading, error, execute } = energycounsumptionFetchHelper;
  useEffect(()=>{
    //condition to disable/enable Datepicker
    if(isloading){
        setRefreshdisable(true)
    }else{
        setRefreshdisable(false)
    }
},[isloading])
  const Consumptionchartvalues = () => {
    start_date && end_date && execute({
      url: `_ems/asset/_trend/${filterOptions.drilldowndata.Assetid}`, data: {
        from: start_date,
        to: end_date,
        plant_id: filterOptions.drilldowndata.Plantid,
        function_id: filterOptions.drilldowndata.Functionid,
        metric: 'consumption_vs_idle_energy'
      }
    });

  }
  useEffect(() => {
    Consumptionchartvalues();
  }, [start_date, end_date, Refresh])


  //Loader to appear before chart display or before error message
  const Loader = <EuiFlexGroup justifyContent='center' style={{ marginTop: '75px', height: '230px' }}>
    <EuiLoadingChart size="l" />
  </EuiFlexGroup>

  let Data;
  if (!error) {
    if (response) {
      Data = isloading ? Loader : (<ConsumptionChart props={response} />);
    } else if (!response) {
      Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
        <EuiFlexGroup >
          There is no data available for selected time period
        </EuiFlexGroup>
      </EuiFlexItem>
      );
    }
  } else if (error) {
    Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 75 }}>
      <EuiFlexGroup >
        There is no data available for selected time period
      </EuiFlexGroup>
    </EuiFlexItem>
    );
  }
  return (
    <EuiFlexItem>
      <EuiPanel style={{ height: 300, }}>
        <EuiTitle size="s">
          <EuiText>
            <strong>Energy Consumption Vs  Idle Energy </strong>
          </EuiText>
        </EuiTitle>
        <EuiSpacer />
        {Data}
      </EuiPanel>
    </EuiFlexItem>
  )
}
export default ConsumptionChartAPI;