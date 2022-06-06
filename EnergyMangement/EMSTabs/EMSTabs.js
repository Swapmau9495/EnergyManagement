import React, { Fragment, useState, useRef } from "react";
import Filters from "../Filters/Filters";
import SpecificEnergyTab from '../SpecificEnergy/SpecificEnergyTab'
import ProductVariation from '../ProductVariation/ProductVariation'
import EngergyMain from '../Idle/EnergyMain';
import Providers from '../store/Providers';
import PanelMonitoring from "../Panel Monitoring/PanelMonitoring";
import { MemoryRouter as HashRouter, Route, Link, Switch } from "react-router-dom";
import {
  EuiSpacer,
  EuiBreadcrumbs,
  EuiTabbedContent,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTab,
  EuiTabs,
} from "@elastic/eui";
// import Frame from "../../Test/JH_test";


var objs;
const EMSTabs = () => {
  const [selectedTabId, setSelectedTabId] = useState("TotalEnergy");
  const [functionname, setFunctionName] = useState("");
  const [assetname, setAssetName] = useState("");
  const [plantbreacrumb, setPlantbreacrumb] = useState('');


  //useState to Refresh all Components
  const [Refresh, setRefresh] = useState(true)
  //useState to Refresh Button Disable/Enable based on component Loadin 
  const [isRefreshdisable, setRefreshdisable] = useState(false)
  // UseStates to Hide/Unhide Selective filters
  const [hidedropdown, setHidedropdown] = useState(false)
  const [hidecombobx, setHidecombobox] = useState(true)

  const SelectedTabRef = useRef({ isDateFilterActive: true , isComboboxActive:false ,isFunctionDropdownactive:false})
  if (selectedTabId === 'TotalEnergy') {
    SelectedTabRef.current.isDateFilterActive = false
    SelectedTabRef.current.isComboboxActive = false
    SelectedTabRef.current.isFunctionDropdownactive = true


  } else if (selectedTabId === 'SpecificEnergy') {
    SelectedTabRef.current.isDateFilterActive = true
    SelectedTabRef.current.isComboboxActive = false
    SelectedTabRef.current.isFunctionDropdownactive = false

  } else if (selectedTabId === 'IdleEnergy') {
    SelectedTabRef.current.isDateFilterActive = true
    SelectedTabRef.current.isComboboxActive = false
    SelectedTabRef.current.isFunctionDropdownactive = false

  }
  else if (selectedTabId === 'ProductVariation') {
    SelectedTabRef.current.isDateFilterActive = true
    SelectedTabRef.current.isComboboxActive = true
    SelectedTabRef.current.isFunctionDropdownactive = false

  }



  const tabs = [
    {
      id: "TotalEnergy",
      name: "Total Energy",
      disabled: false,
      path: "/",
    },
    {
      id: "SpecificEnergy",
      name: "Specific Energy",
      disabled: false,
      path: "/1",
    },
    {
      id: "IdleEnergy",
      name: "Idle Energy",
      disabled: false,
      path: "/2",
    },
    {
      id: "ProductVariation",
      name: "Product Variation",
      disabled: false,
      path: "/3",
    },

  ];

  const onSelectedTabChanged = (id) => setSelectedTabId(id);
  const TabsList = tabs.map((tab) => (
    <Link key={tab.id} to={tab.path}>
      <EuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
      >
        {tab.name}
      </EuiTab>
    </Link>
  ));


  return (
    <>

      <Providers>
        {/* <EuiBreadcrumbs
          breadcrumbs={breadcrumbs}
          truncate={false}
        /> */}
        <HashRouter>
          <EuiTabs >
            <EuiFlexGroup
              justifyContent="flexEnd"
              alignItems="center"
              style={{ margin: "-10px 0 -10px 0" }}
            >
              <EuiFlexItem style={{ flexDirection: "row" }}>{TabsList}</EuiFlexItem>
            </EuiFlexGroup>
          </EuiTabs>
          <Filters
            setRefresh={setRefresh}
            isRefreshdisable={isRefreshdisable}
            hidedropdown={hidedropdown}
            // hidecombobx={hidecombobx}
            isDateFilterActive={SelectedTabRef.current.isDateFilterActive}
            isComboboxActive={SelectedTabRef.current.isComboboxActive}
            isFunctionDropdownactive={SelectedTabRef.current.isFunctionDropdownactive}
          />
          <Route exact path="/">
            <PanelMonitoring  setHidedropdown={setHidedropdown}/>
          </Route>

          <Route exact path="/1">
            <SpecificEnergyTab setPlantbreacrumb={setPlantbreacrumb} setAssetName={setAssetName} setFunctionName={setFunctionName} setRefreshdisable={setRefreshdisable} setHidedropdown={setHidedropdown} /* setHidecombobox={setHidecombobox} */ Refresh={Refresh} />
          </Route>
          <Route exact path="/2">
            <EngergyMain setPlantbreacrumb={setPlantbreacrumb} setAssetName={setAssetName} setFunctionName={setFunctionName} setRefreshdisable={setRefreshdisable} setHidedropdown={setHidedropdown} /* setHidecombobox={setHidecombobox} */ Refresh={Refresh} />
          </Route>
          <Route exact path="/3">
            <Fragment>
              <ProductVariation  setPlantbreacrumb={setPlantbreacrumb} setAssetName={setAssetName} setFunctionName={setFunctionName} setRefreshdisable={setRefreshdisable} setHidedropdown={setHidedropdown} /* setHidecombobox={setHidecombobox} */ />
              <EuiSpacer size='s' />
            </Fragment>
          </Route>
        </HashRouter>
      </Providers>

    </>
  );
}

export default EMSTabs;






