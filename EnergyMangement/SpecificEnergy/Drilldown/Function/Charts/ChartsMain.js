import React, {Fragment} from 'react'
import { EuiFlexGroup,} from '@elastic/eui'
import ConsumptionChartAPI from './ConsumptionChart/ConsumptionChartAPI'
import ProdkWhChartAPI from './ProdkWhChart/ProdkWhChartAPI'
const ChartMain=({previousPageData,fromDate, toDate , Refresh,setUpdateChart,setupdateEPtab,counsumptionFetchHelper,EPchart2FetchHelper,setRefreshdisable})=>{
    return <Fragment>
        {/* <div style={{ marginTop: '25px', marginLeft:'25px', marginRight:'25px'}}> */}
        {/* <EuiFlexGroup style={{  padding: "0.9em", paddingTop:'-30px' }} > */}
            <ConsumptionChartAPI setRefreshdisable={setRefreshdisable} counsumptionFetchHelper={counsumptionFetchHelper} setUpdateChart={setUpdateChart} fromDate={fromDate} toDate={toDate} Refresh={Refresh}  previousPageData={previousPageData}/>
            <ProdkWhChartAPI setRefreshdisable={setRefreshdisable} EPchart2FetchHelper={EPchart2FetchHelper} setupdateEPtab={setupdateEPtab} fromDate={fromDate} toDate={toDate} Refresh={Refresh} previousPageData={previousPageData}/>
        {/* </EuiFlexGroup> */}
        {/* </div> */}
    </Fragment>
}

export default ChartMain;
