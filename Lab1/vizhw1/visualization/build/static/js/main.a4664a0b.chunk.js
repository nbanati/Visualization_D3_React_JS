(this.webpackJsonpvisualization=this.webpackJsonpvisualization||[]).push([[0],[,,,,,,,,,,,,,,,,function(t,e,n){},function(t,e,n){},,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var r=n(2),a=n.n(r),i=n(10),c=n.n(i),s=(n(16),n(5)),o=n(4),l=(n(17),n(1)),d=n(8),h=n(0),j=function(t){var e=["blue","green","gold","grey","orange","yellow","pink","cyan","magenta","brown","black","tomato"],n=Object(r.useRef)(null),a=t.data,i=380,c=t.chartVariable,s=Object(d.a)().attr("class","d3-tip animate").offset([-20,0]).html((function(t){return'<strong><font color="red">'+t+"</font></strong>"}));Object(r.useEffect)((function(){o(),j()}),[t]);var o=function(){l.k(n.current).selectAll("svg > *").remove(),l.k(".d3-tip").remove()},j=function(){var t=l.h().key((function(t){return t[c]})).entries(a);if(t.length>20){var r=[];t.sort((function(t,e){return e.values.length-t.values.length}));for(var o=0;o<20;o++)r.push(t[o]);for(var d=0,h=20;h<t.length;h++)d+=t[h].values.length;var j={key:"Other",values:{length:d}};r.push(j),t=r}var b=l.k(n.current).attr("height",500).attr("width",1e3).style("background-color","#f5f5f5").append("g").attr("transform","translate(100,20)"),u=l.i().domain(t.map((function(t){return t.key}))).range([0,870]).paddingInner(.1).paddingOuter(.1);b.append("g").attr("transform","translate(0,380)").call(l.a(u)).call((function(t){return t.append("text").style("font-size","18px").attr("x",435).attr("y",60).attr("fill","currentColor").attr("text-anchor","start").text(c)}));var x=l.j().range([i,0]).domain([0,l.g(t,(function(t){return 1.2*t.values.length}))]);b.append("g").call(l.b(x)).call((function(t){return t.append("text").style("font-size","18px").attr("x",-190).attr("y",-80).attr("fill","currentColor").attr("text-anchor","end").attr("transform","rotate(-90)").text("Frequency")}));var f=u.bandwidth();b.selectAll("rect").data(t).enter().append("rect").attr("x",(function(t,e){return u(t.key)})).attr("y",(function(t,e){return x(t.values.length)})).attr("width",f).attr("height",(function(t,e){return i-x(t.values.length)})).style("fill",(function(t,n){return e[n%12]})).on("mouseover",(function(t,e){s.show(t.values.length,this),l.k(this).transition().duration("50").style("fill","red")})).on("mouseout",(function(t,n){l.k(this).transition().duration("50").style("fill",e[n%12]),s.hide()})),b.call(s)};return Object(h.jsxs)("div",{children:[Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsx)("svg",{ref:n})]})},b=void 0,u=function(t){var e=Object(r.useRef)(null),n=t.data,a=380,i=t.chartVariable,c=Object(r.useState)({secondX:0,isChangeBins:!1}),j=Object(o.a)(c,2),u=j[0],x=j[1],f=Object(r.useState)(0),g=Object(o.a)(f,2),O=g[0],p=g[1],m=Object(r.useState)(10),v=Object(o.a)(m,2),y=v[0],w=v[1],N=Object(d.a)().attr("class","d3-tip animate").offset([-20,0]).html((function(t){return'<strong><font color="red">'+t+"</font></strong>"})),k=function(){l.k(b);var t=l.e.x;p(t)},C=function(){l.k(b);var t=l.e.x,e=Object(s.a)(Object(s.a)({},u),{},{secondX:t,isChangeBins:!0});x(e)};Object(r.useEffect)((function(){p(O)}),[O]),Object(r.useEffect)((function(){if(T(),u.isChangeBins){var t=0;O-u.secondX<0?t=-5:O-u.secondX>0&&(t=5),x(Object(s.a)(Object(s.a)({},u),{},{isChangeBins:!1})),V(t)}else V(0)}),[u,t]);var T=function(){l.k(e.current).selectAll("svg > *").remove(),l.k(".d3-tip").remove()},V=function(t){var r=[];n.forEach((function(t){r.push(+t[i])}));var c=l.k(e.current).attr("height",500).attr("width",1e3).style("background-color","#f5f5f5").append("g").attr("transform","translate(100,20)"),s=(c.append("rect").attr("x",0).attr("y",0).attr("width",870).attr("height",a).style("fill","#f5f5f5").call(l.d().on("start",k).on("end",C)),c),o=l.j().domain([0,l.g(r,(function(t){return t}))]).range([0,870]);s.append("g").attr("transform","translate(0,380)").call(l.a(o)).call((function(t){return t.append("text").style("font-size","18px").attr("x",435).attr("y",60).attr("fill","currentColor").attr("text-anchor","start").text(i)})),y+t>=0&&w(y+t);var d=l.f().value((function(t){return t})).domain(o.domain()).thresholds(o.ticks(y))(r),h=l.j().range([a,0]).domain([0,l.g(d,(function(t){return 1.2*t.length}))]);s.append("g").call(l.b(h)).call((function(t){return t.append("text").style("font-size","18px").attr("x",-190).attr("y",-80).attr("fill","currentColor").attr("text-anchor","end").attr("transform","rotate(-90)").text("Frequency")})),s.append("g").selectAll("rect").data(d).enter().append("rect").attr("x",1).attr("transform",(function(t){return"translate("+o(t.x0)+","+h(t.length)+")"})).attr("width",(function(t){return t.x1!==t.x0?o(t.x1)-o(t.x0)-1:d[0].x1-d[0].x0})).attr("height",(function(t){return a-h(t.length)})).style("fill","#2e8083").on("mouseover",(function(t,e){N.show(t.length,this),l.k(this).transition().duration("50").attr("transform",(function(t){return"translate("+o(t.x0)+","+(h(t.length)-5)+")"})).attr("height",(function(t){return a-h(t.length)+5})).style("fill","red")})).on("mouseout",(function(t,e){l.k(this).transition().duration("50").attr("transform",(function(t){return"translate("+o(t.x0)+","+h(t.length)+")"})).attr("height",(function(t){return a-h(t.length)})).style("fill","#2e8083"),N.hide()})).call(l.d().on("start",k).on("end",C)),s.call(N)};return Object(h.jsx)("div",{children:Object(h.jsx)("svg",{ref:e})})},x=(n(19),function(t){var e=Object(r.useRef)(null),n=t.data,a=870,i=380,c=t.chartVariableX,s=t.chartVariableY,o=t.isXNumeric,d=t.isYNumeric;Object(r.useEffect)((function(){j(),b()}),[t]);var j=function(){l.k(e.current).selectAll("svg > *").remove()},b=function(){var t,r,h,j,b=l.k(e.current).attr("height",500).attr("width",1e3).style("background-color","#f5f5f5").append("g").attr("transform","translate(100,20)");if(o?h=l.j().domain([0,l.g(n,(function(t){return 1.2*t[c]}))]).range([0,a]):(t=l.h().key((function(t){return t[c]})).entries(n),h=l.i().domain(t.map((function(t){return t.key}))).range([0,a]).paddingInner(.1).paddingOuter(.1)),t&&t.length>20){var u=b.append("g").attr("transform","translate(0,380)").call(l.a(h));u.selectAll("text").attr("y",0).attr("x",10).attr("dy",".35em").attr("transform","rotate(90)").style("text-anchor","start"),u.call((function(t){return t.append("text").style("font-size","18px").attr("x",435).attr("y",60).attr("fill","blue").attr("text-anchor","start").text(c)}))}else b.append("g").attr("transform","translate(0,380)").call(l.a(h)).call((function(t){return t.append("text").style("font-size","18px").attr("x",435).attr("y",60).attr("fill","blue").attr("text-anchor","start").text(c)}));d?j=l.j().domain([0,l.g(n,(function(t){return 1.2*t[s]}))]).range([i,0]):(r=l.h().key((function(t){return t[s]})).entries(n),j=l.i().domain(r.map((function(t){return t.key}))).range([i,0]).paddingInner(.1).paddingOuter(.1)),b.append("g").call(l.b(j)).call((function(t){return t.append("text").style("font-size","18px").attr("x",-90).attr("y",-80).attr("fill","red").attr("text-anchor","end").attr("transform","rotate(-90)").text(s)})),!o&&!d&&t&&t.length<=20&&r&&r.length<=20?b.append("g").selectAll("dot").data(n).enter().append("circle").attr("cx",(function(t){return h(t[c])+h.bandwidth()/2+30*(2*Math.random()-1)})).attr("cy",(function(t){return j(t[s])+j.bandwidth()/2+30*(2*Math.random()-1)})).attr("r",3).style("fill","green"):b.append("g").selectAll("dot").data(n).enter().append("circle").attr("cx",(function(t){return o?h(t[c]):h(t[c])+h.bandwidth()/2})).attr("cy",(function(t){return d?j(t[s]):j(t[s])+j.bandwidth()/2})).attr("r",3).style("fill","green")};return Object(h.jsxs)("div",{children:[Object(h.jsx)("span",{children:Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{className:"scatterText",id:"xvar",children:Object(h.jsxs)("b",{children:["Variable on X axis: ",c||"Select X axis variable"]})}),Object(h.jsx)("div",{className:"scatterText",id:"yvar",children:Object(h.jsxs)("b",{children:["Variable on Y axis: ",s||"Select Y axis variable"]})})]})}),c&&s?Object(h.jsx)("svg",{ref:e}):Object(h.jsx)("div",{})]})}),f=n(11),g=(n(20),n(21),function(t){var e=Object(r.useState)(""),n=Object(o.a)(e,2),a=n[0],i=n[1];return Object(h.jsxs)("div",{children:[3===t.chartNumber?Object(h.jsx)("div",{className:"radioSelection",children:Object(h.jsxs)("b",{children:["Select Axis:",Object(h.jsx)("input",{type:"radio",id:"axis",name:"axis",value:"x Axis",onChange:function(){return i("x")}}),Object(h.jsx)("label",{htmlFor:"axis",children:"X Axis"}),Object(h.jsx)("input",{type:"radio",id:"axis",name:"axis",value:"y Axis",onChange:function(){return i("y")}}),Object(h.jsx)("label",{htmlFor:"axis",children:"Y Axis"})]})}):Object(h.jsx)("div",{}),t.variableNames.map((function(e,n){return Object(h.jsx)("div",{className:"option",onClick:function(){return t.changeVariable(t.chartNumber,e,a)},children:Object(h.jsx)("b",{children:e})},n)}))]})}),O=function(t){var e=Object(f.a)(t.numericVariables);e.push.apply(e,t.categoricalVariables);var n=function(e,n,r){t.changeChart(e,n,r)};return Object(h.jsxs)("div",{className:"mainBar",children:[Object(h.jsxs)("div",{className:"options",children:[Object(h.jsx)("img",{src:"https://img.icons8.com/pastel-glyph/64/000000/bar-chart.png",height:"15",width:"15"}),Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Bar Chart "}),Object(h.jsx)("div",{className:"dropDownMenu",children:Object(h.jsx)(g,{variableNames:t.categoricalVariables,chartNumber:1,changeVariable:n})})]}),Object(h.jsxs)("div",{className:"options",children:[Object(h.jsx)("img",{src:"https://img.icons8.com/metro/26/000000/combo-chart.png",height:"15",width:"15"}),Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Histogram "}),Object(h.jsx)("div",{className:"dropDownMenu",children:Object(h.jsx)(g,{variableNames:t.numericVariables,chartNumber:2,changeVariable:n})})]}),Object(h.jsxs)("div",{className:"options",children:[Object(h.jsx)("img",{src:"https://img.icons8.com/metro/26/000000/scatter-plot.png",height:"15",width:"15"}),Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"ScatterPlot "}),Object(h.jsx)("div",{className:"dropDownMenu",children:Object(h.jsx)(g,{variableNames:e,chartNumber:3,changeVariable:n})})]})]})},p=n.p+"static/media/processed.1819ef90.csv",m=function(t){return Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{style:{width:"80%"},children:["This project is completed in accordance with the requirements of the course CSE-564 : Visualization at Stony Brook University.",Object(h.jsx)("br",{}),"The project provides an interactive Visualization of New York Housing Units Data (by buildings) made publically available at NYC OpenData(",Object(h.jsx)("a",{href:"https://data.cityofnewyork.us/Housing-Development/Housing-New-York-Units-by-Building/hg8x-zxpr",children:"here"}),") by The Department of Housing Preservation and Development (HPD).",Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),"The dataset contains New Yorks housing data per building for each building project and its related data. The dataset consists of 4,732 Rows and 42 Columns. The data was processed, cleaned to obtain a dataset of 15(+1) useful columns and 1500 randomly sampled rows using a python script. The following are the definitions of the attributes in the sampled data:",Object(h.jsx)("br",{}),Object(h.jsxs)("ul",{children:[Object(h.jsx)("b",{children:"Numeric Variables"}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:"Extremely Low Income Units"})})," - Units with rents that are affordable to households earning 0 to 30% of the area median income (AMI)."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:"Very Low Income Units "})}),"- Units with rents that are affordable to households earning 31 to 50% of the area median income (AMI)."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:"Low Income Units "})}),"\u2013 Units with rents that are affordable to households earning 51 to 80% of the median income (AMI)."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:"Counted Rental Units "})}),"\u2013 Units where assistance has been provided to landlords for affordable units."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:"Counted Homeownership Units "})}),"\u2013 Units where assistance has been provided directly to homeowners."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:"Total Counted Units "})}),"- Total number of affordable, regulated units in the building. "]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:"Total Units "})}),"- The total number of units, affordable and market rate, in each building."]})]}),Object(h.jsxs)("ul",{children:[Object(h.jsx)("b",{children:"Categorical Variables"}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:" Program Group "})}),"- The project group/category for a building project"]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:" Borough "})}),"- The Borough where the building is located."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:" PostCode "})}),"- The ZipCode where the building is located."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:" Council District "})}),"- The NYC Council District where the building is located."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:" Census Tract "})})," \u2013 The 2010 U.S. Census Tract number where the building is located."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:" NTA - Neighborhood Tabulation Area "})}),"\u2013 The NYC Neighborhood Tabulation Area number where the building is located."]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:" Reporting Construction Type "})}),"\u2013 Either a \u2018new construction\u2019 or \u2018preservation\u2019",Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:"\u2018New construction\u2019 \u2013 New affordable housing units are created, or down payment assistance is given to a homeowner to access an affordable home."}),Object(h.jsx)("li",{children:"\u2018Preservation\u2019 - Existing buildings receive physical rehabilitation and/or financial operating assistance is for existing and future tenants. "})]})]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("b",{children:Object(h.jsx)("font",{style:{color:"#2e8083"},children:"Prevailing wage status "})}),"- Whether the project is subject to any prevailing wage requirements, such as Davis Bacon."]})]})]})]}),Object(h.jsxs)("div",{children:["Source:",Object(h.jsx)("br",{}),"1. DataSet and Rephrased Definitions: https://data.cityofnewyork.us/Housing-Development/Housing-New-York-Units-by-Building/hg8x-zxpr",Object(h.jsx)("br",{}),"2. Icons : https://icons8.com/icons/"]})]})};var v=function(){var t,e=Object(r.useState)(0),n=Object(o.a)(e,2),a=n[0],i=n[1],c=Object(r.useState)(),d=Object(o.a)(c,2),b=d[0],f=d[1],g=Object(r.useState)(""),v=Object(o.a)(g,2),y=v[0],w=v[1],N=Object(r.useState)(),k=Object(o.a)(N,2),C=k[0],T=k[1],V=["v1","v2","v4"];return Object(r.useEffect)((function(){l.c(p,(function(t){t,f(t)}))}),[y]),V=["Extremely Low Income Units","Very Low Income Units","Low Income Units","Counted Rental Units","Counted Homeownership Units","All Counted Units","Total Units"],t=["Program Group","Borough","Postcode","Council District","Census Tract","NTA - Neighborhood Tabulation Area","Reporting Construction Type","Prevailing Wage Status"],Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"header",children:[" ",Object(h.jsx)("center",{children:Object(h.jsx)("b",{children:" New York Housing Units by Building"})})]}),Object(h.jsx)("center",{children:Object(h.jsx)(O,{changeChart:function(t,e,n){if(i(t),w(e),3===t){var r="",a="",c=Object(s.a)({},C);"x"===n&&(r=-1!==V.indexOf(e),c.xvar=e,c.isXNum=r),"y"===n&&(a=-1!==V.indexOf(e),c.yvar=e,c.isYNum=a),T(c)}else T("")},numericVariables:V,categoricalVariables:t})}),Object(h.jsx)("div",{className:"home",children:0===a?Object(h.jsx)(m,{numeric:V,categoric:t}):Object(h.jsx)("div",{})}),Object(h.jsxs)("center",{children:[1===a?Object(h.jsx)(j,{data:b,chartVariable:y}):Object(h.jsx)("div",{}),2===a?Object(h.jsx)(u,{data:b,chartVariable:y}):Object(h.jsx)("div",{}),3===a?Object(h.jsx)(x,{data:b,chartVariableX:C.xvar,chartVariableY:C.yvar,isXNumeric:C.isXNum,isYNumeric:C.isYNum}):Object(h.jsx)("div",{})]})]})},y=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,i=e.getLCP,c=e.getTTFB;n(t),r(t),a(t),i(t),c(t)}))};c.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(v,{})}),document.getElementById("root")),y()}],[[22,1,2]]]);
//# sourceMappingURL=main.a4664a0b.chunk.js.map