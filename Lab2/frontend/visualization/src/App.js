import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import NavBar from '../src/components/NavBar';
import HomePage from '../src/components/HomePage';
import ScreePlot from './components/ScreePlot';
import BiPlot from './components/BiPlot';
import ScatterPlotMatrix from './components/ScatterPlotMatrix';
import ScatterPlot from './components/ScatterPlot';
import Pcp from './components/Pcp';
import MdsVariable from './components/MdsVariable';

function App() {

  const [state, setState] = useState(0);
  const [dataState, setDataState] = useState();
  const [scree, setScreeState] = useState();
  const [dimensionality, setDimState] = useState();
  const [mdsPcp, setMDSPCP] = useState();
  let numerical;
  let categorical;

  const selectChart=(chartN)=>{
    setState(chartN);
  };

  const updatePCP=(arr)=>{
    setMDSPCP(arr);
  };

  const selDimNumber=(n)=>{
    setDimState(n);
  };

  useEffect(()=>{

    axios.get('http://localhost:5000/scree_plot').then((repos) => {
      const allRepos = repos.data;
      setScreeState(allRepos);
    });

  },[state]);
  numerical =["Extremely Low Income Units","Very Low Income Units","Low Income Units","Counted Rental Units","Counted Homeownership Units","All Counted Units","Total Units"];
  categorical =["Program Group","Borough","Postcode","Council District","Census Tract","NTA - Neighborhood Tabulation Area","Reporting Construction Type","Prevailing Wage Status"];	

  return (
    <div>
        <div className="header"> <center><b> New York Housing Units by Building</b></center></div>
          <center>
            <NavBar changeChart={selectChart}/>
          </center>
          <div className="home">
            {state===0 ? <HomePage numeric={numerical} categoric={categorical} /> :<div/>}
          </div>
          <center>
            {state===1 ? <ScreePlot changeDim={selDimNumber} />  : <div/>}
            {state===2 ? <BiPlot/> : <div/>}
            {state===3 ? <ScatterPlotMatrix dimensionality={dimensionality}/> : <div/>}
            {state===4 ? <ScatterPlot /> : <div/>}
            {state===5 ? <MdsVariable updateStatePCP={updatePCP}/> : <div/>}
            {state===6 ? <Pcp readFromMDSV={mdsPcp} /> : <div/>}
          </center>
    </div>
  );
}

export default App;
