import React, { Fragment } from 'react'
import { EuiFlexGroup } from '@elastic/eui'
import Chart from './Chart/Chart';
import Summary from './Summary/Summary';

const SummaryChart = ({setRefreshdisable,fromDate,toDate,previousPageData,Refresh,summarryFetchHelper,energycounsumptionFetchHelper}) => {
    return (
        <Fragment >
            <EuiFlexGroup justifyContent='center' gutterSize='m' style={{ paddingLeft: "0.9em",paddingTop: "0.9em",paddingRight: "0.9em"
         }} >
                <Summary summarryFetchHelper={summarryFetchHelper}  setRefreshdisable={setRefreshdisable} fromDate={fromDate} toDate={toDate} Refresh={Refresh} previousPageData={previousPageData} />
                <Chart energycounsumptionFetchHelper={energycounsumptionFetchHelper} setRefreshdisable={setRefreshdisable} fromDate={fromDate} toDate={toDate} Refresh={Refresh} previousPageData={previousPageData} />
            </EuiFlexGroup>
        </Fragment>
    )
}

export default SummaryChart;
