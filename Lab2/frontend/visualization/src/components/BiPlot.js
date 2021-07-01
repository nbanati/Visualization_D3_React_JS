import React,{useEffect,useRef,useState} from 'react';
import * as d3 from 'd3';
import '../css/ScatterPlot.css';
import axios from 'axios';

 const BiPlot = (props) => {

    let scatterRef = useRef(null);
    const [bi, setBiState] = useState();
    let data= props.data;
    let width = 1000;
    let height = 500;
    const margin_left=100;
    const margin_right=10;
    const margin_top=20;
    const margin_bottom=70;
    const effective_width= width - margin_left - margin_right;
    const effective_height= height - margin_top - margin_bottom;
    const xVariable = props.chartVariableX;
    const yVariable = props.chartVariableY;
    const isXNumeric = props.isXNumeric;
    const isYNumeric = props.isYNumeric;

    useEffect(()=>{
        axios.get('http://localhost:5000/bi_plot').then((repos) => {
            const allRepos = repos.data;
            let  vectors = JSON.parse(allRepos['eigen_vectors'][0]);
            let loadings = JSON.parse(allRepos['feature_coordinates'][0]);
            let obj={
                'eigen_vectors':vectors,
                'feature_coordinates':loadings
            };
            setBiState(obj);
            clearBoard();
            draw();
          });

    },[props]);

    useEffect(()=>{
        clearBoard();
        draw();
    },[bi])

    const clearBoard=()=>{
        const accessToRef = d3.select(scatterRef.current)
        accessToRef.selectAll("svg > *").remove();
    }

    const draw =() =>{
    if(bi!=undefined)
    {
        let xdataGrouped,ydataGrouped;

        const accessToRef = d3.select(scatterRef.current)
                                .attr("height",height)
                                .attr("width",width)
                                .style("background-color","#f5f5f5")
                                .append("g")
                                    .attr("transform", "translate(" + margin_left + "," + margin_top + ")");

        let a=bi['eigen_vectors']['PC 1'];
        let b=[2.111111,2.13223434,2.174354353];
        let mmax = d3.max(Object.keys(a), function(d,i) { return 1 })
        var xAxis = d3.scaleLinear()
                    .domain([-mmax, d3.max(Object.keys(a), function(d,i) { return 1 })])
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
                    .text("PC 1"));

        a = bi['eigen_vectors']['PC 2'];
        mmax= d3.max(Object.keys(a), function(d,i) { return 1 });
        var yAxis = d3.scaleLinear()
                  .domain([-mmax,mmax ])
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
                .text("PC 2"));
        
        let pc1 = bi['eigen_vectors']["PC 1"];
        let pc2 = bi['eigen_vectors']["PC 2"];
        accessToRef.append('g')
            .selectAll("dot")
            .data(Object.keys(bi['eigen_vectors']["PC 1"]))
            .enter()
                .append("circle")
                .attr("cx", function (d,i) { return xAxis(pc1[d])})
                .attr("cy", function (d,i) { return yAxis(pc2[d])})
                .attr("r", 3)
                .style("fill", "green");

        let point_coordinate=0.38;
        pc1 = bi['feature_coordinates']["PC 1"];
        pc2 = bi['feature_coordinates']["PC 2"];
        let node= accessToRef.append('g');
        node.selectAll('.line')
            .data(Object.keys(bi["feature_coordinates"]["PC 1"]))
            .enter()
            .append('line')
                .style("stroke", "black")
                .style("stroke-width", 1)
                .attr("x1", function(d,i) { return xAxis(-point_coordinate)})
                .attr("y1", function(d,i) { return yAxis((pc2[d]/pc1[d])*-point_coordinate)})
                .attr("x2", function(d,i) { return  xAxis(point_coordinate)})
                .attr("y2", function(d,i) { return yAxis((pc2[d]/pc1[d])*point_coordinate) });
        
        node.selectAll('text')
            .data(Object.keys(bi["feature_coordinates"]["PC 1"]))
            .enter()
            .append("text")
            .attr("x", function(d,i) { return xAxis(point_coordinate) })
            .attr("y", function(d,i){ return yAxis((pc2[d]/pc1[d])*point_coordinate)})
            .attr("dy", ".35em")
            .style("font-size", "10px")
            .text(function(d) { return d; });
        
        }
    }
    return(
        <div>
            {
              bi ? 
              <div>
                  <h3><u>PCA-based Biplot</u></h3>
                  <svg ref={scatterRef}></svg>
              </div> : <div >Loading</div>
            }
        </div>
    );  
};
export default BiPlot;


