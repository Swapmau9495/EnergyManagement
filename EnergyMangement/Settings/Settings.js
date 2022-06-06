import React, { useState} from 'react'
import { EuiFlexGroup, EuiButton } from '@elastic/eui';
import Form from './Form/Form'
import $ from "jquery"
import Onboard from './Components/Onboard';
import {host_name,port_number} from '../CommonComponents/Config'

const Settings = props => {
    // var config_data = require("/usr/share/kibana/plugins/config/settings.json");
    // var host_name = config_data.nginx.nginx_host;
    // var port_number = config_data.nginx.nginx_port;
    const [inputdisable, setInputdisable] = useState(false);
    const [selectedOptions, setSelected] = useState([]);
    const [energy_index, setEnergyIndex] = useState("");
    const [energy_time, setEnergyTime] = useState("0n2");
    const [energy_cumulative, setEnergyCumulative] = useState("");
    const [energy_units, setEnergyUnits] = useState("");
    const [energy_voltage, setEnergyVoltage] = useState("");
    const [energy_frequency, setEnergyFrequency] = useState("");
    const [energy_current, setEnergyCurrent] = useState("");
    const [process_index, setprocessIndex] = useState("");
    const [process_time, setProcessTime] = useState("");
    const [process_idle, setProcessidle] = useState("");
    const [production_index, setProductionIndex] = useState("");
    const [production_time, setProductionTime] = useState("");
    const [production_output, setProductionOutput] = useState("");
    const [production_units, setProductionUnits] = useState("");
    const [formdata, setformdata] = useState({})
    const process_params = [];
    selectedOptions.forEach((elm) => {
        process_params.push(elm.label);
    });
    const saveSettings = () => {
        $.ajax({
            url:
                host_name +
                ":" +
                port_number +
                "/ems_settings_set_savesettings?energy_index=" +
                // energy_index +
                "&energy_timefield=" +
                energy_time +
                "&energy_cumulative=" +
                energy_cumulative +
                "&energy_voltage=" +
                energy_voltage +
                "&energy_units=" +
                energy_units +
                "&energy_frequency=" +
                energy_frequency +
                "&energy_current=" +
                energy_current +
                "&process_index=" +
                process_index +
                "&process_timefield=" +
                process_time +
                "&process_params=" +
                process_params.join() +
                "&process_idleenergy=" +
                process_idle +
                "&auto_idleenergy_status=" +
                inputdisable +
                "&production_index=" +
                production_index +
                "&production_timefield=" +
                production_time +
                "&production_output=" +
                production_output +
                "&production_units=" +
                production_units,
            dataType: "json",
            async: true,
            success: function (data) {
            },
            complete: function (res) {
            },
            error: function (err) {
            }
        });
    };

    return (
        <EuiFlexGroup alignItems="center" style={{ flexDirection: "column", paddingTop:'1.7em' }}>
            <Form
                // setInputdisable={setInputdisable}
                // setSelected={setSelected}
                // setEnergyIndex={setEnergyIndex}
                // setEnergyTime={setEnergyTime}
                // setEnergyCumulative={setEnergyCumulative}
                // setEnergyUnits={setEnergyUnits}
                // setEnergyVoltage={setEnergyVoltage}
                // setEnergyFrequency={setEnergyFrequency}
                // setEnergyCurrent={setEnergyCurrent}
                // setprocessIndex={setprocessIndex}
                // setProcessTime={setProcessTime}
                // setProcessidle={setProcessidle}
                // setProductionIndex={setProductionIndex}
                // setProductionTime={setProductionTime}
                // setProductionOutput={setProductionOutput}
                // setProductionUnits={setProductionUnits}
                // setformdata={setformdata}
                // energy_units={energy_units}
                // production_units={production_units}
                // selectedOptions={selectedOptions}
                formdata={formdata}
            />
            <Onboard
                formdata={formdata}
            />
            <EuiButton
                color="primary"
                // minWidth="200px" 
                style={{ display: "inline-block", marginTop: "0em", marginBottom:"10px" }}
                fill
                onClick={saveSettings}>
                Save Changes
            </EuiButton>
        </EuiFlexGroup>
    )
}
export default Settings;