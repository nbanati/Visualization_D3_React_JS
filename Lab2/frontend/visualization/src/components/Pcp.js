import React,{useEffect,useRef,useState} from 'react';
import * as d3 from 'd3';
import '../css/ScatterPlot.css';
import axios from 'axios';
import '../css/Pcp.css';

 const Pcp = (props) => {
    let scatterRef = useRef(null);
    const [state, setState] = useState();
    const [dimensions, setDimensions] = useState();
    const [mdsPcpButton, setMdsPcpButton] = useState(false);
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var width = 1400 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var y = {};
    var dragging = {};
    var line = d3.line();
    var background_lines,foreground_lines;
    var tempDims;
    const colormap=["red","blue","black","green"];
    const create_dimensions=(tempState)=>{
        let dimensionz =[];
        let tempObj={};
        Object.keys(tempState[0]).map(function(key,index){
            if(key!='color'){
                if(typeof tempState[0][key] ==="number")
                {
                    tempObj={
                        name: key,
                        scale: d3.scaleLinear().range([height, 0]),
                        type: "number"
                    };
                }
                else
                {
                    tempObj={
                        name: key,
                        scale: d3.scaleBand().range([0, height]),
                        type: "string"
                    };
                }
                dimensionz.push(tempObj);
            }
        });
        setDimensions(dimensionz);
        tempDims=dimensionz;
    }

    const create_dimensions_msdpcp=(arr)=>{
        let dimensionz =[];
        let tempObj={};
        for(let i=0;i<arr.length;i++)
        {
            tempObj={
                    name: arr[i],
                    scale: d3.scaleLinear().range([height, 0]),
                    type: "number"
                };
            dimensionz.push(tempObj);
        }
        setDimensions(dimensionz);
        tempDims=dimensionz;
    };
    
    var x;

    useEffect(()=>{
        if(props.readFromMDSV==undefined || mdsPcpButton==false){
            axios.get('http://localhost:5000/pcp').then((repos) => {
                const allRepos = repos.data;
                let parsedResponse = JSON.parse(allRepos);
                let tempState = parsedResponse;
                var no_of_dimensions = Object.keys(parsedResponse[0]).length - 1;
                create_dimensions(parsedResponse);
                    tempDims.forEach(function(dimension) {
                        dimension.scale.domain(dimension.type === "number"
                            ? d3.extent(parsedResponse, function(d) { return +d[dimension.name]; })
                            : parsedResponse.map(function(d) { return d[dimension.name]; }).sort());
                    });
                setState(tempState);
                clearBoard();
                draw();
            });
        }
        else if(mdsPcpButton==true){
            axios.get('http://localhost:5000/mdspcp').then((repos) => {
                const allRepos = repos.data;
                let parsedResponse = JSON.parse(allRepos);
                let tempState = parsedResponse;
                create_dimensions_msdpcp(props.readFromMDSV);
                    tempDims.forEach(function(dimension) {
                        dimension.scale.domain(dimension.type === "number"
                            ? d3.extent(parsedResponse, function(d) { return +d[dimension.name]; })
                            : parsedResponse.map(function(d) { return d[dimension.name]; }).sort());
                    });
                setState(tempState);
                clearBoard();
                draw();
            });
        }
        clearBoard();
        draw();
    },[props,mdsPcpButton]);

    useEffect(()=>{
        clearBoard();
        draw();
    },[state,dimensions]);

    const clearBoard=()=>{
        const accessToRef = d3.select(scatterRef.current);
        accessToRef.selectAll("svg > *").remove();
    }


    const coordinate=(d)=>{
        var v = dragging[d.name];
        return v == null ? x(d.name) : v;
    }

    const transition=(g)=>{
        return g.transition().duration(500);
    }

    const path=(d)=>{
        return line(dimensions.map(function(dimension) {
            var draggingV = dragging[dimension.name];
            var xpoint = draggingV == undefined ? x(dimension.name) : draggingV;
            let ypoint = dimension.type==="string" ? dimension.scale(d[dimension.name]) + dimension.scale.bandwidth()/2 : dimension.scale(d[dimension.name]);
            return [xpoint, ypoint];
        }));
    }
            
     const brushstart=()=>{
            d3.event.sourceEvent.stopPropagation();
    };

    const brush=(svg)=>{
        var actives = [];
        svg.selectAll(".brush")
            .filter(function (d) {
                return d3.brushSelection(this);
            })
            .each(function (key) {
                actives.push({
                    dimension: key,
                    extent: d3.brushSelection(this)
                });
            });
        if (actives.length === 0) {
            foreground_lines.style("display", null);
        } else {
            foreground_lines.style("display", function (d) {
                return actives.every(function (brushObj) {
                    return brushObj.extent[0] <= brushObj.dimension.scale(d[brushObj.dimension.name]) && brushObj.dimension.scale(d[brushObj.dimension.name]) <= brushObj.extent[1];
                }) ? null : "none";
            });
        }
    }

    const handleChange=(e)=>{
        if(e.target.checked==true)
        {
            setMdsPcpButton(true);
        }
        else{
            setMdsPcpButton(false);
        }
    }

    const draw =() =>{

        if(state!=undefined){
            x = d3.scalePoint()
                    .domain(dimensions.map(function(d) { return d.name; }))
                    .range([0, width]);

            var svg = d3.select(scatterRef.current)
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            if(state!=undefined){
                background_lines = svg.append("g")
                                .attr("class", "background")
                                .selectAll("path")
                                .data(state)
                                .enter()
                                .append("path")
                                .attr("d", path);
            
                foreground_lines = svg.append("g")
                                .attr("class", "foreground")
                                .selectAll("path")
                                .data(state)
                                .enter().append("path")
                                .attr("d", path)
                                .style("stroke",function(d){return colormap[d['color']]});
            
                var g = svg.selectAll(".dimension")
                            .data(dimensions)
                            .enter().append("g")
                            .attr("class", "dimension")
                            .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; })
                            .call(d3.drag()
                            .on("start", function(d) {
                                    dragging[d.name] = x(d.name);
                                    background_lines.attr("visibility","hidden");
                                    })
                            .on("drag", function(d) {
                                dragging[d.name] = Math.min(width, Math.max(0, d3.event.x));
                                foreground_lines.attr("d", path);
                                dimensions.sort(function(a, b) { return coordinate(a) - coordinate(b); });
                                x.domain(dimensions.map(function(d) { return d.name; }));
                                g.attr("transform", function(d) { return "translate(" + coordinate(d) + ")"; })
                            })
                            .on("end", function(d) {
                                delete dragging[d.name];
                                transition(d3.select(this)).attr("transform", "translate(" + x(d.name) + ")");
                                transition(foreground_lines).attr("d", path);
                                background_lines
                                    .attr("d", path)
                                    .transition()
                                    .delay(500)
                                    .duration(0)
                                    .attr("visibility", null);
                            })
                        );
                
                g.append("g")
                .attr("class", "axis")
                .each(function(d) { 
                    d3.select(this)
                    .call(d3.axisLeft()
                    .scale(d.scale));
                 })
                .append("text")
                .style("text-anchor", "middle")
                .attr("class", "axis-label")
                .attr("y", -19)
                .style("fill","black")
                .style("font-size",7)
                .text(function(d) { return d.name; });
                
                g.append("g")
                    .attr("class", "brush")
                    .each(function(d)
                    {
                        d3.select(this)
                        .call(d.scale.brush = d3.brushY().extent([[-10,0],[10,height]])
                        .on("start", brushstart)
                        .on("brush", function(d){brush(svg)})
                        .on("end", function(d){brush(svg)}));
                    })
                    .selectAll("rect")
                    .attr("x", -8)
                    .attr("width", 16);
            }
        }
    }
    return(
        <div>
            <h3><u>Parallel Coordinates Plot</u></h3>
            <input type="checkbox" id="mds" name="mds" value="mds" onChange={handleChange}></input>
            <label for="mds"> Select to Activate MDS-PCP Mode </label>
            {
              state ? <div>
                  <svg ref={scatterRef}></svg>
                  <div className="legend"><b>Color Legend</b><br/>
                        Red   -  Cluster 1<br/>
                        Blue  -  Cluster 2<br/>
                        Black-  Cluster 3<br/>
                        Green  -  Cluster 4<br/>
                  </div>
                  <br/>
                  </div> : <div />
            }
        </div>
    );

};
export default Pcp;


