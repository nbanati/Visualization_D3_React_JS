import React,{useEffect,useRef,useState} from 'react';
import * as d3 from 'd3';
import '../css/ScatterPlot.css';

 const ScatterPlot = (props) => {

    let scatterRef = useRef(null);
    let data= props.data;
    let width = 1000;
    let height = 500;
    const margin_left=100;
    const margin_right=30;
    const margin_top=20;
    const margin_bottom=100;
    const effective_width= width - margin_left - margin_right;
    const effective_height= height - margin_top - margin_bottom;
    const xVariable = props.chartVariableX;
    const yVariable = props.chartVariableY;
    const isXNumeric = props.isXNumeric;
    const isYNumeric = props.isYNumeric;

    useEffect(()=>{
        clearBoard();
        draw();
    },[props]);

    const clearBoard=()=>{
        const accessToRef = d3.select(scatterRef.current)
        accessToRef.selectAll("svg > *").remove();
    }

    const draw =() =>{

        let xdataGrouped,ydataGrouped;

        const accessToRef = d3.select(scatterRef.current)
                                .attr("height",height)
                                .attr("width",width)
                                .style("background-color","#f5f5f5")
                                .append("g")
                                    .attr("transform", "translate(" + margin_left + "," + margin_top + ")");

        var xAxis;
        if(isXNumeric)
        {   xAxis= d3.scaleLinear()
                    .domain([0, d3.max(data, function(d) { return 1.2*d[xVariable] })])
                    .range([ 0, effective_width ]);
        }
        else{
            xdataGrouped= d3.nest() 
                            .key(function (d) { return d[xVariable]; }) 
                            .entries(data); 
            xAxis = d3.scaleBand()
                        .domain(xdataGrouped.map(function(d) { return d.key; }))
                        .range([0, effective_width])
                        .paddingInner(0.1)
                        .paddingOuter(0.1);
        }

        if(xdataGrouped && xdataGrouped.length>20)
        {
            let axisNode= accessToRef.append("g")
            .attr("transform", "translate(0," + effective_height + ")")
            .call(d3.axisBottom(xAxis));
            
            axisNode.selectAll("text")
            .attr("y", 0)
            .attr("x", 10)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

            axisNode.call(g => g.append("text")
                .style("font-size", "18px")
                .attr("x", effective_width/2)
                .attr("y", -margin_top+80)
                .attr("fill", "blue")
                .attr("text-anchor", "start")
                .text(xVariable));

        }
        else{
        accessToRef.append("g")
                   .attr("transform", "translate(0," + effective_height + ")")
                   .call(d3.axisBottom(xAxis))
                   .call(g => g.append("text")
                    .style("font-size", "18px")
                    .attr("x", effective_width/2)
                    .attr("y", -margin_top+80)
                    .attr("fill", "blue")
                    .attr("text-anchor", "start")
                    .text(xVariable));
        }
        var yAxis;
        if(isYNumeric)
        {   yAxis = d3.scaleLinear()
                  .domain([0, d3.max(data, function(d) { return 1.2*d[yVariable] })])
                  .range([ effective_height, 0]);
        }
        else{
            ydataGrouped= d3.nest() 
                                .key(function (d) { return d[yVariable]; }) 
                                .entries(data); 
            yAxis = d3.scaleBand()
                .domain(ydataGrouped.map(function(d) { return d.key; }))
                .range([effective_height, 0])
                .paddingInner(0.1)
                .paddingOuter(0.1);
        }

        accessToRef.append("g")
            .call(d3.axisLeft(yAxis))
            .call(g => g.append("text")
                .style("font-size", "18px")
                .attr("x", -effective_height/2+100)
                .attr("y", -margin_left+20)
                .attr("fill", "red")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .text(yVariable));
        
        if(!isXNumeric && !isYNumeric && (xdataGrouped && xdataGrouped.length<=20) && (ydataGrouped && ydataGrouped.length<=20))
        {
            accessToRef.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
                .append("circle")
                .attr("cx", function (d) { return  xAxis(d[xVariable])+xAxis.bandwidth()/2 + ((Math.random()*2 -1)*30) })
                .attr("cy", function (d) { return  yAxis(d[yVariable])+yAxis.bandwidth()/2 + ((Math.random()*2-1)*30) } )
                .attr("r", 3)
                .style("fill", "green")   ;
        }   
        else{     
        accessToRef.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
                .append("circle")
                .attr("cx", function (d) { return isXNumeric? xAxis(d[xVariable]) : xAxis(d[xVariable])+xAxis.bandwidth()/2 })
                .attr("cy", function (d) { return isYNumeric? yAxis(d[yVariable]) : yAxis(d[yVariable])+yAxis.bandwidth()/2 } )
                .attr("r", 3)
                .style("fill", "green")   ;
        }

    }
    return(
        <div>
            <span>{ <div>
                        <div className="scatterText" id="xvar"><b>Variable on X axis: {xVariable ? xVariable : "Select X axis variable"}</b></div>
                        <div className="scatterText" id="yvar"><b>Variable on Y axis: {yVariable ? yVariable : "Select Y axis variable"}</b></div>
                    </div>
                }</span>
            {
              xVariable && yVariable ? <svg ref={scatterRef}></svg> : <div />
            }
        </div>
    );

};
export default ScatterPlot;


