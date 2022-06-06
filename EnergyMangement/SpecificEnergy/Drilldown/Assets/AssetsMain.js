import React, { Fragment, useState, useEffect } from 'react'
import Gauge from './Gauge/GaugeChartMain'
import SummaryChart from './SummarryChart/SummaryChart.js';
import useFetch from '../../../hooks/useFetch';

const AssetMain = ({ Refresh, setHidedropdown, previousPageData, setRefreshdisable }) => {
        useEffect(() => {
                //useState to hide/unhide filters based on requirement
                setHidedropdown(true)
        }, [])

        //UseFetch for API calls
        const summarryFetchHelper = useFetch({ method: "GET", url: '' });
        const energycounsumptionFetchHelper = useFetch({ method: "GET", url: '' });
        const gaugeFetchHelper = useFetch({ method: "GET", url: '' });
        return (
                <Fragment>
                        <SummaryChart setRefreshdisable={setRefreshdisable} summarryFetchHelper={summarryFetchHelper} energycounsumptionFetchHelper={energycounsumptionFetchHelper} Refresh={Refresh} previousPageData={previousPageData} />
                        <Gauge setRefreshdisable={setRefreshdisable} gaugeFetchHelper={gaugeFetchHelper} Refresh={Refresh} previousPageData={previousPageData} />
                </Fragment>
        )
}

export default AssetMain;
