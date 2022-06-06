import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
// import  '../../../../../GaugeLoader.css';
import { EuiFlexGroup, EuiFlexItem, EuiLoadingChart, EuiText } from "@elastic/eui";

// import chrome from "ui/chrome"; //importing reqired chrome
// var theme = chrome.getUiSettingsClient();
// var darkTheme = theme.cache["theme:darkMode"].userValue


const GaugeChart = ({ id, avgcurrentvalue, unit, powerunit, avgPowervalue }) => {
    // if(darkTheme){
    //   am4core.useTheme(am4themes_dark);
    // }

    useLayoutEffect(() => {
        let chart = am4core.create(id, am4charts.GaugeChart);
        chart.legend = new am4charts.Legend();
        // chart.data=value
        let axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.renderer.minGridDistance = 100;
        axis.renderer.labels.template.fontSize = 10;

        // axis.renderer.
        if (id === 'Avg_Current') {
            if (avgcurrentvalue > 0) {
                axis.min = 0;
                axis.max = avgcurrentvalue * 2;
            }
            else if (avgcurrentvalue === 0) {
                axis.min = 0;
                axis.max = 100;
            }
        } else if (id === 'Avg_Power') {
            if (avgPowervalue > 0) {
                axis.min = 0;
                axis.max = avgPowervalue * 2;
            }
            else if (avgPowervalue === 0) {
                axis.min = 0;
                axis.max = 100;
            }
        }
        // Semi-Circle Radius
        chart.innerRadius = 165;
        // Green Area
        let range = axis.axisRanges.create();
        if (id === 'Avg_Current') {
            if (avgcurrentvalue > 0) {
                range.value = 0;
                range.endValue = avgcurrentvalue * 3;
            }
            else if (avgcurrentvalue === 0) {
                range.value = 0;
                range.endValue = 100;
            }
        } else if (id === 'Avg_Power') {
            if (avgPowervalue > 0) {
                range.value = 0;
                range.endValue = avgPowervalue * 3;
            }
            else if (avgPowervalue === 0) {
                range.value = 0;
                range.endValue = 100;
            }
        }
        range.axisFill.fillOpacity = 1;
        range.axisFill.fill = am4core.color("#808080");

        var label = chart.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = 30;
        label.x = am4core.percent(50);
        label.y = am4core.percent(75);
        label.horizontalCenter = "middle";
        label.verticalCenter = "bottom";
        if (id === 'Avg_Current') {
            label.text = unit && `${Number(parseFloat(avgcurrentvalue).toFixed(2)).toLocaleString('en', {
                minimumFractionDigits: 2
            })}  ${unit}`;
        } else if (id === 'Avg_Power') {
            label.text = powerunit && `${Number(parseFloat(avgPowervalue).toFixed(2)).toLocaleString('en', {
                minimumFractionDigits: 2
            })}  ${powerunit}`;

        }

        var hand = chart.hands.push(new am4charts.ClockHand());
        hand.axis = axis;
        hand.innerRadius = am4core.percent(55);
        hand.startWidth = 8;
        hand.pin.disabled = true;
        if (id === 'Avg_Current') {
            hand.value = unit && avgcurrentvalue;
        } else if (id === 'Avg_Power') {
            hand.value = powerunit && avgPowervalue;

        }
        return () => {
            chart.dispose();
        };
    }, [/* fromDate,toDate,avgcurrentvalue,avgPowervalue, Refresh,unit,isChartLoading[id] */])


    return (
        <>
            <div id={id} style={{ width: "100%", height: "280px" }}></div>
        </>

    )
}
export default GaugeChart;