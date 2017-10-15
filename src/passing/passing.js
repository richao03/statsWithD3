import React, { Component } from 'react';
import * as d3 from 'd3';
import returnWeek5 from '../dataset/week5-2017';
import customTeamInfo from '../dataset/teamColor';

//let arrayOfData = [];
class Passing extends Component {

  constructor(props) {
    super(props)
    this.state = { chosenData: "" }
    this.twiceFiltered ={}
  }

  componentWillMount() {
  }

  componentDidMount() {
    const that = this;
    const reg = /TO ([0-9]+-)/;
    const checkplayer = /TO (.*?) TO/;
    let num = 0 
    this.props.filteredData.filter(function(each) {
      
      if (each.PlayType == "PASS" && each.Description.match(reg) && each.Description.match(checkplayer)) {
        let playerName = each.Description.match(checkplayer)[0].split("-")[1].split(" ")[0]
        let number = each.Description.match(reg)[1].split(" ")[0].split("")[0] + each.Description.match(reg)[1].split(" ")[0].split("")[1]
        let passLength = each.PassType
        let touchDown = each.IsTouchdown
        let redZone = each.YardLineFixed
        if(playerName == "B.COLEMAN"){
          console.log(each)
        }
        if (that.twiceFiltered[playerName]) {
          that.twiceFiltered[playerName].catches++
        } else {
          that.twiceFiltered[playerName] = { catches: 1, number: number, short:0, deep:0, redZone:0, TD:0 }
        }
        if(touchDown!=="0"){
          that.twiceFiltered[playerName].TD++
        }
        if(passLength[0]=="S"){
          that.twiceFiltered[playerName].short++
        } else {
          that.twiceFiltered[playerName].deep++
        }
        if(redZone<=21){
          that.twiceFiltered[playerName].redZone++
        }
      }
    })
    console.log("asdf", this.twiceFiltered)
  }

  componentDidUpdate() {}

  render() {

    return (
      <div>
Here is phase 2
      </div>
    );
  }
}

export default Passing;
