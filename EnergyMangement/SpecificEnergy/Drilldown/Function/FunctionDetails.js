import React, { Fragment, useEffect } from "react"; // React module for hooks.
import FunctionMain from './FunctionMain'
import { useFilterOption } from '../../../store/Providers';

const FunctionDetails = ({ setHidedropdown, Refresh,  setRefreshdisable, setFunctionName, setPlantbreacrumb, setAssetName }) => {
  const [filterOptions] = useFilterOption();

  useEffect(() => {
    //useState to set breadcrumb names 
    setFunctionName(filterOptions.drilldowndata._Function)
    // setPlantbreacrumb(filterOptions.plant[0].inputDisplay)
    setAssetName('')
  }, [])
  return (
    <Fragment>
      <FunctionMain setRefreshdisable={setRefreshdisable} Refresh={Refresh} setHidedropdown={setHidedropdown} />
    </Fragment>
  )
}



export default FunctionDetails;