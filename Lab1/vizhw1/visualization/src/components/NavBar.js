import '../css/NavBar.css';
import React from 'react';
import Dropdown from '../molecules/Dropdown';

const NavBar=(props)=>{

    let allVariables= [...props.numericVariables];
    allVariables.push.apply(allVariables,props.categoricalVariables);
    let selectedVariable;

    const selectVariable=(chartNumber,selectedVariable,axis)=>{
        props.changeChart(chartNumber,selectedVariable,axis);
    }
    
    return(
         <div className="mainBar">
            <div className="options">
                <img src="https://img.icons8.com/pastel-glyph/64/000000/bar-chart.png" height="15" width="15"/><br/><br/>
                <b>Bar Chart </b>
                <div className="dropDownMenu">
                    <Dropdown variableNames={props.categoricalVariables} chartNumber={1} changeVariable={selectVariable}/>
                </div>
            </div>
            <div className="options">
                <img src="https://img.icons8.com/metro/26/000000/combo-chart.png" height="15" width="15" /><br/><br/>
                <b>Histogram </b>
                <div className="dropDownMenu">
                    <Dropdown variableNames={props.numericVariables} chartNumber={2} changeVariable={selectVariable}/>
                </div>
            </div>
            <div className="options">
                <img src="https://img.icons8.com/metro/26/000000/scatter-plot.png" height="15" width="15" /><br/><br/>
                <b>ScatterPlot </b>
                <div className="dropDownMenu">
                    <Dropdown variableNames={allVariables} chartNumber={3} changeVariable={selectVariable}/>
                </div>
            </div>
        </div>
    );
};

export default NavBar;