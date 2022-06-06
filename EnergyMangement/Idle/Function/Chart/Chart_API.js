import React, { useEffect} from "react";
import Chart from "./Chart";
import {
  EuiLoadingChart,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTitle,
  EuiPanel,

  EuiSpacer
} from "@elastic/eui";

import { useActiveFilter } from '../../../store/Providers';


function Chart_API({ Refresh, FunctionName, energyfunctiontrendFetchHelper, setRefreshdisable }) {

  const [activeFilter] = useActiveFilter();
  const { plant, start_date, end_date } = activeFilter;
  const { response, isloading, error, execute } = energyfunctiontrendFetchHelper;
  useEffect(()=>{
    if(isloading){
        setRefreshdisable(true)
    }else{
        setRefreshdisable(false)
    }
},[isloading])
  useEffect(() => {
    if (plant.value) {
      execute({
        url: `_ems/function/_trend/_all`, data: {
          from: start_date,
          to: end_date,
          plant_id: plant.value,
          metric: 'idle_energy_vs_kwh_all'
        }
      });
    }

  }, [plant.value, start_date, end_date, Refresh])
  //Loader to appear before chart display or before error message
  const Loader = <EuiFlexGroup justifyContent='center' style={{ marginTop: '100px', height: '230px' }}>
    <EuiLoadingChart size="l" />
  </EuiFlexGroup>

  let Data;
  if (!error) {
    if (response) {
      Data = isloading ? Loader : (<Chart FunctionName={FunctionName} data={response} />);
    } else if (!response) {
      Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
        <EuiFlexGroup >
          There is no data available for selected time period
        </EuiFlexGroup>
      </EuiFlexItem>
      );
    }
  }
  else if (error) {
    Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
      <EuiFlexGroup >
        There is no data available for selected time period
      </EuiFlexGroup>
    </EuiFlexItem>
    );
  }

  return (
    <EuiFlexItem>
      <EuiPanel style={{ height: '350px' }} >
        <EuiTitle size="l">
          <EuiText>
            <strong>Idle Energy by Function</strong>
          </EuiText>
        </EuiTitle>
        <EuiSpacer />
        {Data}
      </EuiPanel>
    </EuiFlexItem>
  );
}

export default Chart_API;
