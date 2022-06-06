import React, { Fragment, useReducer, createContext,useState,useEffect } from 'react'
import BenchMarkTable from './Table/Table';
import useFetch from '../hooks/useFetch';

// export const BenchValuesContext = createContext("");
// const initialState = {
//   siteValue: '',
//   plantValue: '',
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATED_INPUT":
//       return action.data;
//     default:
//       return initialState;
//   }
// }

const ProductVariation = ({isComboboxActive,setHidedropdown,setHidecombobox,setRefreshdisable,setFunctionName,setAssetName,setPlantbreacrumb}) => {
  const [Refresh, setRefresh] = useState(true)
  const [sameplant,setsameplant]=useState(true)
  // const [state, Dispatch] = useReducer(reducer, initialState);
  const [updatbenchtable,setUpdatebenchtable]=useState(false)
  useEffect(()=>{
    //useState to hide/unhide filters based on requirement
    // setHidecombobox(false)
    setHidedropdown(false)
   //useState for clearning breadcrumb names 
    setFunctionName('')
    setAssetName('')
    setPlantbreacrumb('')
  },[])
  //useFetch for API Calls
  const ProductionFetchHelper = useFetch({ method: "GET", url: '' });
  return <Fragment>
    {/* <BenchValuesContext.Provider value={{ state, Dispatch }}> */}
      {/* <Filters updatbenchtable={updatbenchtable} setsameplant={setsameplant} sameplant={sameplant} setRefresh={setRefresh} /> */}
      <BenchMarkTable setRefreshdisable={setRefreshdisable} setUpdatebenchtable={setUpdatebenchtable} ProductionFetchHelper={ProductionFetchHelper} sameplant={sameplant} Refresh={Refresh} />
    {/* </BenchValuesContext.Provider> */}
  </Fragment>
}

export default ProductVariation;
