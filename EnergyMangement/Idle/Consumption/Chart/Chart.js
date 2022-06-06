import React, { useRef, useLayoutEffect, useContext, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

// import chrome from "ui/chrome"; //importing reqired chrome
// var theme = chrome.getUiSettingsClient();
// var darkTheme = theme.cache["theme:darkMode"].userValue



am4core.useTheme(am4themes_animated);
function Chart({ data }) {
  const charts = useRef(null);
  // if(darkTheme){
  //   am4core.useTheme(am4themes_dark);
  // }
  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    am4core.options.commercialLicense = true;
    var chart = am4core.create("idle_energy_trend", am4charts.XYChart);
    chart.data = data
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.labels.template.fontSize = 10;
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.tooltip.disabled = true;

		dateAxis.dateFormats.setKey("day", " dd ");
		dateAxis.periodChangeDateFormats.setKey("day", "MMMM");
		dateAxis.dateFormats.setKey("week", " dd ");
		dateAxis.periodChangeDateFormats.setKey("week", "MMMM");
		dateAxis.dateFormats.setKey("month", " MMM ");
		dateAxis.periodChangeDateFormats.setKey("month", "YYYY");
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = "kWh";
    valueAxis.title.fontSize = "12";
    valueAxis.renderer.labels.template.fontSize = 10;
    valueAxis.tooltip.disabled = true;
    valueAxis.min = 0;
    valueAxis.numberFormatter.numberFormat = "#a";
    valueAxis.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "idle_energy";
    // series.tooltipText = "{dateX}[/]\n Idle time(hrs):[bold]{valueY}";
    series.fillOpacity = 0.3;
    series.tensionX = 0.77;
    series.fill = am4core.color('#FF8C00')
    series.stroke = am4core.color('#FF8C00')
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.fill = am4core.color("#FF8C00"); // tooltips grab fill from parent by default
    bullet.tooltipText = "{dateX}[/]\n Idle Energy: [bold]{valueY}";
    bullet.strokeWidth = 0.5;
    bullet.circle.radius = 1;
    bullet.stroke = am4core.color("#FF8C00");

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.opacity = 0;
    charts.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data])

  return (
    <div id="idle_energy_trend" style={{ width: "100%" }}>

    </div>
  );
}

export default Chart