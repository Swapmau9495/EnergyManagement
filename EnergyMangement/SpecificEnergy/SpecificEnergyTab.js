import React from 'react'
import { HashRouter, Route } from "react-router-dom";
import AssetDetails from './Drilldown/Assets/AssetsDetails'
import SpecificEnergy from './SpecificEnergy'
import FunctionDetails from './Drilldown/Function/FunctionDetails'
import history from './history';
/* used react router for drilldown pages*/
const SpecificEnergyTab = ({ setHidedropdown, Refresh,setRefreshdisable,setFunctionName,setPlantbreacrumb,setAssetName }) => {
    /* used Hashrouter so Page wont get reloaded */
    return <HashRouter history={history}>
        <Route exact path="/">
            <SpecificEnergy setPlantbreacrumb={setPlantbreacrumb} setAssetName={setAssetName} setFunctionName={setFunctionName} setRefreshdisable={setRefreshdisable}   Refresh={Refresh} setHidedropdown={setHidedropdown} />
        </Route>
        <Route exact path="/ShopDetails">
            <FunctionDetails setPlantbreacrumb={setPlantbreacrumb} setAssetName={setAssetName} setFunctionName={setFunctionName} setRefreshdisable={setRefreshdisable}  Refresh={Refresh} setHidedropdown={setHidedropdown} />
        </Route>
        <Route exact path="/AssetDetails">
            <AssetDetails setFunctionName={setFunctionName} setPlantbreacrumb={setPlantbreacrumb} setAssetName={setAssetName}  setRefreshdisable={setRefreshdisable} Refresh={Refresh} setHidedropdown={setHidedropdown} />
        </Route>
    </HashRouter>
}

export default SpecificEnergyTab;