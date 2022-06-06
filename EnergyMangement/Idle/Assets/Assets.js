import React, { Fragment, useState } from 'react'
import { EuiFlexGroup } from '@elastic/eui'
import Table from './Table/Table'
import Chart_API from './Chart/Chart_API'

const Assets = ({Refresh,assettableFetchHelper,energyassettrendFetchHelper,setRefreshdisable}) => {
    const [AssetNames,setAssetNames]=useState([])

    return (
        <Fragment >
            <EuiFlexGroup justifyContent='center' style={{ paddingTop: '0.3em', paddingLeft: '1em', paddingRight: '1em'  }} >
                <Table setRefreshdisable={setRefreshdisable}  assettableFetchHelper={assettableFetchHelper}     
                     AssetNames={AssetNames}  setAssetNames={setAssetNames} Refresh={Refresh}/>
                <Chart_API setRefreshdisable={setRefreshdisable} energyassettrendFetchHelper={energyassettrendFetchHelper}   AssetNames={AssetNames} Refresh={Refresh} />
            </EuiFlexGroup>
        </Fragment>
    )
}

export default Assets;
