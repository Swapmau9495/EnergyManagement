import React, { useState, useEffect, Fragment } from 'react';
import {
  EuiSuperSelect,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiText,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiButton,
  EuiPanel
} from '@elastic/eui';
import $ from "jquery"
import {host_name,port_number} from '../../CommonComponents/Config'

function Onboard(props) {
 
  // plant selection
  const [plantOptions, setplantOptions] = useState([]);
  const [plantValue, setPlantValue] = useState("");
  // fetch data from api for Plant 
  useEffect(() => {
    let xhr = $.ajax({
      method: "GET",
      url: `${host_name}: ${port_number}/ems_get_plantlist`,
      dataType: "json",
      success: function (data) {
        let options = [];
        data.forEach(element => {
          options.push({
            value: element,
            inputDisplay: element
          })
        });
        setplantOptions(options)
        setPlantValue(options[0].value)
      },
    });
    return () => {
      xhr.abort();
    }
  }, []);
  const onChangePlant = (plantValue) => {
    setPlantValue(plantValue);
  };
  // shop selection
  const [shopOptions, setShopOptions] = useState([])
  const [shopValue, setShopValue] = useState("");
  //fetch api for shop
  useEffect(() => {
    if (plantValue) {
      $.ajax({
        method: "GET",
        url: `${host_name}:${port_number}/pdm_get_shopdropdown?plant=${plantValue.replace("#", "%23")}`,
        dataType: "json",
        success: function (data) {
          let options = [];

          data.forEach(element => {
            options.push({
              value: element,
              inputDisplay: element
            });
          });

          setShopOptions(options)
          setShopValue(options[0].value)
        },
      });
    }
  }, [plantValue]);

  const onChangeShop = (shopValue) => {
    setShopValue(shopValue);
  };

  //state for table values
  const [toSelect, settoSelect] = useState(["BoilerFeedPump-A", "BoilerFeedPump-B", "CoolingWaterPump-A", "CoolingWaterPump-B"]); //datas for select Assets
  const [selected, setSelected] = useState(["InducedDraftFan-A", "InducedDraftFan-B", "Gas-Turbine", "CondensateExtractionPump"]); //datas for selected Assets

  //fetch data from api
  useEffect(() => {
    if (plantValue !== "" && shopValue !== "") {
      $.ajax({
        method: "GET",
        url: `${host_name}:${port_number}/ems_settings_get_assetlist?shop= ${shopValue}&plant=${plantValue}`,
        dataType: "json",
        success: function (data) {
          settoSelect(data);
        },
      });
    }

    $.ajax({
      method: "GET",
      url: `${host_name}:${port_number}/ems_settings_get_selectedassets`,
      dataType: "json",
      success: function (data) {
        setSelected(data)
      },
    });
  }, [plantValue, shopValue]);

  const toSelectColumns = [
    {
      id: "title",
    },
    {
      id: 'plus',
      isButton: true
    },
  ];

  let array1 = toSelect.map((row1, index) => {
    return {
      id: index,
      title: row1,
    };
  });

  const toSelectItems = [...array1];

  const addRow = (key) => {
    let arr1 = toSelect;
    let addEle = arr1.splice(key, 1);
    let arr2 = [...selected, addEle];
    setSelected(arr2);
    settoSelect(arr1);
  };

  const renderToSelectRows = () => {
    const renderToSelectRow = (data) => {
      const toSelectCells = toSelectColumns.map((column) => {
        const toSelectCell = data[column.id];
        let child1;
        if (column.isButton) {
          return (
            <EuiTableRowCell key={column.id} align="center" >
              <EuiButtonIcon
                aria-label="Actions"
                iconType="plusInCircleFilled"
                onClick={() => { addRow(data.id) }}
              />
            </EuiTableRowCell>
          );
        }

        child1 = toSelectCell;

        return (
          <EuiTableRowCell
            key={column.id}>
            {child1}
          </EuiTableRowCell>
        );
      });
      return (
        <EuiTableRow
          key={data.id}>
          {toSelectCells}
        </EuiTableRow>
      );
    };

    const toSelectRows = [];
    for (let itemIndex = 0; itemIndex < toSelectItems.length; itemIndex++) {
      const data = toSelectItems[itemIndex];
      toSelectRows.push(renderToSelectRow(data));
    }
    return toSelectRows;
  }
  const selectedColumns = [
    {
      id: 'title',
    },
    {
      id: 'minus',
      isButton: true,
    },
  ];

  const array2 = selected.map((row2, index) => {
    return {
      id: index,
      title: row2,
    };
  });
  const selectedItems = [...array2];
  const removeRow = (key) => {
    let array = selected
    let removeEle = array.splice(key, 1)
    let addarr = [...toSelect, removeEle]
    settoSelect(addarr)
    setSelected(array)
  }
  const renderRows = () => {
    const renderRow = (item) => {
      const selectedCells = selectedColumns.map((column) => {
        const selectedCell = item[column.id];
        let child2;
        if (column.isButton) {
          return (
            <EuiTableRowCell key={column.id} align="center">
              <EuiButtonIcon
                aria-label="Actions"
                iconType="minusInCircleFilled"
                onClick={() => removeRow(item.id)}
              />
            </EuiTableRowCell>
          );
        }
        child2 = selectedCell;
        return (
          <EuiTableRowCell
            key={column.id}>
            {child2}
          </EuiTableRowCell>
        );
      });

      return (
        <EuiTableRow
          key={item.id}>
          {selectedCells}
        </EuiTableRow>
      );
    };
    const rows = [];
    for (let itemIndex = 0; itemIndex < selectedItems.length; itemIndex++) {
      const item = selectedItems[itemIndex];
      rows.push(renderRow(item));
    }
    return rows;
  }
  return (
    <Fragment>
      <EuiFlexItem style={{ maxWidth: 910, paddingTop:'0.3em' }}>
        <EuiPanel >
          <EuiTitle >
            <h6 style={{ fontWeight: 350 }}>Onboard Assets</h6>
          </EuiTitle>
          <EuiSpacer />
          <EuiFlexGroup gutterSize="xl" >
            <EuiFlexItem>
              <EuiText size="xs">
                <EuiTitle size="xs">
                  <h3>Select Plant</h3>
                </EuiTitle>
              </EuiText>
              <EuiSuperSelect
                options={plantOptions}
                valueOfSelected={plantValue}
                onChange={(plantValue) => onChangePlant(plantValue)}
                style={{ marginTop: "10px" }}
                fullWidth={true}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText size="xs">
                <EuiTitle size="xs" >
                  <h3>Select Shop</h3>
                </EuiTitle>
              </EuiText>
              <EuiSuperSelect
                options={shopOptions}
                valueOfSelected={shopValue}
                onChange={(shopValue) => onChangeShop(shopValue)}
                style={{ marginTop: "10px" }}
                fullWidth={true}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup gutterSize="xl">
            <EuiFlexItem>
              <EuiText size="xs">
                <EuiTitle size="xs" style={{ marginTop: "10px" }} >
                  <h3>Select Assets</h3>
                </EuiTitle>
              </EuiText>
              <div style={{ height: "200px", overflowY: "scroll" }}>
                <EuiTable>
                  <EuiTableBody>{renderToSelectRows()}</EuiTableBody>
                </EuiTable>
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText size="xs">
                <EuiTitle size="xs" style={{ marginTop: "10px" }}>
                  <h3>Selected Assets</h3>
                </EuiTitle>
              </EuiText>
              <div style={{ height: "200px", overflowY: "scroll" }}>
                <EuiTable>
                  <EuiTableBody>{renderRows()}</EuiTableBody>
                </EuiTable>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      </EuiFlexItem>
    </Fragment>
  );
}

export default Onboard;