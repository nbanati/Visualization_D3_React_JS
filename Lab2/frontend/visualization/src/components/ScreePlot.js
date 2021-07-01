import React,{useEffect,useRef,useState} from 'react';
import * as d3 from 'd3';
import d3tip from "d3-tip";
import axios from 'axios';

 const ScreePlot=(props)=>{

    const colors=["blue","green","gold","grey","orange","yellow","pink","cyan","magenta","brown","black","tomato"];
    const [scree, setScreeState] = useState();
    const [dim, setDimState] = useState();
    const chartRef = useRef(null);
    let data= props.data;
    const width = 1000;
    const height = 500;
    const margin_left=100;
    const margin_right=30;
    const margin_top=20;
    const margin_bottom=100;
    const effective_width= width - margin_left - margin_right;
    const effective_height= height - margin_top - margin_bottom;
    let chartVariable= props.chartVariable;

    const tip = d3tip()
    .attr('class', 'd3-tip animate')
    .offset([-20, 0])
    .html(function(d) {
        return '<strong><font color="red">'+ d+'</font></strong>';
      });

    useEffect(()=>{

        axios.get('http://localhost:5000/scree_plot').then((repos) => {
            const allRepos = repos.data;
            setScreeState(allRepos);
          });

        clearBoard();
        draw();
    },[props]);

    const clearBoard = ()=>{
        const accessToRef = d3.select(chartRef.current)
        accessToRef.selectAll("svg > *").remove();
        d3.select(".d3-tip").remove();
    }

    const draw=()=>{
    if(scree!=undefined)
    {
        const accessToRef = d3.select(chartRef.current)
        .attr("height",height)
        .attr("width",width)
        .style("background-color","#f5f5f5")
        .append("g")
            .attr("transform","translate("+margin_left+","+margin_top+")"); 

        var xAxis = d3.scaleBand()
                    .domain(scree['variance'].map(function(d,i) { return "PC "+ (i+1); }))
                    .range([0, effective_width])
                    .paddingInner(0.1)
                    .paddingOuter(0.1);

        accessToRef.append("g")
            .attr("transform", "translate(0," + effective_height + ")")
            .call(d3.axisBottom(xAxis))
            .call(g => g.append("text")
                .style("font-size", "18px")
                .attr("x", effective_width/2)
                .attr("y", -margin_top+80)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("Principal Components"));

        var yAxis = d3.scaleLinear()
            .range([effective_height, 0])
            .domain([0, 1]);//d3.max(scree['variance'],function(d) { return 1.2*d; })]); 
  
        accessToRef.append("g")
            //.attr("transform", "translate(0"+","+margin_bottom+")")
            .call(d3.axisLeft(yAxis))
            .call(g => g.append("text")
                .style("font-size", "18px")
                .attr("x", -effective_height/2)
                .attr("y", -margin_left+20)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .text("Explained Variance"));

        let barWidth= xAxis.bandwidth();
        accessToRef.selectAll("rect")
            .data(scree['variance'])
            .enter()
            .append("rect")
                .attr("x",(d,i) => {return xAxis("PC "+ (i+1))}) 
                .attr("y",(d,i) => { return  yAxis(d)})
                .attr("width", barWidth)
                .attr("height",(d,i)=> {return effective_height - yAxis(d)})
                .style("fill",(d,i)=> "blue")
                .on('mouseover', function (d, i) {
                    tip.show(d,this);
                    d3.select(this)
                         .transition()
                         .duration('50')
                         .style("fill","red");
                })
                .on('mouseout', function (d, i) {
                    d3.select(this).transition()
                         .duration('50')
                         .style("fill","blue");
                    tip.hide();
                })
                .on("click", function(d,i) {
                    setDimState(i);
                    d3.event.stopPropagation();
                    props.changeDim(i+1);
                  });

        accessToRef.append("path")
                .datum(scree["variance_cumulative"])
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                  .x(function(d,i) { return xAxis("PC "+ (i+1))+ xAxis.bandwidth()/2})
                  .y(function(d) { return yAxis(d) })
                  );
        accessToRef.selectAll("myCircles")
                  .data(scree["variance_cumulative"])
                  .enter()
                  .append("circle")
                    .attr("fill", "red")
                    .attr("stroke", "none")
                    .attr("cx", function(d,i) { return xAxis("PC "+ (i+1)) + xAxis.bandwidth()/2 })
                    .attr("cy", function(d) { return yAxis(d) })
                    .attr("r", 3)
                  .on('mouseover', function (d, i) {
                        tip.show(d,this);
                    })
                    .on('mouseout', function (d, i) {
                        tip.hide();
                    });
        accessToRef.call(tip);
    }
}

    return(
        <div>
            <h3><u>Scree Plot</u></h3>
            <div>Dimensionality index is : {dim+1 ? dim+1:" Select Dimensionality Index"} </div>
            {scree ? <svg ref={chartRef}></svg> :<div/>}
        </div>
    );
};

export default ScreePlot;
