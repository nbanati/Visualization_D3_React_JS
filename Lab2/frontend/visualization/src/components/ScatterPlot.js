import React,{useEffect,useRef,useState} from 'react';
import * as d3 from 'd3';
import '../css/ScatterPlot.css';
import axios from 'axios';

 const ScatterPlot = (props) => {

    let scatterRef = useRef(null);
    const [state, setState] = useState();
    let data= props.data;
    let width = 1000;
    let height = 500;
    const margin_left=100;
    const margin_right=30;
    const margin_top=20;
    const margin_bottom=100;
    const effective_width= width - margin_left - margin_right;
    const effective_height= height - margin_top - margin_bottom;
    let xData ; 
    let yData ; 
    let color ; 
    const colormap=["red","blue","black","green"];
    useEffect(()=>{
        axios.get('http://localhost:5000/mds_data').then((repos) => {
            const allRepos = repos.data;
            let parsedResponse = JSON.parse(allRepos);
            let tempState = {'first':parsedResponse['first'],'second':parsedResponse['second'],'color':parsedResponse['color']};
            setState(tempState);
            clearBoard();
            draw();
      });
        clearBoard();
        //draw();
    },[props]);

    useEffect(()=>{
        clearBoard();
        draw();
    },[state])

    const clearBoard=()=>{
        const accessToRef = d3.select(scatterRef.current)
        accessToRef.selectAll("svg > *").remove();
    }

    const draw =() =>{
        if(state!=undefined)
        {
             xData = state.first;
            yData = state.second;
        }
        if(xData!=undefined && yData!=undefined)
        {
            const accessToRef = d3.select(scatterRef.current)
                                    .attr("height",height)
                                    .attr("width",width)
                                    .style("background-color","#f5f5f5")
                                    .append("g")
                                    .attr("transform", "translate(" + margin_left + "," + margin_top + ")");

            var xAxis= d3.scaleLinear()
                        .domain([d3.min(Object.keys(xData), function(d) { return 1.2*xData[d] }), d3.max(Object.keys(xData), function(d) { return 1.2*xData[d] })])
                        .range([ 0, effective_width ]);
            
            accessToRef.append("g")
                    .attr("transform", "translate(0," + effective_height + ")")
                    .call(d3.axisBottom(xAxis))
                    .call(g => g.append("text")
                        .style("font-size", "18px")
                        .attr("x", effective_width/2)
                        .attr("y", -margin_top+80)
                        .attr("fill", "blue")
                        .attr("text-anchor", "start")
                        .text("Component 1"));
            
            var yAxis = d3.scaleLinear()
                    .domain([d3.min(Object.keys(yData), function(d) { return 1.2*yData[d] }), d3.max(Object.keys(yData), function(d) { return 1.2*yData[d] })])
                    .range([ effective_height, 0]);

            accessToRef.append("g")
                .call(d3.axisLeft(yAxis))
                .call(g => g.append("text")
                    .style("font-size", "18px")
                    .attr("x", -effective_height/2+100)
                    .attr("y", -margin_left+20)
                    .attr("fill", "red")
                    .attr("text-anchor", "end")
                    .attr("transform", "rotate(-90)")
                    .text("Component 2"));
            
            accessToRef.append('g')
                .selectAll("dot")
                .data(Object.keys(xData))
                .enter()
                    .append("circle")
                    .attr("cx", function (d) { return xAxis(xData[d])  })
                    .attr("cy", function (d) { return yAxis(yData[d]) } )
                    .attr("r", 3)
                    .style("fill", function (d) { return colormap[state.color[d]]})   ;
        }
}
    return(
        <div>
            <br/><br/><br/>
            {
              state ? <div>
                <h3><u>MDS Data Plot using Euclidian distance</u></h3>
                <svg ref={scatterRef}></svg>
                <br/>
                <div className="legend"><b>Color Legend</b><br/>
                    Red   -  Cluster 1<br/>
                    Blue  -  Cluster 2<br/>
                    Black-  Cluster 3<br/>
                    Green  -  Cluster 4<br/>
                </div>
                <br/>
              </div>: <div > Loading .... </div>
            }
        </div>
    );

};
export default ScatterPlot;


