import React, { Fragment, useState } from 'react'
import { EuiPanel, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import Table from './Table/Table'
import Chart_API from './Chart/Chart_API'

const Function = ({Refresh,functiontableFetchHelper,energyfunctiontrendFetchHelper,setRefreshdisable}) => {
    const [FunctionName,setFunctionName]=useState([])

    return (
        <Fragment >
            <EuiFlexGroup justifyContent='center' style={{ paddingTop: '0.3em', paddingLeft: '1em', paddingRight: '1em' }} >
                <Table setRefreshdisable={setRefreshdisable} functiontableFetchHelper={functiontableFetchHelper}  FunctionName={FunctionName} setFunctionName={setFunctionName} Refresh={Refresh} />
                <Chart_API setRefreshdisable={setRefreshdisable} energyfunctiontrendFetchHelper={energyfunctiontrendFetchHelper} FunctionName={FunctionName} Refresh={Refresh}  />
            </EuiFlexGroup>
        </Fragment>
    )
}

export default Function;
