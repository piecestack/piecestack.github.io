function plotStack_continue(t,a,e,r){function n(t){return t+" s"}function o(t){for(var a,e,r=t.length;0!==r;)e=Math.floor(Math.random()*r),r-=1,a=t[r],t[r]=t[e],t[e]=a;return t}function i(t,a){return d3.ascending(A.indexOf(t.key),A.indexOf(a.key))}var l=e.totalW-10,s=2*e.totalH;d3.select(a+" svg").remove();var c=d3.select(a).append("svg").attr("width",l+e.m.left+e.m.right).attr("height",s+e.m.top+e.m.bottom).append("g").attr("transform","translate("+e.m.left+","+e.m.top+")");c.append("rect").attr("class","overlay").attr("x",0).attr("y",0).attr("width",l).attr("height",s).attr("opacity",0),e.color.domain(d3.extent(t,function(t){return t.index}));var d=function(t){return e.color(t[r])},y=d3.layout.stack().values(function(t){return t.values}).offset("zero").out(function(t,a,e){t.display={},t.display.x=t.x,t.display.y0=a,t.display.y=e}),u=y(t),m=u[0].values.map(function(t){return t.x}),f=d3.max(u.map(function(t){return d3.max(t.values,function(t){return t.display.y0+t.display.y})})),x=0,p=d3.scale.linear().domain(d3.extent(u[0].values,function(t){return parseInt(t.x)})).range([0,l]),g=d3.scale.linear().domain([x,f]).range([s/2,0]),v=d3.scale.linear().domain([x,f]).range([s/2,s]),k=d3.svg.axis().scale(p).tickFormat(n).orient("bottom"),h=d3.svg.axis().scale(g).tickFormat(d3.format(",.2f")).orient("left"),S=d3.svg.axis().scale(v).tickFormat(d3.format(",.2f")).orient("left"),A=t.map(function(t){return t.key});o(A),A=["layer11","layer12","layer2","layer9","layer4","layer10","layer3","layer6","layer7","layer8","layer1","layer5"];var t=t.sort(i),P={xTickFormat:n,mTop:e.m.top,stackProcess:y,svg:c,totalXRange:m,color:d,selected:!1,width:l,height:s,padding:50,stackedDataArr:[{stackedData:t,xAxis:k,xScale:p,yAxis:h,yScale:g,startPoint:0,endPoint:s/2},{stackedData:[],xAxis:k,xScale:p,yAxis:S,yScale:v,startPoint:s/2,endPoint:s}],range:{minY:x,maxY:f},baseLine:0};plotContinueStack(P,0)}