import React, {Fragment} from 'react'
import ConsumptionChartAPI from './ConsumptionChart/ConsumptionChartAPI'
const ConsumptionChartMain=({setUpdateChart,fromDate,toDate,setRefreshdisable ,Refresh,energycounsumptionFetchHelper})=>{
    return <Fragment>
            <ConsumptionChartAPI energycounsumptionFetchHelper={energycounsumptionFetchHelper} setRefreshdisable={setRefreshdisable} fromDate={fromDate} toDate={toDate} Refresh={Refresh} />
    </Fragment>
}

export default ConsumptionChartMain;
