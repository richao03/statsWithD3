import React, {Component} from 'react';
import * as d3 from 'd3';
import returnWeek5 from '../dataset/week5-2017'
import Realgraph from '../graph/graph.js'

let arrayOfData = [];

class Graph1 extends Component {

  constructor(props) {
    super(props)
    this.state ={chosenTeam:""}
  }

  selectTeam(teamSelected) {
    console.log("hello", teamSelected)
    this.setState({chosenTeam:teamSelected})
    console.log("this is from topbar.js state", this.state)
  }

  render() {    
    return (
      <div>
        <div className="team-choosing">
          <form action="">
          <input type="radio" name="team" value="ARI" onClick={()=>{this.selectTeam("ARI")}}/>
            ARI
            <input type="radio" name="team" value="ATL" onClick={()=>{this.selectTeam("ATL")}}/>
            ATL
            <input type="radio" name="team" value="BAL" onClick={()=>{this.selectTeam("BAL")}}/>
            BAL
            <input type="radio" name="team" value="BUF" onClick={()=>{this.selectTeam("BUF")}}/>
            BUF
            <input type="radio" name="team" value="CAR" onClick={()=>{this.selectTeam("CAR")}}/>
            CAR
            <input type="radio" name="team" value="CHI" onClick={()=>{this.selectTeam("CHI")}}/>
            CHI
            <input type="radio" name="team" value="CIN" onClick={()=>{this.selectTeam("CIN")}}/>
            CIN
            <input type="radio" name="team" value="CLE" onClick={()=>{this.selectTeam("CLE")}}/>
            CLE
            <input type="radio" name="team" value="DAL" onClick={()=>{this.selectTeam("DAL")}}/>
            DAL
             <input type="radio" name="team" value="DEN" onClick={()=>{this.selectTeam("DEN")}}/>
            DEN
            <input type="radio" name="team" value="DET" onClick={()=>{this.selectTeam("DET")}}/>
            DET
            <input type="radio" name="team" value="GB" onClick={()=>{this.selectTeam("GB")}}/>
            GB
            <input type="radio" name="team" value="HOU" onClick={()=>{this.selectTeam("HOU")}}/>
            HOU
            <input type="radio" name="team" value="IND" onClick={()=>{this.selectTeam("IND")}}/>
            IND
            <input type="radio" name="team" value="KC" onClick={()=>{this.selectTeam("KC")}}/>
            KC
            <input type="radio" name="team" value="LAC" onClick={()=>{this.selectTeam("LAC")}}/>
            LAC
            <input type="radio" name="team" value="LA" onClick={()=>{this.selectTeam("LA")}}/>
            LA
            <input type="radio" name="team" value="MIA" onClick={()=>{this.selectTeam("MIA")}}/>
            MIA
            <input type="radio" name="team" value="MIN" onClick={()=>{this.selectTeam("MIN")}}/>
            TB
            <input type="radio" name="team" value="NE" onClick={()=>{this.selectTeam("NE")}}/>
            NE
            <input type="radio" name="team" value="NO" onClick={()=>{this.selectTeam("NO")}}/>
            NO
            <input type="radio" name="team" value="NYG" onClick={()=>{this.selectTeam("NYG")}}/>
            NYG
            <input type="radio" name="team" value="NYJ" onClick={()=>{this.selectTeam("NYJ")}}/>
            NYJ
            <input type="radio" name="team" value="OAK" onClick={()=>{this.selectTeam("OAK")}}/>
            OAK
            <input type="radio" name="team" value="PHI" onClick={()=>{this.selectTeam("PHI")}}/>
            PHI
            <input type="radio" name="team" value="PIT" onClick={()=>{this.selectTeam("PIT")}}/>
            PIT
            <input type="radio" name="team" value="SF" onClick={()=>{this.selectTeam("SF")}}/>
            SF
            <input type="radio" name="team" value="SEA" onClick={()=>{this.selectTeam("SEA")}}/>
            SEA
             <input type="radio" name="team" value="TB" onClick={()=>{this.selectTeam("TB")}}/>
            TB
            <input type="radio" name="team" value="TEN" onClick={()=>{this.selectTeam("TEN")}}/>
            TEN
            <input type="radio" name="team" value="WAS" onClick={()=>{this.selectTeam("WAS")}}/>
            WAS
          </form>
        </div>
                <Realgraph chosenTeam={this.state.chosenTeam}/>
      </div>
    );
  }
}

export default Graph1;
