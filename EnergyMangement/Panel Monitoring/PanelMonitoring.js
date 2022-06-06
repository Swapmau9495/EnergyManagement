import React, { Fragment, useReducer, createContext, useState, useEffect } from 'react'
import PanelsMain from './Panels/PanelsMain';

const PanelMonitoring = ({setHidedropdown}) => {
    useEffect(()=>{
        //useState to hide/unhide filters based on requirement
        setHidedropdown(false)
        //useState for clearning breadcrumb names 
  
      },[])

    //useFetch for API Calls
    return <Fragment>
        <PanelsMain />
    </Fragment>
}

export default PanelMonitoring;
