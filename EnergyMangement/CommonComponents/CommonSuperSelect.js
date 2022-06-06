import React from "react";
import {
  EuiSuperSelect,
} from "@elastic/eui";
// import './CommonSuperSelect.css'

const CommonSuperSelect = (props) => {
  return (
    <>
      <div className="euiFormControlLayout--group commonSuperSelect__div" style={{ gap: '0.7rem' }}>
        {/* <label className="commonSuperSelect__prepend euiFormLabel euiFormControlLayout__prepend"
          htmlFor={`Input_value${props.valueOfSelected}`}
        >
          {props.prepend}
        </label> */}
        <EuiSuperSelect
          // className="commonSuperSelect"
          fullWidth={true}
          disabled={props.isLoading || !props.valueOfSelected}
          {...props}
        />
      </div>
    </>
  )
}
export default CommonSuperSelect