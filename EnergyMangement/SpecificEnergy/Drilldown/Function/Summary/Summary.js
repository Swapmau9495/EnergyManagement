import React, { Fragment, useEffect } from 'react';
import { EuiStat, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiSpacer } from '@elastic/eui';
import { useFilterOption } from '../../../../store/Providers';

const Summary = ({ Refresh,summarryFetchHelper,setRefreshdisable }) => {

    const [filterOptions] = useFilterOption();
    const {  start_date,end_date } = filterOptions;
    const {response, isloading,  execute} = summarryFetchHelper;
    useEffect(()=>{
     //condition to disable/enable Datepicker
        if(isloading){
            setRefreshdisable(true)
        }else{
            setRefreshdisable(false)
        }
    },[isloading])
    useEffect(() => {
 
          execute({ url: `_ems/function/${filterOptions.drilldowndata.Functionid}`,  data: {
                       from: start_date,
                        to: end_date,  
                    }});
    }, [start_date,end_date,Refresh]);

    return (
        <Fragment>
            <EuiFlexGroup style={{ padding: '1.5em', paddingRight: "2.1rem", paddingLeft: "2.5rem", }}>
                <EuiPanel style={{ width: 350 }} grow={false} >
                    <EuiFlexItem grow={false} >
                        <EuiSpacer size='s' />
                        <EuiStat  title={response?.total_consumption ? <b>{Number(parseFloat(response?.total_consumption / 1000).toFixed(1)).toLocaleString('en', {
                            minimumFractionDigits: 1
                        })}</b> : '-'}
                            titleSize='l'
                            description="Consumption (MWh)"
                            descriptionElement="h4"
                            textAlign='left'
                            isLoading={isloading}
                        />
                    </EuiFlexItem>
                </EuiPanel>
                <EuiFlexItem />
                <EuiPanel style={{ width: 350, height: 125 }} grow={false} >
                    <EuiFlexItem grow={false} >
                        <EuiSpacer size='s' />
                        <EuiStat title={response?.percent_of_total ? <b>{Number(parseFloat(response?.percent_of_total).toFixed(1)).toLocaleString('en', {
                            minimumFractionDigits: 1
                        })+'%'}</b> : '-'}
                            titleSize='l'
                            description="% of Plant"
                            descriptionElement="h4"
                            textAlign='left'
                            isLoading={isloading}
                        />
                    </EuiFlexItem>
                </EuiPanel>
                <EuiFlexItem />
                <EuiPanel style={{ width: 350 }} grow={false} >
                    <EuiFlexItem grow={false}>
                        <EuiSpacer size='s' />
                        <EuiStat title={response?.kwh_per_unit ? <b>{Number(parseFloat(response?.kwh_per_unit).toFixed(1)).toLocaleString('en', {
                            minimumFractionDigits: 1
                        })}</b> : '-'}
                            titleSize='l'
                            description="Specific Energy (kWh/ton)"
                            descriptionElement="h4"
                            textAlign='left'
                            isLoading={isloading}
                        />
                    </EuiFlexItem>
                </EuiPanel>
                <EuiFlexItem />
                <EuiPanel style={{ width: 350 }} grow={false} >
                    <EuiFlexItem grow={false}>
                        <EuiSpacer size='s' />
                        <EuiStat title={response?.no_of_assets?<b>{response?.no_of_assets}</b>:'-'}
                            titleSize='l'
                            description="No. of Assets"
                            descriptionElement="h4"
                            textAlign='left'
                            isLoading={isloading}
                        />
                    </EuiFlexItem>
                </EuiPanel>
            </EuiFlexGroup>
        </Fragment>
    );
}

export default Summary;