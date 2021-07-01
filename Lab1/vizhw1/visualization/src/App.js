import './App.css';
import {useState,useEffect} from 'react';
import * as d3 from "d3";
import BarChart from "../src/components/BarChart";
import Histogram from "../src/components/Histogram";
import ScatterPlot from "../src/components/ScatterPlot";
import NavBar from '../src/components/NavBar';
import csvFile from '../src/data/processed.csv';
import HomePage from '../src/components/HomePage';

function App() {

  const [state, setState] = useState(0);
  const [dataState, setDataState] = useState();
  const [currentVariable, setCurrentVariable] = useState('');
  const [scatterVariables, setScatterVariables] = useState();
  let csvData=[];
  let data3=[{v1:1,v2:1},{v1:2,v2:2},{v1:3,v2:3},{v1:4,v2:4},{v1:5,v2:5}];
  let variables= ["v1","v2","v3","v4"];
  let numerical = ["v1","v2","v4"];
  let categorical =["v3"];

  const selectChart=(chartN,selVariable,axis)=>{
    setState(chartN);
    setCurrentVariable(selVariable);
    if(chartN===3)
    {
      let isXNumeric = "", isYNumeric = "", xVariable = "", yVariable = "";
      let tempState= {...scatterVariables};
      if(axis==="x")
      {
        //xVariable=selVariable;
        isXNumeric= numerical.indexOf(selVariable) !== -1 ? true : false;
        tempState.xvar=selVariable;
        tempState.isXNum = isXNumeric;
      }
      if(axis==="y")
      {
        //yVariable=selVariable;
        isYNumeric= numerical.indexOf(selVariable) !== -1 ? true : false;
        tempState.yvar=selVariable;
        tempState.isYNum = isYNumeric;
      }
      setScatterVariables(tempState);
    }
    else{
      setScatterVariables('');
    }
  };

  useEffect(()=>{
    d3.csv(csvFile,function(data){csvData=data;setDataState(data)});
  },[currentVariable]);
  numerical =["Extremely Low Income Units","Very Low Income Units","Low Income Units","Counted Rental Units","Counted Homeownership Units","All Counted Units","Total Units"];
  categorical =["Program Group","Borough","Postcode","Council District","Census Tract","NTA - Neighborhood Tabulation Area","Reporting Construction Type","Prevailing Wage Status"];	

  return (
    <div>
        <div className="header"> <center><b> New York Housing Units by Building</b></center></div>
          <center>
            <NavBar changeChart={selectChart} numericVariables={numerical} categoricalVariables={categorical} />
          </center>
          <div className="home">
            {state===0 ? <HomePage numeric={numerical} categoric={categorical} /> :<div/>}
          </div>
          <center>
            {state===1 ? <BarChart data={dataState} chartVariable={currentVariable}/>  : <div/>}
            {state===2 ? <Histogram data={dataState} chartVariable={currentVariable}/> : <div/>}
            {state===3 ? <ScatterPlot data={dataState} chartVariableX={scatterVariables.xvar} chartVariableY={scatterVariables.yvar} isXNumeric={scatterVariables.isXNum} isYNumeric={scatterVariables.isYNum}/> : <div/>}
          </center>
    </div>
  );
}

export default App;
