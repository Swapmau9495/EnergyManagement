import React, { Fragment, useEffect } from 'react';
import { EuiStat, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiSpacer } from '@elastic/eui';
import { useFilterOption } from '../../../../../store/Providers';

const AssetsSummary = ({ Refresh, summarryFetchHelper,setRefreshdisable }) => {
  const [filterOptions] = useFilterOption();
  const { start_date, end_date } = filterOptions;
  const { response, isloading, execute } = summarryFetchHelper;
  useEffect(()=>{
        //condition to disable/enable Datepicker

    if(isloading){
        setRefreshdisable(true)
    }else{
        setRefreshdisable(false)
    }
},[isloading])
  useEffect(() => {
    start_date && end_date && execute({
      url: `_ems/asset/${filterOptions.drilldowndata.Assetid}`, data: {
        from: start_date,
        to: end_date,
        plant_id: filterOptions.drilldowndata.Plantid,
        function_id: filterOptions.drilldowndata.Functionid
      }
    });
  }, [start_date, end_date, Refresh]);

  return (
    <Fragment>
      <EuiFlexItem style={{ maxWidth: '550px' }} >
        <EuiPanel style={{ paddingTop: '120px' }}>

          <EuiFlexGroup gutterSize='s' >
            <EuiFlexItem >
              <EuiStat title={response?.total_consumption ? Number(parseFloat(response?.total_consumption / 1000).toFixed(1)).toLocaleString('en', {
                minimumFractionDigits: 1
              }) : '-'}
                titleSize='l'
                description="Consumption (MWh)"
                descriptionElement="h4"
                textAlign='center'
                isLoading={isloading}
                // descriptionElement='div'
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat title={response?.idle_energy ? Number(parseFloat(response?.idle_energy / 1000).toFixed(1)).toLocaleString('en', {
                minimumFractionDigits: 1
              }) : '-'}
                titleSize='l'
                description="Idle Energy (MWh)"
                descriptionElement="h4"
                textAlign='center'
                isLoading={isloading}
                // descriptionElement='div'
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat title={response?.idle_energy_percent ? Number(parseFloat(response?.idle_energy_percent).toFixed(1)).toLocaleString('en', {
                minimumFractionDigits: 1
              }) + '%' : '-'}
                titleSize='l'
                description="Idle %"
                descriptionElement="h4"
                textAlign='center'
                isLoading={isloading}
                // descriptionElement='div'
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size='l' />
        </EuiPanel>
      </EuiFlexItem>
    </Fragment>
  );

}

export default AssetsSummary;