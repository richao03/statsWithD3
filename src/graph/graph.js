import React, { Component } from 'react';
import * as d3 from 'd3';
import returnWeek5 from '../dataset/week5-2017';
import customTeamInfo from '../dataset/teamColor';

//let arrayOfData = [];
class Realgraph extends Component {

  constructor(props) {
    super(props)
    this.state = { chosenData: "", leaving:false}
    this.arrayOfData = []
    this.color=[]
    this.answer;
    this.runOrPass = [{ "type":"PASS", "count": 0 }, { "type":"RUN", "count": 0 }];
    this.percentageArray={"run":0,"pass":0}
  }

  componentWillMount() {
    this.fetchAllData();
  }

  componentDidMount() {}

  componentDidUpdate() {
    this.updateColor()
    this.createGraph();
  
  }

  updateColor(){
    d3.select(".cleanerWrapper")
      .transition()
      .style("opacity", "1").duration(1000)
    d3.select(".bottomPortion")
      .transition()
      .style("width","")
      .style("background-color", "white").duration(1000)
    this.color = customTeamInfo()[this.props.chosenTeam].color;
  }
  
  updateChosenTeam() {
    const that = this
    this.runOrPass[0].count = 0;
    this.runOrPass[1].count = 0;
    this.answer = this.arrayOfData.filter(function(each) {
      if (each.OffenseTeam == that.props.chosenTeam) {
        return each
      }
    })
    return this.answer
  }

  getPercentage(count) {
    const that = this;
    let percent = (count / (that.runOrPass[0].count + that.runOrPass[1].count)) * 100
    return (Math.round(percent * 10) / 10 + "%")
  }

  runPercentage() {
    const that = this;
    let answer = this.getPercentage(that.runOrPass[1].count)
    console.log("run percentage", answer)
    if(answer!=="NaN%"){
    return (<div>{answer} </div>)
    } else {
      return <div>0%</div>
    }
  }

  passPercentage() {
    const that = this;
    let answer = this.getPercentage(that.runOrPass[0].count)
    console.log("pass percentage", answer)
    if (answer !== "NaN%") {
    return (<div>{answer} </div>)
    } else {
      return <div>0%</div>
    }
  }
  measureRunPass() {
    const that = this;
    let firstFiltered = this.updateChosenTeam()
    firstFiltered.forEach(function(d) {
      if (d.IsPass !== "0") {
        that.runOrPass[0].count++
      } else if (d.IsRush !== "0") {
        that.runOrPass[1].count++
      }
    })
  }

 

  fetchAllData() {
    const that = this;
    d3.csvParse(returnWeek5(), function(d) {
      that.arrayOfData.push(d);
    })
  }

  createGraph() {
    d3.select("svg").remove();

    var margin = { left: 20, top: 20, right: 20, bottom: 20 },
      width = Math.min(800, 500) - margin.left - margin.right,
      height = Math.min(800, 500) - margin.top - margin.bottom;

    var svg = d3.select(".pieChart").append("svg")
      .attr("width", (width + margin.left + margin.right))
      .attr("height", (height + margin.top + margin.bottom))
      .append("g").attr("class", "wrapper")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    var arc = d3.arc()
      .innerRadius(width * 0.25 / 2)
      .outerRadius(width * 0.75 / 2 + 30);

    let color = d3.scaleOrdinal().range(this.color)

    let pie = d3.pie()
      .value(function (d) { return(d.count) })
      .padAngle(.01)
      .sort(null);
    const that = this;

    svg.selectAll('.typeArc')
        .data(pie(this.runOrPass))
        .enter()
        .append('path')
        .attr("class", "typeArc")
        .attr("id",function(d){return d.data.type})
        .attr("d", arc)
        .attr('fill', function (d) {
          return color(d.data.type);
        })
        .on("click", function(d){
          d3.select(".cleanerWrapper")
            .transition()
            .style("opacity", "0").duration(1000)

          if(d.data.type=="RUN"){
            d3.select("#PASS")
            .transition()
            .style("opacity","0").duration(1000)
            d3.select(".bottomPortion")
              .transition()
              .style("background-color", that.color[1])
              .style("width", "10vw").duration(1000)
          } else {
            d3.select("#RUN")
              .transition()
              .style("opacity", "0").duration(1000)
            d3.select(".bottomPortion")
              .transition()
              .style("background-color", that.color[0]).duration(1000)
              .style("width", "10vw").duration(1000)

          }

   
          // that.setState({ leaving: d.data.type });
        })

    svg.selectAll(".typeText")
      .data(pie(this.runOrPass))
      .enter().append("text")
      .attr("class", "typeText")
      .attr("dy", -15)
      .append("textPath")
      .attr("class", "typeOfPlay")
      .attr("startOffset", "25%")
      .style("text-anchor", "middle")
      .attr("xlink:href", function(d, i) { return "#" + d.data.type; })
      .text(function(d) { return (d.data.type ) })
  
    svg.selectAll(".typeText")
      .data(pie(this.runOrPass))
      .enter().append("text")
      .attr("class", "typeText")
      .append("textPath")
      .attr("dy", "3em")
      .text(function (d) { 
        this.percentageArray[d.data.type]=d.data.count
        return this.getPercentage(d) })
}

      render() {

  this.measureRunPass();
let runPercentage = this.runPercentage();
let passPercentage = this.passPercentage();
return (
      <div className="bottomPortion">
      <div className="cleanerWrapper">
        <div className="pieChart"></div>
        <div className="runPercentage" >{runPercentage}</div>
        <div className="passPercentage">{passPercentage}</div>
        </div>
      </div>
    );
  }
}

export default Realgraph;
