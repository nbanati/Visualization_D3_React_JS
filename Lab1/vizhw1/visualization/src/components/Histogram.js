import React,{useEffect,useRef, useState} from 'react';
import * as d3 from 'd3';
import d3tip from "d3-tip";

 const Histogram = (props) => {

    let histoRef = useRef(null);
    let data= props.data;
    let width = 1000;
    let height = 500;
    const margin_left=100;
    const margin_right=30;
    const margin_top=20;
    const margin_bottom=100;
    const effective_height = height - margin_bottom - margin_top;
    const effective_width = width - margin_left -  margin_right;
    const bar_magnification =  0.1;
    const selectedVariable=props.chartVariable;
    const binChangeSize = 5;

    const [state, setState] = useState({secondX:0,isChangeBins:false});
    const [firstXState, setFirstXState] = useState(0);
    const [nBins, setNBins] = useState(10);

    const tip = d3tip()
    .attr('class', 'd3-tip animate')
    .offset([-20, 0])
    .html(function(d) {
        return '<strong><font color="red">'+ d+'</font></strong>';
      });

    const dragstarted=()=>{
        var current = d3.select(this);
        var a=d3.event.x;
        setFirstXState(a);
    }

    const dragended=()=>{
        var current = d3.select(this);
        var a=d3.event.x;
        var tempState = {...state, secondX:a, isChangeBins:true};
        setState(tempState);
    }

    useEffect(()=>{
        setFirstXState(firstXState);
    },[firstXState]);

    useEffect(()=>{
        clearBoard();
        if(state.isChangeBins)
        {
            let changeInBins=0;
            if(firstXState-state.secondX<0)
                changeInBins=-1*binChangeSize;
            else if(firstXState-state.secondX>0)
                changeInBins=binChangeSize;
            setState({...state,isChangeBins:false});

            draw(changeInBins);
        }   
        else
        {
                draw(0);
        }
    },[state,props]);

    const clearBoard = ()=>{
        const accessToRef = d3.select(histoRef.current)
        accessToRef.selectAll("svg > *").remove();
        d3.select(".d3-tip").remove();
    }

    const draw =(changeInBins) =>{

        let processedData=[];
        data.forEach(function(d) {			
            processedData.push(+d[selectedVariable]);
        })
        const accessToRef = d3.select(histoRef.current)
        .attr("height",height)
        .attr("width",width)
        .style("background-color","#f5f5f5")
        .append("g")
            .attr("transform","translate("+margin_left+","+margin_top+")"); 

         //make a background node
         const background = accessToRef
         .append("rect")
         .attr("x", 0)
         .attr("y", 0)
         .attr("width", effective_width)
         .attr("height", effective_height)
         .style("fill","#f5f5f5")
         .call(d3.drag()
         .on("start",dragstarted)
         .on("end",dragended));

        const svg = accessToRef;
        var xAxis = d3.scaleLinear()
                    .domain([0, d3.max(processedData, function(d) { return d })])
                    .range([0, effective_width]);

        svg.append("g")
           .attr("transform", "translate(0," + effective_height + ")")
           .call(d3.axisBottom(xAxis))
           .call(g => g.append("text")
            .style("font-size", "18px")
            .attr("x", effective_width/2)
            .attr("y", -margin_top+80)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(selectedVariable));
        
        if(nBins+changeInBins>=0)
            setNBins(nBins+changeInBins);
        var histogram = d3.histogram()
            .value(function(d) { return d; })
            .domain(xAxis.domain())  
            .thresholds(xAxis.ticks(nBins)); // then the numbers of bins
        var bins = histogram(processedData);
        var yAxis = d3.scaleLinear()
                  .range([effective_height, 0])
                  .domain([0, d3.max(bins, function(d) { return 1.2*d.length; })]);  
        
        svg.append("g")
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
          
        svg.append("g")
            //.attr("transform", "translate(0"+","+margin_bottom+")")
            .selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + xAxis(d.x0) + "," + yAxis(d.length) + ")"; })
            .attr("width", function(d) { return d.x1!==d.x0 ?  xAxis(d.x1) - xAxis(d.x0) -1 : bins[0].x1-bins[0].x0 ; })
            .attr("height", function(d) { return  effective_height - yAxis(d.length); })
            .style("fill", "#2e8083")
            .on('mouseover', function (d, i) {
                //tip.rootElement(this);
                tip.show(d.length,this);
                d3.select(this)
                     .transition()
                     .duration('50')
                     .attr("transform",function(d){ return "translate("+xAxis(d.x0)+","+(yAxis(d.length)-5)+")"})
                     //.attr("width", function(d) { return (1+bar_magnification)*(d.x1!==d.x0 ?  xAxis(d.x1) - xAxis(d.x0) -1 : bins[0].x1-bins[0].x0) ; })
                     .attr("height", function(d) { return (effective_height - yAxis(d.length)+5); })
                     .style("fill","red");
                
                //tip.html("<strong><span style='color:black'>"+ d + "</strong></span>");
                
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                     .duration('50')
                     .attr("transform",function(d){ return "translate("+xAxis(d.x0)+","+yAxis(d.length)+")"})
                     //.attr("width", function(d) { return d.x1!==d.x0 ?  xAxis(d.x1) - xAxis(d.x0) -1 : bins[0].x1-bins[0].x0 ; })
                     .attr("height", function(d) { return effective_height - yAxis(d.length); })
                     .style("fill","#2e8083");
                tip.hide();
            })
            .call(d3.drag()
                .on("start",dragstarted)
                .on("end",dragended));

	    svg.call(tip);

    };

    return(
        <div>
            
            <svg ref={histoRef}></svg>
        </div>
    );

};
export default Histogram;


