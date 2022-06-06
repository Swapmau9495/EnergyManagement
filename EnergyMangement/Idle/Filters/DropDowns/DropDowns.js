import React, { useState, Fragment, useEffect, createContext, useContext } from "react";
import CommonPopover from "../../../CommonComponents/CommonPopover";
import { ValuesContext } from "../../EnergyMain"
import $ from 'jquery'
import {
    EuiFlexGroup,
    EuiFlexItem,
} from "@elastic/eui";
import {host_name,port_number} from '../../../CommonComponents/Config'

const DropDowns=({setsameplant})=> {
    const [Site, setSite] = useState('')
    const [SiteList, setSiteList] = useState([])
    const [plant,setPlant]=useState('')
    const [Plantid, setPlantid] = useState("");    const [PlantList, setPlantList] = useState([]);
    const { state, dispatch } = useContext(ValuesContext);
    const [IsButtonLoading, setIsButtonLoading] = useState({
        Site: false,
        Plant: false,
    })
    const changeContext = (newValue) => {
        dispatch({ type: 'SELECTED_VALUE', data: newValue, });
    };

    const initialplantid=(plant)=>{
        changeContext({...state,siteValue: Site,plantValue: plant, plantid:''})

        $.ajax({
            url:`${host_name}:${port_number}/ems/plants/${plant}?from=${state.start}&to=${state.end}`,
            dataType: "json",
            async: true,
            success: function (data) {
                console.log(data)
                setPlantid(data.plant_id)
                changeContext({...state,siteValue: Site,plantValue: plant, plantid:data.plant_id})
            },
            error: function () {
            }
        }); 
      }

    const onChangeFunction = (SelectedVal) => {
        changeContext({...state, siteValue: Site, plantValue: SelectedVal })
            initialplantid(SelectedVal)
            setsameplant(prev=>!prev)
      }

      useEffect(()=>{
       plant && initialplantid(plant)
      },[state.start,state.end])
    const loadSite = () => {
        // https://dev.4pointx.com:12361/get_sites_with_all
        setIsButtonLoading({
            ...IsButtonLoading,
            Site: true
        })
        $.ajax({
            url: `${host_name}:${port_number}/get_sites_with_all`,
            dataType: "json",
            async: true,
            success: function (data) {
                setIsButtonLoading({
                    ...IsButtonLoading,
                    Site: false
                })
                setSite(data[0])
                setSiteList(data);
            },
            error: function () {

                setIsButtonLoading({
                    ...IsButtonLoading,
                    Site: false
                })
            }
        });
    }

    function loadPlantList(Site) {
        setIsButtonLoading({
            ...IsButtonLoading,
            Plant: true
        })

        $.ajax({
            url: `${host_name}:${port_number}/get_plants?site=${Site}`,
            dataType: "json",
            async: true,
            success: function (data) {

                setIsButtonLoading({
                    ...IsButtonLoading,
                    Plant: false
                })
                setPlant(data[0])
                onChangeFunction(data[0])
                setPlantList(data);
            },
            error: function (err) {
                console.log(err);
                setIsButtonLoading({
                    ...IsButtonLoading,
                    Plant: false
                })
            }
        });
    }
    useEffect(() => {
        loadSite()
    }, []);
    useEffect(() => {
        const SiteValue = Site ? Site : SiteList[0]
        SiteList[0] && loadPlantList(SiteValue);
    }, [Site, SiteList]);
    return (
        <Fragment>
            <EuiFlexGroup justifyContent='flexStart' gutterSize='l'>
                <EuiFlexItem grow={false}>
                    <CommonPopover
                        Lists={SiteList}
                        PopoverName='Site'
                        onChange={setSite}
                        IsButtonLoading={IsButtonLoading.Site}
                    />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <CommonPopover
                        Lists={PlantList}
                        PopoverName='Plant'
                        onChange={onChangeFunction}
                        IsButtonLoading={IsButtonLoading.Plant}
                    />
                </EuiFlexItem>
            </EuiFlexGroup>
        </Fragment>
    );
}

export default DropDowns;
