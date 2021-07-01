import React,{useEffect,useRef,useState} from 'react';
import * as d3 from 'd3';
import '../css/ScatterPlot.css';
import axios from 'axios';

 const ScatterPlotMatrix = (props) => {

    const [table, setTableState] = useState();
    const [scatter, setScatterState] = useState();
    let scatterRef = useRef(null);
    let data= props.data;
    let width = 1000;
    let height = 500;
    const features=[];
    const colormap=["red","blue","green","gold"];

    useEffect(()=>{
        
        axios.get('http://localhost:5000/loading/'+(props.dimensionality?props.dimensionality:4)).then((repos) => {
            const allRepos = repos.data;
            let data= JSON.parse(allRepos);
            let str='<table style="border: 1px solid black">';
            let pc=[];
            let features=[];
            Object.keys(data).map(function(name, index){
                pc[index]=name
            });
            Object.keys(data).map(function(name, index){
                Object.keys(data[name]).map(function(name1,index){
                            features[index]=name1;
                })
            });
            str+='<tr><th>Features</th>';
            for(let j=0;j<pc.length;j++)
            {
                str+='<th>'+pc[j]+'</th>';
            }
            str+='</tr>';
            for(let i=0;i<4;i++)
            {
                str+='<tr><td><b>'+features[i]+'</b></td>';
                for(let j=0;j<pc.length;j++)
                {
                    str+='<td>'+data[pc[j]][features[i]]+'</td>';
                }
                str+='</tr>';
            }
            str+='</table>';
            setTableState(str);
          });

        axios.get('http://localhost:5000/scatterplotmatrix').then((repos) => {
            const allRepos = repos.data;
            let data= JSON.parse(allRepos);
            let temp=data;
            setScatterState(data);
            Object.keys(data).map(function(key,index){
                features[index]=key;
            })
            
            clearBoard();
            draw();
        })
        .catch((error) => {
            console.error("error",error);
        });
    },[props]);

    useEffect(()=>{
        clearBoard();
        draw();
    },[scatter]);

    const clearBoard=()=>{
        const accessToRef = d3.select(scatterRef.current)
        accessToRef.selectAll("svg > *").remove();
    }

    const calculateCellData=(a, b)=>{
        var c = [], n = a.length, m = b.length, i, j;
        for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
        return c;
    }

    const draw =() =>{
        if(scatter!=undefined)
        {
        var response = scatter;
        let names=[];
        Object.keys(response).map(function(name,index){
            names[index]=name;
        });
        let cols = names.slice(0, -1);
        var pcNames = new Object(cols);
        var width = 1000,
        size = 250,
        padding = 20;
        var x = d3.scaleLinear()
                .range([padding/2, size - padding/2]);
        var y = d3.scaleLinear()
                .range([size - padding/2, padding/2]);
        var xAxis = d3.axisBottom(x).tickFormat(function(d){ return d;});
        var yAxis = d3.axisLeft(y).tickFormat(function(d){ return d;});
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        data = {};
        for(let i=0;i<5;i++)
            data[names[i]]= response[names[i]];
        var domainByFtr = {},
        n = pcNames.length;
        xAxis.tickSize(size * n);
        yAxis.tickSize(-size * n);
        pcNames.forEach(function(pcName) {
            domainByFtr[pcName] = d3.extent(d3.values(data[pcName]));
        });

        const svg = d3.select(scatterRef.current)
                        .attr('id', 'chart')
                        .attr("width", size * n + padding)
                        .attr("height", size * n + padding)
                        .append("g")
                        .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

        svg.selectAll(".x.axis")
            .data(pcNames)
            .enter().append("g")
            .attr("class", "x axis")
            .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
            .each(function(d) { x.domain(domainByFtr[d]); d3.select(this).call(xAxis); });

        svg.selectAll(".y.axis")
            .data(pcNames)
            .enter().append("g")
            .attr("class", "y axis")
            .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
            .each(function(d) { y.domain(domainByFtr[d]); d3.select(this).call(yAxis); });

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 + (5))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .style("font-weight", "bold")
            .text("ScatterPlot Matrix");

        var cell = svg.selectAll(".cell")
            .data(calculateCellData(pcNames, pcNames))
            .enter().append("g")
            .attr("class", function(d) {return "cell"+(n - d.i - 1)+d.j;})
            .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
            ;

        let ps= calculateCellData(pcNames,pcNames);
        for(let i=0;i<16;i++){
            let p=ps[i];
            x.domain(domainByFtr[String(p.x)]);
            y.domain(domainByFtr[String(p.y)]);
            d3.selectAll("g.cell"+(n - p.i - 1)+p.j).append("rect")
                .attr("id", "frame")
                .attr("class","rec")
                .attr("x", padding / 2)
                .attr("y", padding / 2)
                .attr("width", size - padding)
                .attr("height", size - padding)
                .style("fill","#e7e7e7")
                .style("fill-opacity",0.7);
            let first_comp = data[String(p.x)];
            let second_comp = data[String(p.y)];
            let result_array = []
            let second = d3.values(second_comp)
            let label = d3.values(data["color"]);
            d3.values(first_comp).forEach(function(item, index) {
                let temp_map = {};
                temp_map["x"] = item;
                temp_map["y"] = second[index];
                temp_map["color"] = label[index];
                result_array.push(temp_map);
            });
            d3.selectAll("g.cell"+(n - p.i - 1)+p.j).selectAll("circle")
                    .data(result_array)
                    .enter().append("circle")
                    .attr("cx", function(d) { return x(d.x); })
                    .attr("cy", function(d) { return y(d.y); })
                    .attr("r", 3)
                    .style("fill", function(d) { return  colormap[d.color]});
        }

        cell.filter(function(d) { return d.i === d.j; }).append("text")
            .attr("x", size/2-padding-30)
            .attr("y", size/2-padding)
            .attr("dy", ".65em")
            .style("font-weight", "bold")
            .style("font-size", "20px")
            .text(function(d) { return d.x; });
    }
}

    return(
        <div>
            <br/><br/>
            { 
                table ?   <div className="content" dangerouslySetInnerHTML={{__html: table}}></div>
                 : <div />  
            }
            <br/><br/>
            {
                scatter ? <div><svg ref={scatterRef}></svg>
                <br/><br/><br/>
                <div className="legend"><b>Color Legend</b><br/>
                    Red   -  Cluster 1<br/>
                    Blue  -  Cluster 2<br/>
                    Green -  Cluster 3<br/>
                    Gold  -  Cluster 4<br/>
                </div>
                <br/>
                </div> : <div />
                
            }
            </div>
    );

};
export default ScatterPlotMatrix;


