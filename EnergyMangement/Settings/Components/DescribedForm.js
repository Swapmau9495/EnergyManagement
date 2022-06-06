import React, { Fragment } from 'react'
import {
    EuiDescribedFormGroup,
    EuiFormRow,
    EuiFieldText,
} from '@elastic/eui';

const DescribeForm = props => {
    return (
        <Fragment>
            <EuiDescribedFormGroup
                style={{ marginTop: 1 }}
                title={<div style={{ marginTop: 30 }}>{props.title}</div>}
                description={props.description}>
                <EuiFormRow
                    label={props.label}
                    hasEmptyLabelSpace
                    helpText={
                        <span>
                            {props.helpText}
                        </span>
                    }>
                    <EuiFieldText
                        placeholder={props.placeholder}
                        name={props.name}
                        aria-label="Example"
                        onChange={(e) => props.changeFunc(e)}
                        disabled={props.disable}
                    />
                </EuiFormRow>
            </EuiDescribedFormGroup>
        </Fragment >
    );
}

export default DescribeForm