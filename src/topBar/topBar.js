import React, {Component} from 'react';
import * as d3 from 'd3';
import returnWeek5 from '../dataset/week5-2017'

let arrayOfData = [];

class Graph1 extends Component {
  constructor(props){
    super(props)
  }


  componentDidMount(){
    this.runThisFirst();
  }

runThisFirst() {
  console.log('going')
  d3.csvParse(returnWeek5(), function(d){
  arrayOfData.push(d);
})
}

  render() {
    return (
      <div>
        <div>HELLO WORLD AGAIN
        </div>
      </div>
    );
  }
}

export default Graph1;
