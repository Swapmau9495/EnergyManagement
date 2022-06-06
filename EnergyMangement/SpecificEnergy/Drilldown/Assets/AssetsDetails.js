import React, { Fragment, useEffect } from "react"; // React module for hooks.
import AssetsMain from './AssetsMain'
import { useFilterOption } from '../../../store/Providers';

const AssetsDetails = ({ Refresh, setHidedropdown, setHidecombobox, setRefreshdisable, setAssetName, setFunctionName, setPlantbreacrumb }) => {
  const [filterOptions] = useFilterOption();
 console.log(filterOptions)
  useEffect(() => {
    //useState to set breadcrumb names 
    setAssetName(filterOptions.drilldowndata.Asset)
    setFunctionName(filterOptions.drilldowndata._Function)
    setPlantbreacrumb(filterOptions.plant[0].inputDisplay)
  }, [])
  return (
    <Fragment>
      <AssetsMain setRefreshdisable={setRefreshdisable} Refresh={Refresh} setHidedropdown={setHidedropdown} setHidecombobox={setHidecombobox} />
    </Fragment>
  )
}



export default AssetsDetails;