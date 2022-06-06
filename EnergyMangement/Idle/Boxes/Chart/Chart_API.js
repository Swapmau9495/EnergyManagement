import React, { useEffect} from "react";
import Chart from "./Chart";
import {
  EuiFlexItem,
  EuiText,
  EuiPanel,
  EuiFlexGroup,
  EuiTitle,
  EuiLoadingChart,
 
  EuiSpacer
} from "@elastic/eui";

import { useActiveFilter } from '../../../store/Providers';

function Chart_API({Refresh,idlenergytrendFetchHelper,setRefreshdisable}) {
  const [activeFilter] = useActiveFilter();
  const {  plant,start_date,end_date } = activeFilter;
  const {response, isloading, error, execute} = idlenergytrendFetchHelper;
  useEffect(()=>{
    if(isloading){
        setRefreshdisable(true)
    }else{
        setRefreshdisable(false)
    }
},[isloading])
  useEffect(() => {
    if (plant.value ){
      execute({ url: `_ems/plant/_trend/${plant.value}`,  data: {
                   from:start_date,
                   to:end_date,
                   metric:'idle_energy_trend',
                }});
}

  }, [plant.value,start_date,end_date,Refresh])

  //Loader to appear before chart display or before error message
  const Loader = <EuiFlexGroup justifyContent='center' style={{ marginTop: '50px', height: '230px' }}>
    <EuiLoadingChart size="l" />
  </EuiFlexGroup>
  let Data;
  if (!error) {
    if(response){
      Data = isloading ? Loader : (<Chart data={response} />);
    } else if(!response){
      Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
      <EuiFlexGroup >
      There is no data available for selected time period
      </EuiFlexGroup>
    </EuiFlexItem>
    );
    }
  }
  else if (error) {
    Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 50 }}>
      <EuiFlexGroup >
      There is no data available for selected time period
      </EuiFlexGroup>
    </EuiFlexItem>
    );
  }

  return (
    <EuiFlexItem>
      <EuiPanel style={{ height: 230 }}>
        <EuiTitle size="s">
          <EuiText>
            <strong>Idle Energy Trend</strong>
          </EuiText>
        </EuiTitle>
        <EuiSpacer />
        {Data}
      </EuiPanel>
    </EuiFlexItem>
  );
}

export default Chart_API;
