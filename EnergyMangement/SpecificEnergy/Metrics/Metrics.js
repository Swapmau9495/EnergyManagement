import React, { Fragment, useEffect } from 'react';
import { EuiStat, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiSpacer } from '@elastic/eui';
import { useActiveFilter } from '../../store/Providers';

const Matrics = ({ Refresh,metricsFetchHelper,setRefreshdisable }) => {
    const [activeFilter] = useActiveFilter();
    const {  plant,start_date,end_date } = activeFilter;
    const {response, isloading,  execute} = metricsFetchHelper;

    useEffect(()=>{
        //condition to disable/enable Datepicker
        if(isloading){
            setRefreshdisable(true)
        }else{
            setRefreshdisable(false)
        }
    },[isloading])
    useEffect(() => {
      if (plant.value )
          execute({ url: `_ems/plant/${plant.value}`,  data: {
                       from:start_date,
                       to:end_date
                    }});
    }, [plant.value,start_date,end_date,Refresh]);

    return (
        <Fragment>
            <EuiFlexGroup style={{ padding: "1.5em",paddingLeft:"2.5rem", paddingRight:"2.1rem" }}>
                <EuiFlexItem />
                <EuiPanel style={{ width: 350, height: 125 }} grow={false} >
                    <EuiFlexItem grow={false} >
                        <EuiSpacer size='s' />
                        <EuiStat 
                        title={response?.total_consumption ?  <b>{Number(parseFloat(response?.total_consumption / 1000).toFixed(1)).toLocaleString('en', {
                            minimumFractionDigits: 1
                        })}</b> : '-'}
                            titleSize='l'
                            descriptionElement="h4"
                            description="Total Consumption (MWh)"
                            textAlign='left'
                            isLoading={isloading}
                        />
                    </EuiFlexItem>
                </EuiPanel>
                <EuiFlexItem />
                <EuiPanel style={{ width: 350, height: 125 }} grow={false} >
                    <EuiFlexItem grow={false} >
                        <EuiSpacer size='s' />
                        <EuiStat title={response?.total_production ? <b>{Number(parseFloat(response?.total_production / 1000).toFixed(1)).toLocaleString('en', {
                            minimumFractionDigits: 1
                        }) + 'K'}</b> : '-'}
                            titleSize='l'
                            descriptionElement="h4"
                            description="Total Production (tons)"
                            textAlign='left'
                            isLoading={isloading}
                        />
                    </EuiFlexItem>
                </EuiPanel>
                <EuiFlexItem />
                <EuiPanel style={{ width: 350, height: 125 }} grow={false} >
                    <EuiFlexItem grow={false}>
                        <EuiSpacer size='s' />
                        <EuiStat title={response?.kwh_per_unit ? <b>{Number(parseFloat(response?.kwh_per_unit).toFixed(1)).toLocaleString('en', {
                            minimumFractionDigits: 1
                        })}</b> : '-'}
                            titleSize='l'
                            descriptionElement="h4"
                            description="Specific Energy (kWh/ton)"
                            textAlign='left'
                            isLoading={isloading}
                        />
                    </EuiFlexItem>
                </EuiPanel>
                <EuiFlexItem />
            </EuiFlexGroup>
        </Fragment>
    );
}
export default Matrics;