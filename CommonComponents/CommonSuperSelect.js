import React from "react";
import {
  EuiSuperSelect,
} from "@elastic/eui";
// import './CommonSuperSelect.css'

const CommonSuperSelect = (props) => {
  return (
    <>
      <div /* className="euiFormControlLayout--group commonSuperSelect__div" style={{ gap: '0.7rem' }} */>
         
        <EuiSuperSelect
          className="commonSuperSelect"
          fullWidth={true}
          style={{ minWidth: '200px' }}
          disabled={props.isLoading || !props.valueOfSelected}
          {...props}
        />
      </div>
    </>
  )
}
export default CommonSuperSelect