//////////////////////////////////////////////////////////////////////////
// Solid pie
//////////////////////////////////////////////////////////////////////////
function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }
  function addSlice(sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $("."+sliceID).css({
      "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
    });
    $("."+sliceID+" span").css({
      "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
      "background-color": color
    });
  }
  function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s"+dataCount+"-"+sliceCount;
    var maxSize = 179;
    if(sliceSize<=maxSize) {
      addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
      addSlice(maxSize, pieElement, offset, sliceID, color);
      iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
    }
  }
  function createPie(dataElement, pieElement) {
    var listData = [];
    $(dataElement+" span").each(function() {
      listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for(var i=0; i<listData.length; i++) {
      listTotal += listData[i];
    }
    var offset = 0;
    var color = [
      "cornflowerblue", 
      "olivedrab", 
      "orange", 
      "tomato", 
      "crimson", 
      "purple", 
      "turquoise", 
      "forestgreen", 
      "navy", 
      "gray"
    ];
    for(var i=0; i<listData.length; i++) {
      var size = sliceSize(listData[i], listTotal);
      iterateSlices(size, pieElement, offset, i, 0, color[i]);
      $(dataElement+" li:nth-child("+(i+2)+")").css("border-color", color[i]);
      offset += size;
    }
  }


//////////////////////////////////////////////////////////////////////////
// Doughnut
//////////////////////////////////////////////////////////////////////////
function Draw_doughnut(dataElement, dataNumbers, dataItem){
    var listData = [];
    
    $(dataElement+" span").each(function() {
      listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for(var i=0; i<listData.length; i++) {
      listTotal += listData[i];
    }
    var offset = 0;
    var colors = [
      "#41B787", 
      "#6352B9", 
      "#B65480", 
      "#D5735A", 
      "#D7D9DA",
    ];
    for(var i=0; i<listData.length; i++) {
      var size = sliceSize(listData[i], listTotal);
      //iterateSlices(size, pieElement, offset, i, 0, colors[i]);
      $(dataElement+" li:nth-child("+(i+2)+")").css("border-color", colors[i]);
      offset += size;
    }

    var dataset = [
        { name: 'Direct', count: dataNumbers[0] },
        { name: 'Facebook', count: dataNumbers[1] },
        { name: 'Pinterest', count: dataNumbers[2] },
        { name: 'Search', count: dataNumbers[3] },
        { name: 'Others', count: dataNumbers[4] }
    ];
    
    var total=0;
    
    dataset.forEach(function(d){
        total+= d.count;
    });
    
    var pie=d3.layout.pie()
            .value(function(d){return d.count})
            .sort(null);
    
    var w=200,h=200;
    
    var outerRadiusArc=w/2;
    var innerRadiusArc=75;
    var shadowWidth=10;
    
    var outerRadiusArcShadow=innerRadiusArc+1;
    var innerRadiusArcShadow=innerRadiusArc-shadowWidth;
    
    var color = d3.scale.ordinal()
     .range(['#41B787', '#6352B9', '#B65480', '#D5735A', '#D7D9DA']);
    
    var svg=d3.select("#chart")
            .append("svg")
            .attr({
                width:w,
                height:h,
                class:'shadow'
            }).append('g')
            .attr({
                transform:'translate('+w/2+','+h/2+')'
            });
    
    
    var createChart=function(svg,outerRadius,innerRadius,fillFunction,className){
    
        var arc=d3.svg.arc()
                .innerRadius(outerRadius)
                .outerRadius(innerRadius);
    
        var path=svg.selectAll('.'+className)
                .data(pie(dataset))
                .enter()
                .append('path')
                .attr({
                    class:className,
                    d:arc,
                    fill:fillFunction
                });
    
        path.transition()
                .duration(1000)
                .attrTween('d', function(d) {
                    var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                });
    };
    
    createChart(svg,outerRadiusArc,innerRadiusArc,function(d,i){
        return color(d.data.name);
    },'path1');
    
    createChart(svg,outerRadiusArcShadow,innerRadiusArcShadow,function(d,i){
        var c=d3.hsl(color(d.data.name));
        return d3.hsl((c.h+5), (c.s -.07), (c.l -.15));
    },'path2');
    
    var addText= function (text,y,size) {
        svg.append('text')
                .text(text)
                .attr({
                    'text-anchor':'middle',
                    y:y
                })
                .style({
                    fill:'#929DAF',
                    'font-size':size
                });
    };
    
    var restOfTheData=function(){
    
        addText(function(){
            return numberWithCommas(total);
        },0,'30px');
    
    
        addText(function(){
            return dataItem;
        },25,'10px');
    
    };
    
    setTimeout(restOfTheData,1000);
    
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}


//////////////////////////////////////////////////////////////////////////
// Css function
//////////////////////////////////////////////////////////////////////////

function startTime() {
var today = new Date();
var d = today.getDay();
switch (d) {
    case 0:
        day = "星期日";
        break;
    case 1:
        day = "星期一";
        break;
    case 2:
        day = "星期二";
        break;
    case 3:
        day = "星期三";
        break;
    case 4:
        day = "星期四";
        break;
    case 5:
        day = "星期五";
        break;
    case 6:
        day = "星期六";
    }
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
var y = today.getFullYear();
var mm = today.getMonth()+1;
var da = today.getDate();
m = checkTime(m);
s = checkTime(s);
document.getElementById('timetxt').innerHTML =
y+"/"+mm+"/"+da +" "+h + ":" + m + ":" + s + "        "+day;
var t = setTimeout(startTime, 1000);
}
function checkTime(i) {
if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
return i;
}
function closeUniProg(){

    document.getElementsByClassName('material-icons')[2].style.color = "white"
    document.getElementById('UniProg').style.opacity = 0;

    
    setTimeout(function(){
        document.getElementById('UniProg').remove();
    }, 0);
}
function showProg(){
    closeCesiumInfrobox()
    document.getElementsByClassName('material-icons')[2].style.color = "#555"
    document.getElementById('rp_link').text = "iPack 平台"
    document.getElementById('rp_link').href = "https://ipack-front-end.herokuapp.com/liteUI/models/bridge"
    try {
        closeDash()

        
    } catch (error) {
        
    }

    try {
        closeDesign()
        
    } catch (error) {
        
    }try {
        
        closeFacility()
        
    } catch (error) {
        
    }
    if(document.getElementById('UniProg') == null)
    {


        $.get("Component/UniProg.html", function(data){
            $("body").append((data));
            Draw_doughnut(".chart-container.legend", [70000,45000,20000,33000,55000], "项目成本");
            $('.percentage').easyPieChart({
                animate: 1000,
                lineWidth: 13,
                size: 200,
                barColor: '#3faf81',
                lineCap: 'butt',
                trackColor: '#d0d0d0'
            });



            setTimeout(function(){
                document.getElementById('UniProg').style.opacity = 1;
            }, 50);
        });
        
    }
    else
    {
        closeUniProg();
    }
}
function closeDash(){

    document.getElementsByClassName('material-icons')[0].style.color = "white"
    //document.getElementById('menu').style.opacity = 0
    document.getElementById('Prog').style.opacity = 0;

    setTimeout(function(){
        //document.getElementById('menu').style.visibility = 'hidden';
        document.getElementById('Prog').remove();
    }, 0);
}
function showDash(){
    closeCesiumInfrobox()
    document.getElementsByClassName('material-icons')[0].style.color = "#555"
    try {
        closeUniProg()
        
    } catch (error) {
        
    }
    try {
        closeDesign()
        
    } catch (error) {
        
    }try {
        
        closeFacility()
        
    } catch (error) {
        
    }
    if(document.getElementById('Prog') == null)
    {
        $.get("Component/Prog.html", function(data){
            $("body").append((data));

            createPie(".pieID.legend", ".pieID.pie");
            Draw_doughnut(".chart-container.legend",  [211,45,20,33,11], "出工人数");

            setTimeout(function(){
                document.getElementById('Prog').style.opacity = 1;
            }, 50);
        });
    }
    else
    {
        closeDash();
    }
}

function closeDesign(){

    document.getElementsByClassName('material-icons')[1].style.color = "white"
    //document.getElementById('menu').style.opacity = 0
    document.getElementById('Design').style.opacity = 0;

    setTimeout(function(){
        //document.getElementById('menu').style.visibility = 'hidden';
        document.getElementById('Design').remove();
    }, 0);
}
function showDesign(){
    closeCesiumInfrobox()
    document.getElementsByClassName('material-icons')[1].style.color = "#555"
    try {
        
        closeUniProg()
        
    } catch (error) {
        
    }try {
        
        closeDash()
        
    } catch (error) {
        
    }try {
        
        closeFacility()
        
    } catch (error) {
        
    }
    if(document.getElementById('Design') == null)
    {
        $.get("Component/Design.html", function(data){
            $("body").append((data));

            createPie(".pieID.legend", ".pieID.pie");
            Draw_doughnut(".chart-container.legend",  [3,6,1,1,2], "宗地数量");

            setTimeout(function(){
                document.getElementById('Design').style.opacity = 1;
            }, 50);
        });
    }
    else
    {
        closeDesign();
    }
}

function closeFacility(){

    document.getElementsByClassName('material-icons')[3].style.color = "white"
    //document.getElementById('menu').style.opacity = 0
    document.getElementById('Facility').style.opacity = 0;

    setTimeout(function(){
        //document.getElementById('menu').style.visibility = 'hidden';
        document.getElementById('Facility').remove();
    }, 0);
}
function showFacility(){
    closeCesiumInfrobox()
    document.getElementsByClassName('material-icons')[3].style.color = "#555"
    document.getElementById('rp_link').text = "iMonitor 平台"
    document.getElementById('rp_link').href = "https://bimcentre-imonitor.herokuapp.com/viewer?path=resources/models/seat/seat.svf"
    try {
        
        closeUniProg()
        
    } catch (error) {
        
    }try {
        
        closeDash()
        
    } catch (error) {
        
    }try {
        
        closeDesign()
        
    } catch (error) {
        
    }
    if(document.getElementById('Facility') == null)
    {
        $.get("Component/Facility.html", function(data){
            $("body").append((data));

            createPie(".pieID.legend", ".pieID.pie");
            Draw_doughnut(".chart-container.legend",  [1,2,5,2,2], "项目数量");

            setTimeout(function(){
                document.getElementById('Facility').style.opacity = 1;
            }, 50);
        });
    }
    else
    {
        closeFacility();
    }
}
function closeCesiumInfrobox(){
    document.querySelector('#cesiumContainer > div > div.cesium-viewer-infoBoxContainer > div > button.cesium-infoBox-close').click()
}
