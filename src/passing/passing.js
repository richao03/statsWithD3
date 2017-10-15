import React, { Component } from 'react';
import * as d3 from 'd3';
import returnWeek5 from '../dataset/week5-2017';
import customTeamInfo from '../dataset/teamColor';

//let arrayOfData = [];
class Realgraph extends Component {

  constructor(props) {
    super(props)
    this.state = { chosenData: "" }

  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentDidUpdate() {
  }

  render() {
    this.measureRunPass();
    let runPercentage = this.runPercentage();
    let passPercentage = this.passPercentage();
    return (
      <div>
        <div className="pieChart"></div>
        <div className="runPercentage" onClick={this.goingToRun}>{runPercentage}</div>
        <div className="passPercentage" onClick={this.goingToPass}>{passPercentage}</div>
      </div>
    );
  }
}

export default Realgraph;
