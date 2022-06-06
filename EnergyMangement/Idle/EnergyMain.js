import React, { useReducer, createContext ,useState,useEffect} from "react";
// Idle
import Consumption from "./Consumption/Consumption";
import Function from "./Function/Function";
import Assets from "./Assets/Assets";
import useFetch from '../hooks/useFetch';

function EnergyMain({setHidedropdown,Refresh,setRefreshdisable,setFunctionName,setAssetName,setPlantbreacrumb}) {
  useEffect(()=>{
    //useState to hide/unhide filters based on requirement
    setHidedropdown(false)
    //useState for clearning breadcrumb names 
    setFunctionName('')
    setAssetName('')
    setPlantbreacrumb('')
  },[])

  //Usefetch to call APIs
  const idlemetricsFetchHelper = useFetch({ method: "GET", url: '' });
  const idlenergytrendFetchHelper = useFetch({ method: "GET", url: '' });
  const functiontableFetchHelper = useFetch({ method: "GET", url: '' });
  const energyfunctiontrendFetchHelper = useFetch({ method: "GET", url: '' });
  const assettableFetchHelper = useFetch({ method: "GET", url: '' });
  const energyassettrendFetchHelper = useFetch({ method: "GET", url: '' });
  return (
     <>
     
     <Consumption idlemetricsFetchHelper={idlemetricsFetchHelper}
     idlenergytrendFetchHelper={idlenergytrendFetchHelper}
     Refresh={Refresh}
     setRefreshdisable={setRefreshdisable} />
     <Function 
     functiontableFetchHelper={functiontableFetchHelper}
     energyfunctiontrendFetchHelper={energyfunctiontrendFetchHelper}
     Refresh={Refresh}
     setRefreshdisable={setRefreshdisable}
    />
     <Assets
     assettableFetchHelper={assettableFetchHelper}
     energyassettrendFetchHelper={energyassettrendFetchHelper}
     Refresh={Refresh}
     setRefreshdisable={setRefreshdisable}
    />
     </>
  );
}

export default EnergyMain;
