import React, { Component } from 'react';
import * as d3 from 'd3';
import returnWeek5 from '../dataset/week5-2017';

//let arrayOfData = [];
class Realgraph extends Component {

  constructor(props) {
    super(props)
    this.state = { chosenData: "" }
    this.arrayOfData = []
    this.answer;
    this.runOrPass = [{ "type":"pass", "count": 0 }, { "type":"run", "count": 0 }];
  }

  componentWillMount() {
    this.fetchAllData();
  }

  componentDidMount() {}

  componentDidUpdate() {
    this.createGraph();
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

  firstFilterToHtml() {
    const that = this;
    return ( <div> Pass: {that.runOrPass[0].count} Run: {that.runOrPass[1].count} </div>)
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
    let graphHeight = 360;
    let graphWidth = 360;
    let radius = Math.min(graphWidth, graphHeight) / 2;

    let color = d3.scaleOrdinal()
      .range(['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C']);

    let arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    let svg = d3.select(".barChart")
      .append("svg")
      .attr("height", graphHeight)
      .attr("width", graphWidth)
      .append('g')
      .attr('transform', 'translate(' + (graphWidth / 2) + ',' + (graphHeight / 2) + ')');

    let pie = d3.pie()
      .value(function (d) { return d.count; })
      .sort(null);

    let path = svg.selectAll('path')
      .data(pie(this.runOrPass))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d, i) {
        return color(d.data.type);
      });

  }


render() {
  this.measureRunPass();
let answer = this.firstFilterToHtml();
return (
      <div>
        <div className="barChart">{answer}</div>
      </div>
    );
  }
}

export default Realgraph;
