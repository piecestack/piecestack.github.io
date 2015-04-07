function closest(e,t){for(var n=t[0],r=Math.abs(e-n),a=0;a<t.length;a++){var l=Math.abs(e-t[a]);r>l&&(r=l,n=t[a])}return n}function brushNoticeLine(e,t){var n,r,a,l,s,c=t.totalXRange,u=t.svg,i=(parseInt(c[0]),t.stackedDataArr);u.selectAll(".AggregationPoint").attr("r",3.5);for(var d=0;d<i.length;d++){n=i[d].stackedData,r=i[d].xScale,a=i[d].yScale,l=i[d].startPoint,s=i[d].endPoint;var o=r.invert(e),f=closest(o,c);u.selectAll(".AggregationPoint"+d+"-time-"+f).attr("r",6).transition(),u.selectAll(".brushNoticeLine"+d).attr("x1",r(f)).attr("x2",r(f)),curHideGlyph.classed("glyphHide",!0),d3.selectAll(".contriGlyph-time-"+f).classed("glyphHide",!1)}}function decompositionFunc(e,t,n,r){var a=n.toIndex;if(-2!=a){var l=n.stackedDataArr[r],s=l.stackedData,c=extractSelected(e,s,t),u=c.includeLineArr,i=s.filter(function(e){return-1==u.indexOf(e.lineContent)}),d=s.filter(function(e){return-1!=u.indexOf(e.lineContent)});if(a>-2&&(n.stackedDataArr[r].stackedData=i.sort(sortByCluster),n.stackedDataArr[r].curTotalContri=computeTotalContribute(n.stackedDataArr[r].stackedData,n)),a==Math.round(a)){if(a>=0)n.stackedDataArr[a].stackedData=n.stackedDataArr[a].stackedData.concat(d).sort(sortByCluster),n.stackedDataArr[a].curTotalContri=computeTotalContribute(n.stackedDataArr[a].stackedData,n);else if(-1==a){var o=d.sort(sortByCluster);genStackedArr(n,o),a=n.stackedDataArr.length-1}}else{a=Math.ceil(a);var o=d.sort(sortByCluster);genStackedArr(n,o),orderStacked(n,a,n.stackedDataArr.length-1)}n.selectedNail==r?n.selectedNail=a:n.selectedNail>=a&&(n.selectedNail=n.selectedNail+1),proporgateStackedArr(n),deleteRow(),addRow(u,n),n.stackedDataArr.forEach(function(e,t){plotPartialStack(n,!0,t)}),updateNailSelect(n)}}function hoverFunc(e,t,n){var r=t.stackedDataArr[n],a=r.xScale,l=r.yScale,s=t.svg,c=e.values.map(function(e){return e.x}),u=r.stackedData.filter(function(t){return t.lineContent==e.lineContent}),i=d3.svg.line().x(function(e){return a(e.x)}).y(function(e){return l(e.y)}).interpolate(interpolate).tension(tension),d=[],o=[];u.forEach(function(e){var t=c.indexOf(e.xRange[0]);t>0&&(t-=1);var n=c.indexOf(e.xRange[e.xRange.length-1]);n<c.length-1&&(n+=1);var r=c.slice(t+1,n),a=t,l=n,s=-1,u=-1,i=findIntersection(r,o);i.length>0&&(l=c.indexOf(i[0]),s=c.indexOf(i[i.length-1]),u=n);var f=e.values.map(function(e){return{x:e.x,y:e.display.y0}}),v=e.values.map(function(e){return{x:e.x,y:e.display.y0+e.display.y}});d=d.concat([f.slice(a,l),v.slice(a,l)]),-1!=s&&(d=d.concat([f.slice(s,u),v.slice(s,u)])),o=o.concat(r)}),s.selectAll(".hoverSeqOutline"+n).data(d).enter().append("path").attr("class",function(){return"hoverSeqOutline hoverSeqOutline-"+n+" hoverSeqOutline-"+n+"-sequence-"+e.lineContent+" graph"+n}).attr("d",function(e){return i(e)})}function brushResponseFunc(e,t,n,r){function a(e,t){if(-1==t.clusterId&&-1!=e.clusterId)return-1;if(-1==e.clusterId&&-1!=t.clusterId)return 1;if(e.clusterId!=t.clusterId)return d3.ascending(e.clusterId,t.clusterId);var n=v.indexOf(e.lineContent),r=v.indexOf(t.lineContent);return d3.descending(n,r)}var l=n.stackedDataArr[r],s=l.xScale,c=l.yScale,u=n.svg,i=l.stackedData,d=extractSelected(e,i,t),o=(d.selectedCluster,d.selectedLine),f=d.includeClusterArr,v=d.includeLineArr;if("cluster"==t&&(n.stackedDataArr[r].stackedData=i.sort(a),plotPartialStack(n,!0,r)),0==n.selected){n.selected=!0,addRow(v,n),d3.selectAll(".partialStack"+r).classed("unselected",!0),d3.selectAll(".partialStack"+r).classed("hover",!1),v.forEach(function(e){d3.selectAll(".stack-"+r+"-sequence-"+e.slice(1)).classed("unselected",!1)});var x=i.filter(function(e){return-1!=f.indexOf(e.clusterId)});x=d3.nest().key(function(e){return e.clusterId}).rollup(function(e){var t=e[0].xRange,n=e[0].clusterId,r=e.filter(function(e){return-1!=v.indexOf(e.lineContent)&&-1!=e.clusterId}),a=r.map(function(e){return d3.sum(e.values,function(e){return e.y})}),l=e.map(function(e){var t=d3.sum(e.values,function(e){return e.y});return{lineContent:e.lineContent,clusterId:e.clusterId,key:e.key,sum:t}}),s=(d3.sum(l,function(e){return e.sum}),d3.sum(a),{includedLineContent:r,clusterId:n,clusterSum:e.length,lineSum:r.length,xRange:t,perLayerValues:l});return s}).entries(x);var h=d3.scale.linear().domain(d3.extent(x,function(e){return e.values.lineSum})).range([3,10]),g=d3.format(".0%");"cluster"==t&&(x=x.filter(function(e){return-1!=e.key})),u.selectAll(".brushText").remove(),u.selectAll(".brushText").data(x).enter().append("text").attr("class",function(e){return"brushText brushText-"+r+" brushText-"+r+"-cluster-"+e.values.clusterId+" graph"+r}).text(function(e){return"sequence"==t?o+" "+g(e.values.lineSum/e.values.clusterSum):"cluster"==t?g(e.values.lineSum/e.values.clusterSum):void 0}).style("font-size",function(e){return h(e.sum)+"px"}).attr("x",function(e){var t=Math.floor(e.values.xRange.length/2);return t=e.values.xRange[t],s(t)}).attr("y",function(e){var t=Math.floor(e.values.xRange.length/2);t=e.values.xRange[t];var n=Math.floor(e.values.includedLineContent.length/2),r=e.values.includedLineContent[n];r=r.values.filter(function(e){return e.x==t})[0];var a=r.display.y0+r.display.y/2;return c(a)})}else n.selected=!1,d3.selectAll(".partialStack").classed("unselected",!1),d3.selectAll(".partialStack").classed("selected",!1),d3.selectAll(".brushText").remove(),d3.selectAll(".partialStack").classed("hover",!1)}function dragmove(e,t,n){d3.selectAll(".stack-"+t+"-sequence-"+e.slice(1)).classed("unselected",!1).attr("transform",function(){return"translate("+[n.x,n.y]+")"}),d3.event.sourceEvent.stopPropagation()}