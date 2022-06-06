import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
/* 
import chrome from "ui/chrome"; //importing reqired chrome
var theme = chrome.getUiSettingsClient();
var darkTheme = theme.cache["theme:darkMode"].userValue
 */

const ConsumptionChart = ({ props, fromDate, toDate }) => {
  const mainChart = useRef(null);
  
  /* if(darkTheme){
    am4core.useTheme(am4themes_dark);
  } */
  am4core.options.commercialLicense = true;
  useLayoutEffect(() => {
    let chart = am4core.create("aconsumptionchartsdiv", am4charts.XYChart);
    chart.fontsize = 10;
    chart.colors.list = [am4core.color("#67b7dc"), am4core.color("#FBC02D")];
    // Use props to fetch chart data dynamically 
    chart.data = props
    if (chart.data.length === 0) {
      chart.openModal("There is no data for selected time period");
    };
    /* Create axes */
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.dataFields.category = "date";
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.tooltipTimeFormat = "HH:mm, d MMMM";
    dateAxis.dateFormats.setKey("day", "MMM dd");
    dateAxis.renderer.minGridDistance = 100;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.tooltip.disabled = true;
    dateAxis.renderer.labels.template.fontSize = 10;
    dateAxis.renderer.cellStartLocation = 0.2
    // dateAxis.renderer.cellEndLocation = 0.8
    // dateAxis.renderer.labels.template.rotation = -45;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = "kWh";
    valueAxis.title.fontSize = "12";
    valueAxis.min = 0;
    valueAxis.numberFormatter.numberFormat = "#a";
    valueAxis.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];
    // valueAxis.renderer.labels.template.fontSize = 10;
    var series = chart.series.push(new am4charts.LineSeries());
    series.name = "Consumption"
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "consumption";
    series.fillOpacity = 0.3;
    series.tensionX = 0.77;
    series.fill = am4core.color("#FF8C00")
    series.stroke = am4core.color("#FF8C00")

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.fill = am4core.color("#FF8C00"); // tooltips grab fill from parent by default
    bullet.tooltipText = "[/]Date:{dateX}\n Consumption:[bold]{valueY}";
    bullet.strokeWidth = 1;
    bullet.circle.radius = 1;
    bullet.stroke = am4core.color("#FF8C00");

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.name = 'Idle Energy'
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "idle_energy";
    series2.stroke = am4core.color("#ff0000");
    // series2.tooltip.background.fill = am4core.color("#ff0000");
    series2.fill = am4core.color("#ff0000");
    // series2.strokeWidth = 2;
    series2.columns.template.tooltipText=`[/]Date:{dateX}\n{name}: [bold]{valueY}`


    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.fontSize = 12;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 15;
    markerTemplate.height = 15;

    return () => {
      chart.dispose();
    }
  }, [fromDate, toDate])

  return (
    <div id="aconsumptionchartsdiv" style={{ width: "100%", height: "95%" }}>
    </div>
  );
}

export default ConsumptionChart;