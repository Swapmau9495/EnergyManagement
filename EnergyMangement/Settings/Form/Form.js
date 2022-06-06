import React, { useState, Fragment } from 'react'
import {
    EuiFlexGroup,
    EuiForm,
    EuiTitle,
    EuiFlexItem,
    EuiFormRow,
    EuiPanel,
    EuiCode,
} from '@elastic/eui'
import DescribeForm from '../Components/DescribedForm'

const Form = props => {
    // For Indices and Field

    const [fieldCheckdisable, setFieldCheckdisable] = useState(false);
// accept entered data in form
    const fieldHandleformData = (e) => {
        let elm_name = e.target.name
        let elm_val = e.target.value
        props.setformdata({
            ...props.formdata,
            [elm_name]: elm_val
        });
        console.log(e.target.fieldName)
    }
    const helpTextFunc = code => {
        return (
            <span>
                The recommended value is <EuiCode>{code}</EuiCode>
            </span>
        )
    }
    const { production_output, anydata, production_status } = props.formdata
    return (
        <Fragment>
            <EuiFlexGroup style={{  flexDirection: "column" }}>

                <EuiFlexItem>
                    <EuiPanel paddingSize="m">
                        <EuiForm>
                            <EuiTitle>
                                <h5 style={{ fontWeight: 400 }}>Process Tags</h5>
                            </EuiTitle>
                            <div style={{ paddingRight: 100 }}>
                                <DescribeForm
                                    title="Production Output"
                                    description="This tag will be used to compute specific energy (kWh/ton)"
                                    helpText="Name of the tag that indicates the production output per hour"
                                    placeholder="overall_production"
                                    fieldName="production_output"
                                    name="ProductionOutput"
                                    fieldValue={production_output}
                                    changeFunc={fieldHandleformData} />
                                <DescribeForm
                                    title="Production Status"
                                    description="This tag will be used to track Idle energy of an asset."
                                    helpText="Name of the tag that indicates the idle state of the production line."
                                    placeholder="production_status"
                                    fieldName="productionstatus"
                                    name="ProductionStatus"
                                    fieldValue={production_status}
                                    changeFunc={fieldHandleformData} />
                            </div>
                        </EuiForm>
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
        </Fragment >
    )
}
export default Form;