import React, { Fragment, useContext } from 'react'
import { EuiFlexGroup } from '@elastic/eui'
import Chart_API from './Chart/Chart_API';
import Metrics from './Metrics/Metrics';

const Boxes = ({Refresh,idlemetricsFetchHelper,idlenergytrendFetchHelper,setRefreshdisable}) => {
    return (
        <Fragment >
            <EuiFlexGroup justifyContent='center' style={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }} >
                <Metrics setRefreshdisable={setRefreshdisable} idlemetricsFetchHelper={idlemetricsFetchHelper}  Refresh={Refresh} />
                <Chart_API setRefreshdisable={setRefreshdisable} idlenergytrendFetchHelper={idlenergytrendFetchHelper} Refresh={Refresh} />
            </EuiFlexGroup>
        </Fragment>
    )
}

export default Boxes;
