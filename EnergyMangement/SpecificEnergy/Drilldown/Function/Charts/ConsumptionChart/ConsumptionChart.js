import React, { useLayoutEffect,useRef, } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
/* 
import chrome from "ui/chrome"; //importing reqired chrome
var theme = chrome.getUiSettingsClient();
var darkTheme = theme.cache["theme:darkMode"].userValue
 */

const ConsumptionChart = ({ props }) => {
  const mainChart = useRef(null);
  /* 
  if(darkTheme){
    am4core.useTheme(am4themes_dark);
  } */
  am4core.options.commercialLicense = true;
  
  useLayoutEffect(() => {
    let chart= am4core.create("consumptionchartsdiv", am4charts.XYChart);
    chart.fontsize = 10;
    // chart.colors.list = [am4core.color("#67b7dc"), am4core.color("#FBC02D")];
    chart.colors.step = 9;

    // Use props to fetch chart data dynamically 
    chart.data = props

    if (chart.data.length === 0) {
      chart.openModal("There is no data for selected time period");
    };
    /* Create axes */
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
    dateAxis.renderer.labels.template.fontSize = 10;
    // dateAxis.dataFields.category = "date";
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-ddThh:mm:ss.sssZ";
    dateAxis.tooltipTimeFormat = "HH:mm, d MMMM";
    // dateAxis.dateFormats.setKey("day", "dd MMM");

    dateAxis.dateFormats.setKey("day", " dd ");
    dateAxis.periodChangeDateFormats.setKey("day", "MMMM"); 
    dateAxis.dateFormats.setKey("week", " dd ");
    dateAxis.periodChangeDateFormats.setKey("week", "MMMM"); 
    dateAxis.dateFormats.setKey("month", " MMM ");
    dateAxis.periodChangeDateFormats.setKey("month", "YYYY"); 
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.tooltip.disabled = true;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = "kWh";
    valueAxis.title.fontSize = "12";
    valueAxis.renderer.labels.template.fontSize = 10;
    valueAxis.min = 0;
    valueAxis.numberFormatter.numberFormat = "#a";
    valueAxis.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.dateX = "Date";
    series.dataFields.valueY = "Energy";
    // series.tooltipText = "{dateX}\n Consumption:[bold]{valueY}";

    // series.fillOpacity = 0.3;
    // series.tensionX=0.8
   series.stroke = am4core.color("#FF8C00");
    series.fill = am4core.color("#FF8C00"); 
    // chart.cursor = new am4charts.XYCursor();
    // chart.cursor.lineY.opacity = 0;
    // var bullet = series.bullets.push(new am4charts.CircleBullet());
    // bullet.fill = am4core.color("#FF8C00"); // tooltips grab fill from parent by default
    // bullet.tooltipText = "[/]Date:{dateX}\n Energy:[bold]{valueY}";
    // bullet.strokeWidth = 0.5;
    // bullet.circle.radius = 1;
    // bullet.stroke = am4core.color("#FF8C00");
    series.columns.template.width =  am4core.percent(25);
    series.columns.template.tooltipText = "{dateX}\n Consumption:[bold]{valueY}";
    // columnSeries.fill=am4core.color("#00CDFE")
    // columnSeries.stroke=am4core.color("#00CDFE")
    
    series.columns.template.propertyFields.fillOpacity =
      "fillOpacity";
      series.columns.template.propertyFields.stroke = "stroke";
      series.columns.template.propertyFields.strokeWidth =
      "strokeWidth";
      series.columns.template.propertyFields.strokeDasharray =
      "columnDash";
      series.tooltip.label.textAlign = "middle";
    
    return () => {
      chart.dispose();
    }
  }, [])

  return (
    <div id="consumptionchartsdiv" style={{ width: "100%", height: "300px" }}>
    </div>
  );
}



export default ConsumptionChart;