import '../css/NavBar.css';
import React from 'react';

const NavBar=(props)=>{

    
    return(
         <div className="mainBar">
            <div className="options" onClick={()=>props.changeChart(1)}>
                <img src="https://img.icons8.com/metro/26/000000/combo-chart.png" height="15" width="15"/><br/><br/>
                <b>ScreePlot </b>
            </div>
            <div className="options" onClick={()=>props.changeChart(2)}>
                <img src="https://img.icons8.com/dotty/80/000000/graph.png" height="15" width="15" /><br/><br/>
                <b>BiPlot </b>
            </div>
            <div className="options" onClick={()=>props.changeChart(3)}>
            <img src="https://img.icons8.com/small/16/000000/grid.png" height="15" width="15" /><br/><br/>
                <b>ScatterPlot Matrix </b>
            </div>
            <div className="options" onClick={()=>props.changeChart(4)}>
                <img src="https://img.icons8.com/metro/26/000000/scatter-plot.png" height="15" width="15" /><br/><br/>
                <b>MDS Data Plot</b>
            </div>
            <div className="options" onClick={()=>props.changeChart(5)}>
                <img src="https://img.icons8.com/metro/26/000000/scatter-plot.png" height="15" width="15" /><br/><br/>
                <b>MDS Variables Plot </b>
            </div>
            <div className="options" onClick={()=>props.changeChart(6)}>
            <img src="https://img.icons8.com/fluent-systems-filled/24/000000/grip-lines-vertical.png" height="15" width="15" /><br/><br/>
                <b>Parallel Coordinates Plot </b>
            </div>
        </div>
    );
};

export default NavBar;