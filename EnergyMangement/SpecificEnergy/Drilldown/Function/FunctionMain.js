import React, { Fragment, useState, useEffect } from 'react'
import Summary from './Summary/Summary'
import SubNav from './SubMenu/SubNav/SubNav'
import ChartsMain from './Charts/ChartsMain'
import useFetch from '../../../hooks/useFetch';
import { useFilterOption } from '../../../store/Providers';

const FunctionMain = ({ Refresh, setHidedropdown, setRefreshdisable }) => {
        const [filterOptions,] = useFilterOption();
        useEffect(() => {
                //useState to hide/unhide filters based on requirement
                setHidedropdown(true)
        }, [])

        //UseFetch for API calls
        const summarryFetchHelper = useFetch({ method: "GET", url: '' });
        const counsumptionFetchHelper = useFetch({ method: "GET", url: '' });
        const EPchart2FetchHelper = useFetch({ method: "GET", url: '' });
        const allassettablefetchhelper = useFetch({ method: "GET", url: '' });
        const allpaneltablefetchhelper = useFetch({ method: "GET", url: '' });

        return (
                <Fragment>
                        <Summary setRefreshdisable={setRefreshdisable} summarryFetchHelper={summarryFetchHelper} Refresh={Refresh} />
                        <ChartsMain setRefreshdisable={setRefreshdisable} counsumptionFetchHelper={counsumptionFetchHelper} EPchart2FetchHelper={EPchart2FetchHelper} Refresh={Refresh} />
                        <SubNav setRefreshdisable={setRefreshdisable} allassettablefetchhelper={allassettablefetchhelper} allpaneltablefetchhelper={allpaneltablefetchhelper} Refresh={Refresh} />
                </Fragment>
        )
}

export default FunctionMain;
