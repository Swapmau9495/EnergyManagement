import React, { Fragment } from 'react'
import { EuiPanel, EuiSpacer, EuiText, EuiTitle } from '@elastic/eui'
import EPChartAPI from './EPChart/EPChartAPI'
const chart = ({Refresh,EPchartFetchHelper,setRefreshdisable}) => {
    return <Fragment>
        <div style={{ padding: "0.9em", marginTop:'-25px'}} >
            <EuiPanel style={{ height: 410 }} grow={false} >
                <EuiTitle size="s">
                    <EuiText>
                        <strong>  Production Vs Specific Energy</strong>
                    </EuiText>
                </EuiTitle>
                <EuiSpacer />
                <EPChartAPI setRefreshdisable={setRefreshdisable} EPchartFetchHelper={EPchartFetchHelper} Refresh={Refresh}/>
            </EuiPanel>
        </div>
    </Fragment>
}

export default chart;
