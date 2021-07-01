import React,{useEffect,useRef} from 'react';
import * as d3 from 'd3';
import d3tip from "d3-tip";

 const BarChart=(props)=>{

    const colors=["blue","green","gold","grey","orange","yellow","pink","cyan","magenta","brown","black","tomato"];

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
        clearBoard();
        draw();
    },[props]);

    const clearBoard = ()=>{
        const accessToRef = d3.select(chartRef.current)
        accessToRef.selectAll("svg > *").remove();
        d3.select(".d3-tip").remove();
    }

    const draw=()=>{
        //process raw data using group by
        let dataGrouped = d3.nest() 
        .key(function (d) { return d[chartVariable]; }) 
        .entries(data); 

        if(dataGrouped.length>20)
        {
            let newGroup=[];
            dataGrouped.sort(function(a, b) {
                return b.values.length - a.values.length;
            });
            for(let i=0;i<20;i++)
            {
                newGroup.push(dataGrouped[i]);
            }
            let others=0;
            for(let i=20;i<dataGrouped.length;i++)
            {
                others+=dataGrouped[i].values.length;
            }
            let obj ={key:"Other",values:{length:others}};
            newGroup.push(obj);
            dataGrouped=newGroup;
        }
        
        const accessToRef = d3.select(chartRef.current)
        .attr("height",height)
        .attr("width",width)
        .style("background-color","#f5f5f5")
        .append("g")
            .attr("transform","translate("+margin_left+","+margin_top+")"); 

        var xAxis = d3.scaleBand()
                    .domain(dataGrouped.map(function(d) { return d.key; }))
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
                .text(chartVariable));

        var yAxis = d3.scaleLinear()
            .range([effective_height, 0])
            .domain([0, d3.max(dataGrouped,function(d) { return 1.2*d.values.length; })]); 
  
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
                .text("Frequency"));

        let barWidth= xAxis.bandwidth();
        accessToRef.selectAll("rect")
            .data(dataGrouped)
            .enter()
            .append("rect")
                .attr("x",(d,i) => {return xAxis(d.key)})
                .attr("y",(d,i) => { return  yAxis(d.values.length)})
                .attr("width", barWidth)
                .attr("height",(d,i)=> {return effective_height - yAxis(d.values.length)})
                .style("fill",(d,i)=> colors[i%12])
                .on('mouseover', function (d, i) {
                    tip.show(d.values.length,this);
                    d3.select(this)
                         .transition()
                         .duration('50')
                         //.attr("transform",function(d){ return "translate("+xAxis(d.key)+","+(yAxis(d.values.length)-5)+")"})
                         //.attr("height", function(d) { return (effective_height - yAxis(d.values.length)+5); })
                         .style("fill","red");
                })
                .on('mouseout', function (d, i) {
                    d3.select(this).transition()
                         .duration('50')
                         //.attr("transform",function(d){ return "translate("+xAxis(d.key)+","+yAxis(d.values.length)+")"})
                         //.attr("height", function(d) { return effective_height - yAxis(d.length); })
                         .style("fill",colors[i%12]);
                    tip.hide();
                });
        accessToRef.call(tip);
    }

    return(
        <div>
            <br/><br/><br/>
            <svg ref={chartRef}></svg>
        </div>
    );
};

export default BarChart;
