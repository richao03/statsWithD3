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
    const that = this;
    const reg = /TO ([0-9]+-)/;
    const checkplayer = /[0-9]+-([^(\s)]+)[^\.]/mig;
    let num = 0
    this.props.filteredData.forEach(function (each) {
      if (each.IsPass !== "0") {
        let passLength = each.PassType;
        let touchDown = each.IsTouchdown;
        let redZone = each.YardLineFixed;
        let incomplete = each.IsIncomplete;
        let playerName = each.Description.match(checkplayer)[1];
        let newplayerName = that.clean(playerName)

        if (!that.twiceFiltered[newplayerName]) {
          that.twiceFiltered[newplayerName] = { targets: 0, catches: 0, short: 0, deep: 0, redZone: 0, TD: 0 }
        }
        if (that.twiceFiltered[newplayerName]) {
          that.twiceFiltered[newplayerName].targets++
        }

        if (touchDown !== "0") {
          that.twiceFiltered[newplayerName].TD++
        }
        if (passLength[0] == "S" && incomplete == "0") {
          that.twiceFiltered[newplayerName].short++
          that.twiceFiltered[newplayerName].catches++
        }
        if (passLength[0] == "D" && incomplete == "0") {
          that.twiceFiltered[newplayerName].deep++
          that.twiceFiltered[newplayerName].catches++
        }
        if (redZone <= 21) {
          that.twiceFiltered[newplayerName].redZone++
        }
      }

    })
    console.log("asdf", this.twiceFiltered)
  }

  componentDidUpdate() {
    console.log("componentn did update")
  }

  componentDidMount() {
   
  }

  createBarGraph(){
    const that = this;

    let arrayOfData =  d3.entries(that.twiceFiltered)
   arrayOfData.forEach((d)=>{
    console.log("name", d.key)
    console.log("catches", d.value.catches)
   })
  }


  clean(word) {
    const that = this;
    if(word){
    let cleaning = word.split("")
    if (cleaning[cleaning.length - 1] == " ") {
      cleaning.pop();
      that.clean(cleaning.join(""))
    }
    if (cleaning[cleaning.length - 1] === ".") {
      cleaning.pop();
      that.clean(cleaning.join(""))

    }
    if (cleaning[cleaning.length - 1] == ")") {
      cleaning.pop();
      that.clean(cleaning.join(""))

    }
    if (cleaning[cleaning.length - 1] == ";") {
      cleaning.pop();
      that.clean(cleaning.join(""))
    }
    return (cleaning.join(""))
    } else {
      return
    }
  }
  
    render() {
      this.createBarGraph()

    return (
      <div>
Here is phase 2
<div className="barGraphWrapper">
<div className="barGraph"></div>
</div>
      </div>
    );
  }
}

export default Passing;
